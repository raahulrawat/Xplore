// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWjTAesFHcE0uvcrT4N-GE1A4x68QqjlI",
  authDomain: "place-cf0f7.firebaseapp.com",
  projectId: "place-cf0f7",
  storageBucket: "place-cf0f7.firebasestorage.app",
  messagingSenderId: "704379723183",
  appId: "1:704379723183:web:bd2e58e028cb9c0894235a",
  measurementId: "G-TBXNVFE4PX"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);
// const analytics = getAnalytics(app);