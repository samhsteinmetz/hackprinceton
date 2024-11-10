import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "/Users/samstein/hackprinceton/src/config/firebase.js"; 

const UserTitle = ({ userId }) => {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const fetchUserName = async () => {
            if (!userId) return;

            try {
                const userRef = doc(db, "users", userId);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    setUserName(userDoc.data().name); // Assumes 'name' field is in the user document
                } else {
                    console.log("No user data found");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserName();
    }, [userId]);

    return (
        <div className="flex justify-center items-center h-full">
        <h2 className="text-2xl font-semibold border-blue-500 text-blue-600">
            Welcome, {userName || "Guest"}!
        </h2>
    </div>
    );
};

export default UserTitle;
