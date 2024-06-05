import { initializeApp } from 'firebase/app';
import {getFirestore} from "@firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCqNSo3lMQLBuhGW1ux7eTvLx0C2lrGyX0",
    authDomain: "simvic-app.firebaseapp.com",
    projectId: "simvic-app",
    storageBucket: "simvic-app.appspot.com",
    messagingSenderId: "401352023122",
    appId: "1:401352023122:web:eac15c012461ee22d7138b",
    measurementId: "G-MVX7JVSXX8"
};

const app = initializeApp(firebaseConfig);
export const FIREBASE_FIRESTORE = getFirestore(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
