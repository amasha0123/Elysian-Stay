// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

//Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDvLOvtHVsX0PumS3UEqj8RAqgNNbLjI9Y",
    authDomain: "elysian-stay.firebaseapp.com",
    projectId: "elysian-stay",
    storageBucket: "elysian-stay.firebasestorage.app",
    messagingSenderId: "734782995784",
    appId: "1:734782995784:web:4464379cc7795ea1ef477d",
    measurementId: "G-V1ZHVTMHZ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
}
const db = getFirestore(app);

// Simple check to verify connectivity
import { getDoc, doc } from "firebase/firestore";
const checkConnection = async () => {
    try {
        // Attempt to access a test document
        await getDoc(doc(db, "connection_check", "test"));
        console.log("✅ Firebase connected successfully!");
    } catch (error) {
        if (error.code === 'not-found' || error.message.includes('Database')) {
            console.error("❌ Firebase Warning: The project exists, but the Firestore database '(default)' was not found. Please ensure you have created a Firestore database in the Firebase Console (https://console.firebase.google.com/).");
        } else if (error.code === 'permission-denied') {
            console.error("❌ Firebase Warning: Permission denied. Check your Firestore Security Rules.");
        } else {
            console.error("❌ Firebase connection failed:", error.code, error.message);
        }
    }
};

checkConnection();

export { app, db, analytics };
