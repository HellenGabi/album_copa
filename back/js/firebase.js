const firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "...",
    measurementId: "..."
};

try {
    firebase.initializeApp(firebaseConfig);
} catch (e) {
    console.warn("Firebase não configurado.");
}

const auth = firebase.auth ? firebase.auth() : null;
const db = firebase.firestore ? firebase.firestore() : null;