import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import * as Speech from "expo-speech";

export default function TCard() {
    const speak = () => {
        const thingToSay = "Hello World";
        Speech.speak(thingToSay);
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardControl}>
                <Pressable
                    style={styles.switchBtn}
                    onPress={() => speak}
                    title="View"
                >
                    <Image
                        style={{ width: 24, height: 24 }}
                        source={require("../assets/switch.svg")}
                        contentFit="contain"
                    />
                    <Text style={styles.switchBtnText}>English</Text>
                </Pressable>

                <Pressable onPress={() => speak} title="Output">
                    <Image
                        style={{ width: 32, height: 32 }}
                        source={require("../assets/volumeOut.svg")}
                        contentFit="contain"
                    />
                </Pressable>
            </View>

            <Text>
                Lorem ipsum dolor sit amet consectetur. Aliquet arcu quis morbi
                ut at ipsum risus diam eu. Nunc nec at leo ultrices vel
                pellentesque amet. Risus sem eget blandit augue amet arcu
                convallis. Ut egestas consequat tincidunt morbi mi massa
                sagittis sed dolor.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        display: "flex",
        borderRadius: 8,
        padding: 16,
        rowGap: 8,
        backgroundColor: "#fff",
    },
    cardControl: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },
    switchBtn: {
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 8,
        backgroundColor: "#000",
        borderRadius: 4,
    },
    switchBtnText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#F4C288",
    },
});
