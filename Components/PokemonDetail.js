import { Text, View, ActivityIndicator, Image, StyleSheet } from 'react-native';

import { useSinglePokemon } from '../apis/pokemon';

const PokemonDetail = (props) => {
  const { data: pokemon, isLoading } = useSinglePokemon(props.route.params.url);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FFCB05" />;
  }

  return (
    <View>
      <Text>{pokemon.name}</Text>
      <Image
        style={styles.image}
        source={{
          uri: pokemon.sprites.other['official-artwork']['front_default'],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
  },
});
export default PokemonDetail;
