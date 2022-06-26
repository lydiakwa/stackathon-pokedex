import { Text, View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>HI</Text>
      <Button
        title="All Pokemon"
        onPress={() => {
          navigation.navigate('List');
        }}
      />
    </View>
  );
};

export default HomeScreen;
