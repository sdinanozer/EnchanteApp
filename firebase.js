// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import firebase from "firebase/app";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';


import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhFUumOBXXRvaUSIhloInmZV3ITUs9mfw",
    authDomain: "enchante-app-e8057.firebaseapp.com",
    projectId: "enchante-app-e8057",
    storageBucket: "enchante-app-e8057.appspot.com",
    messagingSenderId: "93692278929",
    appId: "1:93692278929:web:9ee4d95dc7b700c5836730"
};

// Initialize Firebase
//const app =firebase.initializeApp(firebaseConfig);
 let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
} 

const auth = firebase.auth()

export { auth };