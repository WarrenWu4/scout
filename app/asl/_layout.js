import { Slot } from "expo-router";
import { View } from "react-native";

export default function Layout() {
    return (
        <View style={{width: "100%", height: "100%"}}>
            
            <Slot/>

        </View>
    )
}