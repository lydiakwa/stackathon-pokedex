import {
  Text,
  FlatList,
  View,
  StatusBar,
  StyleSheet,
  Button,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useState } from 'react';

import { usePokemons } from '../apis/pokemon';

import PokemonDetail from './PokemonDetail';

//renders the individual list items (objects in the array passed into data)
const Item = ({ name, url }) => (
  <View style={styles.button}>
    <Button
      style={styles.name}
      title={name}
      onPress={() => {
        <PokemonDetail />;
        console.log(url);
      }}
    />
  </View>
);

const PokemonList = () => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    usePokemons();

  const renderItem = ({ item, url }) => (
    <Item name={item.name} url={item.url} />
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FFCB05" />;
  }

  const pokemonArray = data.pages.flatMap(
    (pokemonObject) => pokemonObject.results
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
});

export default PokemonList;
