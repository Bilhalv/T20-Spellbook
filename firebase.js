// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6WCRluxGpBfIqHUZY7WmCIq6ta7AqAiY",
  authDomain: "t20-spellbook.firebaseapp.com",
  projectId: "t20-spellbook",
  storageBucket: "t20-spellbook.appspot.com",
  messagingSenderId: "952548118768",
  appId: "1:952548118768:web:a29faa93b8f07c9313f235",
  measurementId: "G-FMVC252GJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);
export default firebase;