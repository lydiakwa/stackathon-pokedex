import {
  Text,
  FlatList,
  View,
  StatusBar,
  StyleSheet,
  Button,
} from 'react-native';
import { useState } from 'react';

import { usePokemons } from '../apis/pokemon';

const Item = ({ name }) => (
  <View style={styles.button}>
    <Button
      style={styles.name}
      title={name}
      onPress={() => {
        console.log(name);
      }}
    />
  </View>
);

const PokemonList = () => {
  const { data, isLoading, fetchNextPage } = usePokemons();

  const renderItem = ({ item }) => <Item name={item.name} />;

  if (isLoading) {
    return <Text style={styles.title}>loading</Text>;
  }

  const pokemonArray = data.pages.map((pokemonObject) => pokemonObject.results);
  console.log(pokemonArray);

  return (
    <View>
      <Text style={styles.title}>All Pokemon</Text>
      <FlatList
        data={pokemonArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.url}
      />
      <Button title="Next" onPress={() => fetchNextPage()} />
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
});

export default PokemonList;
