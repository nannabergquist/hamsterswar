// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import {
    getFirestore
} from 'firebase/firestore';
import {
    getStorage
} from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCV5Izt0TG6V6L-ag1jcKhdTY0s8zqVOyM",
    authDomain: "hamsterwars-f6384.firebaseapp.com",
    databaseURL: "https://hamsterwars-f6384-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "hamsterwars-f6384",
    storageBucket: "hamsterwars-f6384.appspot.com",
    messagingSenderId: "985985701574",
    appId: "1:985985701574:web:86444b7a9bddd3f1be29c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);