import {
  Text,
  FlatList,
  View,
  StatusBar,
  StyleSheet,
  Button,
  ActivityIndicator,
  TextInput,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import { usePokemons } from '../apis/pokemon';

//renders the individual list items (objects in the array passed into data)
const Item = ({ pokemon }) => {
  const navigation = useNavigation();
  // console.log(Object.keys(pokemon));
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
  const [type, setType] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    usePokemons(isFiltered, type);

  const renderItem = ({ item }) => <Item pokemon={item} />;

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FFCB05" />;
  }
  console.log(Object.keys(data));

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
    <View style={styles.container}>
      <Text style={styles.title}>All Pokemon</Text>
      <TextInput
        style={styles.input}
        placeholder="Search by Type"
        onChangeText={setType}
        value={type}
      />
      <Button title="Filter" onPress={() => setIsFiltered(true)} />
      <FlatList
        data={pokemonArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.url}
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
    // flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#3367B0',
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E6E6E6',
  },
  image: {
    width: 75,
    height: 75,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default PokemonList;
