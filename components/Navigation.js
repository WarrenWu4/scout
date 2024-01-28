import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Image } from "expo-image";

export default function Navigation() {

    

    return (
        <View style={styles.navigation}>

            <Link href={"/home"}>
                
                <Image
                    style={{ width: 40, height: 40 }}
                    source={require("../assets/homeIcon.svg")}
                    contentFit="contain"
                />

            </Link>

            <Link href={"/camera"}>
            
                <Image
                    style={{ width: 40, height: 40 }}
                    source={require("../assets/cameraIcon.svg")}
                    contentFit="contain"
                />

            </Link>

            <Link href={"/settings"}>
            
                <Image
                    style={{ width: 40, height: 40 }}
                    source={require("../assets/settingsIcon.svg")}
                    contentFit="contain"
                />

            </Link>

        </View>
    )
}

const styles = StyleSheet.create({
    navigation: {
        width: "100%",
        height: 100,
        display: "flex", flexDirection: "row",
        justifyContent: "space-evenly", alignItems: "center",
        position: "absolute", bottom: 0,
        backgroundColor: "#fff",
        paddingTop: 20, paddingBottom: 20,
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
    }
})