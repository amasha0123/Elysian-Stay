// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);