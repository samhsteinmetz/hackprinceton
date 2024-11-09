// src/firestoreService.js
import { db } from "./src/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Function to add a parking spot
export const addSpot = async (spotData) => {
  const spotsCollection = collection(db, "spots");
  await addDoc(spotsCollection, spotData);
};

// Function to get all parking spots
export const getSpots = async () => {
  const spotsCollection = collection(db, "spots");
  const snapshot = await getDocs(spotsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * import { addSpot, getSpots } from "./firestoreService";

const handleAddSpot = async () => {
  const spotData = { location: "123 Main St", available: true };
  await addSpot(spotData);
  console.log("Spot added!");
};

const fetchSpots = async () => {
  const spots = await getSpots();
  console.log("Spots:", spots);
};

 */