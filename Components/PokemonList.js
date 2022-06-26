import {
  Text,
  FlatList,
  View,
  StatusBar,
  StyleSheet,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { usePokemons } from '../apis/pokemon';

import PokemonDetail from './PokemonDetail';

//renders the individual list items (objects in the array passed into data)
const Item = ({ pokemon }) => {
  const navigation = useNavigation();
  console.log(Object.keys(pokemon));
  return (
    <View style={styles.button}>
      <Image
        style={styles.image}
        source={{
          uri: pokemon.sprites.other['official-artwork']['front_default'],
        }}
      />
      <Button
        style={styles.name}
        title={pokemon.name}
        onPress={() => {
          navigation.navigate('Detail', {
            name: pokemon.name,
            url: pokemon.url,
          });
        }}
      />
    </View>
  );
};

const PokemonList = () => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    usePokemons();

  const renderItem = ({ item }) => <Item pokemon={item} />;

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FFCB05" />;
  }

  const pokemonArray = data.pages.flatMap(
    (pokemonObject) => pokemonObject.detailResults
  );

  const renderFooter = () => (
    <View>
      {isFetchingNextPage && <ActivityIndicator size="large" color="#FFCB05" />}
      {!hasNextPage && <Text>No more pokemon</Text>}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>All Pokemon</Text>
      <FlatList
        data={pokemonArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.url}
        //endless scroll props
        // onMomentumScrollBegin={() => {
        //   console.log(onEnd);
        //   setOnEnd(false);
        // }}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          fetchNextPage();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  name: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Helvetica',
  },
  button: {
    margin: 10,
    borderRadius: 8,
    backgroundColor: '#FFCB05',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default PokemonList;
