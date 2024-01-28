import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import ImgPreview from "../../components/ImgPreview"
import { SafeAreaView } from 'react-native-safe-area-context';

import { uploadImage } from '../../firebase/functions';
import * as FileSystem from 'expo-file-system';

import { getDownloadURL, getStorage, ref, uploadBytes } from '@firebase/storage';
import { app } from '../../firebase/firebase';

export default function Page() {

    let camera = null;

    const [translated, setTranslated] = useState("")
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
            setTranslated("")
            const photo = await camera.takePictureAsync();

            // const base64 = await FileSystem.readAsStringAsync(photo.uri, { encoding: 'base64' });

            // console.log(base64)

            // const imageBlob = await getBlobFroUri(photo.uri);
            // console.log(imageBlob)
            const storage = getStorage(app);
            const storageRef = ref(storage, 'images/' + photo.uri.split('/').pop());
            const imageBlob = await fetch(photo.uri).then((response) => response.blob());
            
            await uploadBytes(storageRef, imageBlob);
            console.log('Image uploaded successfully!');

            const url = await getDownloadURL(ref(storage, 'images/' + photo.uri.split('/').pop()));
            console.log(url);
        
            const test = await fetch("http://10.228.163.106:5000", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "bucket_uri": "https://i.imgur.com/osNCAx3.jpg",
                }),
            });
            
            console.log(test);
            const responseData = await test.json();
            setTranslated(responseData["final_string"]);
            console.log(responseData["final_string"])
            setPreview(true);
            setImg(photo);
            
        }
    }

    if (preview && img) {
        return (
            <ImgPreview img={img} translated={translated} setPreview={setPreview}></ImgPreview>
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
