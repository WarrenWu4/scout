import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import ImgPreview from "../../components/ImgPreview"
import { SafeAreaView } from 'react-native-safe-area-context';

import * as FileSystem from 'expo-file-system';

export default function Page() {

    let camera = null;

    const [preview, setPreview] = useState(false)
    const [img, setImg] = useState(null)
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
        </View>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const getBlobFroUri = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });
      
        return blob;
    };

    async function takePicture() {
        if (camera) {
            const photo = await camera.takePictureAsync();
            setPreview(true);
            setImg(photo);
            const imageBlog = await getBlobFroUri(photo.uri);
            console.log(imageBlog)
        }
    }

    if (preview && img) {
        return (
            <ImgPreview img={img} setPreview={setPreview}></ImgPreview>
        );
    }

return (
    <SafeAreaView style={styles.container}>
        <Camera style={styles.camera} type={type} ref={(r) => {camera = r}}>

        <View style={styles.buttonContainerController}>

            <Link href="/camera">
                <View style={{padding: 8, backgroundColor:"white", borderRadius: 4}}>
                    <Image
                        style={{ width: 24, height: 24}}
                        source={require("../../assets/backArrow.svg")}
                        contentFit="contain"
                    />
                </View>
            </Link>

            <TouchableOpacity style={{padding: 8, backgroundColor:"black", borderRadius: 4}} onPress={toggleCameraType}>
                <Image
                    style={{ width: 24, height: 24}}
                    source={require("../../assets/switch.svg")}
                    contentFit="contain"
                />
            </TouchableOpacity>

        </View>

        <View style={styles.buttonContainer}>


            <TouchableOpacity style={styles.button} onPress={takePicture}>
                <View style={{width: 52, height: 52, borderRadius: "50%", backgroundColor: "white"}}></View>
            </TouchableOpacity>

        </View>

        </Camera>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "black",
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginBottom: 40,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonContainerController: {
        width: "100%",
        padding: 16,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 32,
    }
});
