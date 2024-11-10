import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBvMHeFiZHwAaGMJRTL1YFMlQtMK5qFTng",
	authDomain: "hackprinceton-b1bf4.firebaseapp.com",
	projectId: "hackprinceton-b1bf4",
	storageBucket: "hackprinceton-b1bf4.firebasestorage.app",
	messagingSenderId: "384997979505",
	appId: "1:384997979505:web:b343d1d1f3ab5274e3f2d0",
	measurementId: "G-F8Z33WQY7E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
