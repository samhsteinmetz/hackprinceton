import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./comps/Login";
import Signup from "./comps/Signup";
import Dashboard from "./comps/Dashboard";
import ProtectedRoute from "./comps/ProtectedRoute";
import EventsDashboard from "./comps/EventsDashboard";

function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					{/* Home page - anyone can see this */}
					<Route
						path="/"
						element={
							<div className="min-h-screen bg-gray-50">
								<h1 className="text-3xl font-bold text-center py-8">
									ParkShare
								</h1>
							</div>
						}
					/>

					{/* Login page route */}
					<Route path="/login" element={<Login />} />

					{/* Signup page route */}
					<Route path="/signup" element={<Signup />} />

					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>

					<Route path="/eventsdashboard" element={<EventsDashboard/>} />
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
