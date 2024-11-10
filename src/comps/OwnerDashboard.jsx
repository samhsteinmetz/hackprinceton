import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

export default function OwnerDashboard() {
	const { user } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await auth.signOut();
			navigate("/login");
		} catch (error) {
			console.error("Failed to log out:", error);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4">
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold text-gray-900">
						Manage Your Parking Spots
					</h1>
					<button
						onClick={handleLogout}
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
					>
						Log Out
					</button>
				</div>
				<p className="mt-4 text-gray-600">Welcome, {user?.email}</p>
				{/* Add owner-specific features here */}
			</div>
		</div>
	);
}
