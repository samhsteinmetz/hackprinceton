import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import PropTypes from "prop-types";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [userRole, setUserRole] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser) {
				// Get user role from Firestore
				try {
					const userDoc = await getDoc(doc(db, "users", currentUser.uid));
					if (userDoc.exists()) {
						setUserRole(userDoc.data().role);
					}
				} catch (error) {
					console.error("Error fetching user role:", error);
				}
			} else {
				setUserRole(null);
			}
			setUser(currentUser);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		user,
		userRole,
		loading,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
