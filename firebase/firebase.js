const firebase = require("firebase/app");
const auth = require("firebase/auth");

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);

export function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
}

export function signInWithApple() {
    const provider = new firebase.auth.OAuthProvider("apple.com");
    firebase.auth().signInWithRedirect(provider);
}

export function signInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
}

export function signOut() {
    firebase.auth().signOut();
}

export function onAuthStateChanged(callback) {
    firebase.auth().onAuthStateChanged(callback);
}
