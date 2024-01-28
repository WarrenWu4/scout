<<<<<<< HEAD
import { View } from 'react-native';
import { Slot } from 'expo-router';

export default function App() {
  return (
    <View style={{width: "100%", height: "100%"}}>
        <Slot/>
    </View>
  );
}
=======
import { StyleSheet, Text, View } from "react-native";
import { Link, Slot } from "expo-router";

export default function App() {
    return (
        <View style={styles.container}>
            <Link href={"/home"}>home page</Link>
            <Slot />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
>>>>>>> 97cf60412182c2b1c0e0f97853df9c8e7169e8b3
