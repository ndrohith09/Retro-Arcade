// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/storage";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUe_mnViHOtGRFlY8ImHzAKSLjBttzUZA",
  authDomain: "retro-arcade-de6de.firebaseapp.com",
  projectId: "retro-arcade-de6de",
  storageBucket: "retro-arcade-de6de.appspot.com",
  messagingSenderId: "403451220266",
  appId: "1:403451220266:web:11f066c6cb45c59cba8e53",
  measurementId: "G-77E58VWDBE",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { storage, firestore, auth };
