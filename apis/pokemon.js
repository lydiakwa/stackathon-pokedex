import axios from 'axios';
import { useQuery, useInfiniteQuery } from 'react-query';

export const getPokemons = async ({
  pageParam = 'https://pokeapi.co/api/v2/pokemon/?',
}) => {
  // console.log(pageParam);
  const { data } = await axios.get(pageParam);
  //regular javascript stuff
  const detailResults = await Promise.all(
    data.results.map(async (pokemon) => {
      const newList = await getPokemon(pokemon.url);
      newList.url = pokemon.url;
      return newList;
    })
  );

  data.detailResults = detailResults;
  return data;
};

export const getPokemon = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

export const getByType = async (typeId) => {
  try {
    // console.log('type', typeId);
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/type/${typeId.toLowerCase()}`
    );
    const detailResults = await Promise.all(
      data.pokemon.map(async (pokemon) => {
        const newList = await getPokemon(pokemon.pokemon.url);
        newList.url = pokemon.pokemon.url;
        return newList;
      })
    );
    data.next = null;
    data.detailResults = detailResults;
    // console.log(Object.keys(data));
    return data;
  } catch (err) {
    console.log(err);
  }
};

//example of a custom hook -- a function that starts with the word use
//and uses another hook
export const usePokemons = (isFiltered, type) => {
  // console.log(type);
  let fetchFunction = getPokemons;
  if (isFiltered) {
    fetchFunction = () => getByType(type);
  }
  const check = isFiltered || (!isFiltered && type === '');
  const querykey = isFiltered ? type : '';

  return useInfiniteQuery(['pokemons', querykey], fetchFunction, {
    getNextPageParam: (data) => data.next,
    enabled: check,
  });
};

export const useSinglePokemon = (url) => {
  return useQuery(['pokemon', url], () => getPokemon(url));
};
