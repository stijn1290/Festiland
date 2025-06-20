// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfJSeYUWa6Dp2WQ6M29EPimShs04wbXx4",
    authDomain: "festiland-882fd.firebaseapp.com",
    projectId: "festiland-882fd",
    storageBucket: "festiland-882fd.firebasestorage.app",
    messagingSenderId: "754146793966",
    appId: "1:754146793966:web:90e44b6aa8252cb86e96ff",
    measurementId: "G-G92R24VQDM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};