import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { Link } from 'expo-router';
import ImgPreview from '../../components/ImgPreview';

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

    async function takePicture() {
        if (camera) {
            const photo = await camera.takePictureAsync();
            setPreview(true);
            setImg(photo);
        }
    }

    if (preview && img) {
        return (
            <ImgPreview img={img}></ImgPreview>
        );
    }

return (
    <View style={styles.container}>
    <Camera style={styles.camera} type={type} ref={(r) => {camera = r}}>

        <View style={styles.buttonContainer}>

            <View>

                <Link href="/camera">
                    <Text>Back</Text>
                </Link>

                <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                    <Text style={styles.text}>Flip Camera</Text>
                </TouchableOpacity>

            </View>

        <TouchableOpacity style={styles.button} onPress={takePicture}>
            <View style={{width: 52, height: 52, borderRadius: "50%", backgroundColor: "white"}}></View>
        </TouchableOpacity>

        </View>

    </Camera>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
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
});
