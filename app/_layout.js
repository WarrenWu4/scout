import { StyleSheet, Text, View } from 'react-native';
import { Link, Slot } from 'expo-router';

export default function App() {
  return (
    <View style={styles.container}>
        <Link href={"/home"}>home page</Link>
        <Slot/>
    </View>
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
