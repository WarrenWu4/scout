import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";

const uploadImageMetadata = httpsCallable(functions, "uploadImageMetadata");
const getImages = httpsCallable(functions, "getImages");
const uploadImageToBucket = httpsCallable(functions, "uploadImageToBucket");
const makeImagePublic = httpsCallable(functions, "makeImagePublic");

export async function uploadImage(img) {
    try {
    const id = Date.now();
    console.log("ID in seconds: ", id)
    const response = await getImageSignedUrl({ id });
    console.log("Response: ",response)
    await fetch(response.data.url, {
        method: "PUT",
        headers: {
            "Content-Type": "image/jpeg",
        },
        body: img,
    });
    console.log("TESTING")
    } catch(e) {
        console.log(e)
    }
    

    await makeImagePublic({ id });

    // const flask = // get pot request from siddhu
        
    // await uploadImageMetadata({
    //         id,
    //         translation: flask.data.final_string,
    //         url:
    //             "https://storage.googleapis.com/tamuhack-scout-bucket/" +
    //             id +
    //             img.type,
    //     });
}
