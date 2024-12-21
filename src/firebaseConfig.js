// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyDM_ceooX__qbBH1Mi6__m934tPMrqYwVc",
  authDomain: "authentication-3f929.firebaseapp.com",
  databaseURL: "https://authentication-3f929-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "authentication-3f929",
  storageBucket: "authentication-3f929.firebasestorage.app",
  messagingSenderId: "459126881824",
  appId: "1:459126881824:web:8e8c7d6bec8fc21038c645",
  measurementId: "G-NH284R7KQD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;