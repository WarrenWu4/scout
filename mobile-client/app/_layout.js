import { View } from 'react-native';
import { Slot } from 'expo-router';

export default function App() {
  return (
    <View style={{width: "100%", height: "100%"}}>
        <Slot/>
    </View>
  );
}
