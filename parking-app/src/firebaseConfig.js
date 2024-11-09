// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvMHeFiZHwAaGMJRTL1YFMlQtMK5qFTng",
  authDomain: "hackprinceton-b1bf4.firebaseapp.com",
  projectId: "hackprinceton-b1bf4",
  storageBucket: "hackprinceton-b1bf4.firebasestorage.app",
  messagingSenderId: "384997979505",
  appId: "1:384997979505:web:192964def8a929dae3f2d0",
  measurementId: "G-NC6Q9914FH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
