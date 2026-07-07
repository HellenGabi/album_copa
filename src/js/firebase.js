var firebaseConfig = {
    apiKey: "AIzaSyAkdEi54zUDH7soaJqpsUOSRGAF4vyYZCE",
    authDomain: "albumcopa-cf003.firebaseapp.com",
    projectId: "albumcopa-cf003",
    storageBucket: "albumcopa-cf003.firebasestorage.app",
    messagingSenderId: "844864114817",
    appId: "1:844864114817:web:83166e1c1691684b4cfd80",
    measurementId: "G-DEFWTX53R"
};

try {
    if (window.firebase && !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
} catch (e) {
    console.warn("Firebase não configurado. Use suas credenciais corretamente.", e);
}

var auth = (window.firebase && firebase.auth) ? firebase.auth() : null;
var db = (window.firebase && firebase.firestore) ? firebase.firestore() : null;