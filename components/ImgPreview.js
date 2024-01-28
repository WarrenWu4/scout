import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { Image } from "expo-image"
import Navigation from "./Navigation"
import TCard from "./TCard"
import { ImageBackground } from "react-native"
import { ScrollView } from "react-native"

export default function ImgPreview(props) {

    console.log(props.img.uri)

    return (
        <SafeAreaView style={{backgroundColor: "#F4C288"}}>

            <View style={styles.home}>

                <View style={styles.homeHeader}>

                    <Link href={"/camera/snapshot"}>
                        <Image
                            style={{ width: 40, height: 40 }}
                            source={require("../assets/backArrow.svg")}
                            contentFit="contain"
                        />
                    </Link>

                    <Text style={styles.homeTitleText}>Translator</Text>

                    <Image
                        style={{ width: 40, height: 40 }}
                        source={require("../assets/logo.svg")}
                        contentFit="contain"
                    />

                </View>

                <ScrollView style={styles.previewContainer}>

                    <Image
                        style={{width: "100%", height: "100%", borderRadius: 4, borderColor: "white", borderWidth: 4}}
                        source={{uri: props.img.uri}}
                        contentFit="contain"
                    />

                    <TCard></TCard>

                    <Pressable onPress={() => console.log("fuc u")}>

                        <Image
                            style={{width: 32, height: 32}}
                            source={require("../assets/reloadIcon.svg")}
                            contentFit="contain"
                        />

                        <Text>Refresh</Text>

                    </Pressable>

                </ScrollView>

            </View>

            <Navigation></Navigation>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    home: {
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: '#F4C288',
        paddingLeft: 16,
        paddingRight: 16,
        position: "relative",
    },
    homeHeader: {
        marginTop: 24,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    homeTitleText: {
        fontSize: 22,
        fontWeight: "bold",
    },
})