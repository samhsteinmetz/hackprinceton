// src/authService.js
import { auth } from './src/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Sign up function
export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Log in function
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Log out function
export const logout = () => {
  return signOut(auth);
};


/*
import { signup, login, logout } from "./authService";

const handleSignup = async () => {
  try {
    await signup("user@example.com", "password123");
    console.log("User signed up!");
  } catch (error) {
    console.error("Error signing up:", error);
  }
};
*/