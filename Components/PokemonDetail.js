import { Text, View, ActivityIndicator, Image, StyleSheet } from 'react-native';

import { useSinglePokemon } from '../apis/pokemon';

const PokemonDetail = (props) => {
  const { data: pokemon, isLoading } = useSinglePokemon(props.route.params.url);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FFCB05" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pokemon.name}</Text>
      <Image
        style={styles.image}
        source={{
          uri: pokemon.sprites.other['official-artwork']['front_default'],
        }}
      />
      <View>
        <Text>Abilities:</Text>
        <Text>
          {pokemon.abilities.map((ability) => {
            return <Text>{ability.ability.name} </Text>;
          })}
        </Text>
        <Text></Text>
      </View>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3367B0',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  subContainer: {
    borderColor: '#FFCB05',
    borderRadius: 8,
    borderWidth: 1,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#E6E6E6',
  },
});
export default PokemonDetail;
