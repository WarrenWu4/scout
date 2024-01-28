import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
export default function Settings() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Settings</Text>
                <Image
                    source={require("../../assets/logo.svg")}
                    style={{ width: 44, height: 44 }}
                />
            </View>
        </View>
    );
}

styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: "#F4C288",
        paddingLeft: 16,
        paddingRight: 16,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 24,
        width: "100%",
    },
    headerText: {
        fontSize: 22,
        fontWeight: "bold",
    },
});
