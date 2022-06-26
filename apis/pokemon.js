import axios from 'axios';
import { useQuery, useInfiniteQuery } from 'react-query';

export const getPokemons = async ({
  pageParam = 'https://pokeapi.co/api/v2/pokemon/?',
}) => {
  // console.log(pageParam);
  const { data } = await axios.get(pageParam);

  return data;
};

export const getPokemon = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

//example of a custom hook -- a function that starts with the word use
//and uses another hook
export const usePokemons = () => {
  return useInfiniteQuery('pokemons', getPokemons, {
    getNextPageParam: (data) => data.next,
  });
};

export const useSinglePokemon = (url) => {
  return useQuery(['pokemon', url], () => getPokemon(url));
};
