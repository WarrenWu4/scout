import { initializeApp } from "firebase-admin/app";
import { Firestore } from "firebase-admin/firestore";
import { Storage } from "@google-cloud/storage";
import { onCall } from "firebase-functions/v2/https";

initializeApp();

const firestore = new Firestore();
const storage = new Storage();

const bucket_name = "tamuhack-scout-bucket";

export const uploadImageMetadata = onCall({ maxInstances: 1 }, async (req) => {
    const data = req.data;

    await firestore.collection("images").doc(data.id).set(data);
});

export const getImages = onCall(async () => {
    const images = await firestore.collection("images").get();

    return images.docs.map((doc) => doc.data());
});

export const getImageSignedUrl = onCall(async (req) => {
    const file = storage.bucket(bucket_name).file(req.data.id);
    const [url] = await file.getSignedUrl({
        action: "write",
        expires: Date.now() + 60 * 60 * 1000,
    });

    return url;
});

export const makeImagePublic = onCall(async (req) => {
    const file = storage.bucket(bucket_name).file(req.data.id);
    await file.makePublic();
});
