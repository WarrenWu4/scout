import { Text, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';
import TCard from '../../components/TCard';
import AnimatedTyping from '../../components/AnimatedTyping';


export default function Page() {

    let [greetingText, setGreetingText] = useState("Welcome to scout!")

    return (
        <View style={styles.home}>

            <View style={styles.homeHeader}>

                <View style={styles.homeTitle}>
                    <Text style={styles.homeTitleText}>
                        <AnimatedTyping text={[greetingText]} onComplete={() => {
                            setTimeout(() => {
                                setGreetingText("Welcome to scout! Here's where you left off")
                            }, 2000)
                        }}/>
                    </Text>
                </View>

                <Image
                    style={{ width: 40, height: 40 }}
                    source={require("../../assets/logo.svg")}
                    contentFit="contain"
                />

            </View>

            <View style={styles.cardContainer}>

                <TCard text={"The adventurous cat leaped gracefully from one rooftop to another, exploring the cityscape."}></TCard>
                <TCard text={"In the quiet library, the smell of old books filled the air as students studied diligently for their exams."}></TCard>

            </View>

        </View>
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
        marginTop: 0,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    homeTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    homeTitleText: {
        fontSize: 22,
        fontWeight: "bold",
    },
    cardContainer: {
        marginTop: 32,
        width: "100%",
        height: "100%",
        display: "flex",
        rowGap: 28,
    }
})