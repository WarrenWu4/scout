import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";

const uploadImageMetadata = httpsCallable(functions, "uploadImageMetadata");
const getImages = httpsCallable(functions, "getImages");
const getImageSignedUrl = httpsCallable(functions, "getImageSignedUrl");
const makeImagePublic = httpsCallable(functions, "makeImagePublic");

export async function uploadImage(img) {
    const id = Date.now();
    const response = await getImageSignedUrl({ id });
    await fetch(response.data.url, {
        method: "PUT",
        headers: {
            "Content-Type": img.type,
        },
        body: img,
    });

    await makeImagePublic({ id });

    const flask = // get pot request from siddhu
        uploadImageMetadata({
            id,
            translation: flask.data.final_string,
            url:
                "https://storage.googleapis.com/tamuhack-scout-bucket/" +
                id +
                img.type,
        });
}
