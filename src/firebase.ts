// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmcIWm-iU29n6IqNH98EDUOYuiVb1YYrM",
  authDomain: "labmaster-69420.firebaseapp.com",
  projectId: "labmaster-69420",
  storageBucket: "labmaster-69420.appspot.com",
  messagingSenderId: "737037502519",
  appId: "1:737037502519:web:57a458daf40a6f35b157b2",
  measurementId: "G-ENXYPXVJ5N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
