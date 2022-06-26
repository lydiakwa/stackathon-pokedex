import { Text, View, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <Text>
        this is where the quick links or login page will go eventually
      </Text>
      <View style={styles.button}>
        <Button
          title="All Pokemon"
          onPress={() => {
            navigation.navigate('List');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#3367B0',
    height: '100%',
  },
  button: {
    margin: 10,
    borderRadius: 8,
    backgroundColor: '#FFCB05',
  },
});

export default HomeScreen;
