import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import PokemonList from './Components/PokemonList';

const queryClient = new QueryClient();

export default function App() {
  return (
    //this is like PROVIDER from react-redux
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Text>Pokedex</Text>
        <PokemonList />

        <StatusBar style="auto" />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
