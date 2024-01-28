import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView } from "react-native"
import { Slot } from "expo-router"
import Navigation from "../../components/Navigation"
import { StyleSheet, View } from "react-native"

export default function SubLayout() {
    return (
        <SafeAreaView style={styles.mainContainer}>

            <ScrollView style={styles.subContainer}>
                <Slot/>
            </ScrollView>

            <Navigation/>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: '#F4C288',
    },
    subContainer: {
        width: "100%",
        height: "100%",
        marginTop: 24,
    }
})
