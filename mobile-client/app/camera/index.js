import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import Navigation from "../../components/Navigation"

export default function Page() {
    return (
        <SafeAreaView style={{backgroundColor: "#F4C288"}}>

            <View style={styles.home}>

                <View style={styles.homeHeader}>

                    <Text style={styles.homeTitleText}>Services</Text>

                    <Image
                        style={{ width: 40, height: 40 }}
                        source={require("../../assets/logo.svg")}
                        contentFit="contain"
                    />

                </View>

                <View style={styles.services}>

                    <View style={styles.brailleCard}>

                        <Image
                            style={{width: 48, height: 48}}
                            source={require("../../assets/brailleIcon.svg")}
                            contentFit="contain"
                        />

                        <Text style={styles.brailleText}>Braille</Text>

                    </View>

                    <View style={styles.aslCard}>

                        <Image
                            style={{width: 48, height: 48}}
                            source={require("../../assets/aslIcon.svg")}
                            contentFit="contain"
                        />

                        <Text style={styles.aslText}>ASL</Text>

                        <Text style={styles.betaText}>BETA</Text>

                    </View>


                </View>


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
    services: {
        display: "flex", flexDirection: "row", columnGap: 24, marginTop: 32
    },
    brailleCard: {
        width: 120, height: 120, 
        backgroundColor: "#3A3530",
        borderRadius: 4,
        position: "relative",
        display: "flex", justifyContent: "center", alignItems: "center",
    },
    brailleText: {
        fontSize: 16, fontWeight: "bold", color: "#F4C288", marginTop: 8
    },
    aslCard: {
        width: 120, height: 120, 
        backgroundColor: "#A08361",
        borderRadius: 4,
        position: "relative",
        display: "flex", justifyContent: "center", alignItems: "center",
    },
    aslText: {
        fontSize: 16, fontWeight: "bold", color: "#000", marginTop: 8
    },
    betaText: {
        position: "absolute", top: 12, right: 12, color: "#9403fc", fontWeight: "bold", fontSize: 8
    }
})