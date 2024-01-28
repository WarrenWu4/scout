import { Pressable, StyleSheet, ImageBackground } from "react-native";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";

export default function SignIn() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("../../assets/logo.svg")}
                    style={{ width: 99.5, height: 99.5 }}
                />
                <Image
                    source={require("../../assets/scout.svg")}
                    style={{ width: 145, height: 50 }}
                />
                <Text style={styles.headerText}>
                    your braille text-to-speech assistant for those with fading
                    vision{" "}
                </Text>
            </View>
            <View style={styles.buttonList}>
                <View style={styles.svgPlusButton}>
                    <Image
                        source={require("../../assets/google.svg")}
                        style={{ width: 24, height: 24 }}
                    />
                    <Pressable>
                        <Text style={styles.buttonText}>
                            Sign in with Google
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.svgPlusButton}>
                    <Image
                        source={require("../../assets/apple.svg")}
                        style={{ width: 24, height: 24 }}
                    />
                    <Pressable>
                        <Text style={styles.buttonText}>
                            Sign in with Apple
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.svgPlusButton}>
                    <Image
                        source={require("../../assets/facebook.svg")}
                        style={{
                            width: 24,
                            height: 24,
                        }}
                    />
                    <Pressable>
                        <Text style={styles.buttonText}>
                            Sign in with Facebook
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.svgPlusButton}>
                    <Image
                        source={require("../../assets/user.svg")}
                        style={{ width: 24, height: 24 }}
                    />
                    <Link href={"/home"}>
                        <Text style={styles.buttonText}>Continue as Guest</Text>
                    </Link>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: "#F4C288",
        alignItems: "center",
        justifyContent: "center",
        gap: 90,
    },
    header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
    },
    buttonList: {
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",
        gap: 35,
    },
    svgPlusButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        gap: 10,
        backgroundColor: "#000000",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 5,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    headerText: {
        color: "#000000",
        fontStyle: "italic",
        fontSize: 24,
        fontWeight: "thin",
        textAlign: "center",
    },
    gradientText: {
        color: "#FFFFFF",
        fontStyle: "italic",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
});
