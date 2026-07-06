const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "albumcopa-cf003.firebaseapp.com",
    projectId: "albumcopa-cf003",
    storageBucket: "albumcopa-cf003.firebasestorage.app",
    messagingSenderId: "844864114817",
    appId: "1:844864114817:web:83166e1c1691684b4cfd80",
    measurementId: "G-DEFWTX53R"
};

let auth = null;
let db = null;

try {
    firebase.initializeApp(firebaseConfig);

    auth = firebase.auth();
    db = firebase.firestore();
} catch (error) {
    console.warn("Firebase não inicializado", error);
}

export { auth, db };