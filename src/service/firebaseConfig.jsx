// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVlsqyWjfwQrKWudNxjVRBMtOuS_Ls-NQ",
  authDomain: "ai-travel-c1f45.firebaseapp.com",
  projectId: "ai-travel-c1f45",
  storageBucket: "ai-travel-c1f45.firebasestorage.app",
  messagingSenderId: "897077339761",
  appId: "1:897077339761:web:f60f6b214f22ece96e5dd0",
  measurementId: "G-PTS6ENCEYF"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);
// const analytics = getAnalytics(app);