import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./comps/Login";
import Signup from "./comps/Signup";
import Dashboard from "./comps/Dashboard";
import MyBookings from "./comps/MyBookings";
import NavTabs from "./comps/NavTabs";
import ProtectedRoute from "./comps/ProtectedRoute";
import { LoadScript } from "@react-google-maps/api";

const libraries = ["places"];

function App() {
	return (
		<Router>
			<AuthProvider>
				<LoadScript
					googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
					libraries={libraries}
				>
					<Routes>
						{/* Home page - anyone can see this */}
						<Route
							path="/"
							element={
								<div className="min-h-screen bg-gray-50">
									<h1 className="text-3xl font-bold text-center py-8">parq</h1>
								</div>
							}
						/>

						{/* Login page route */}
						<Route path="/login" element={<Login />} />

						{/* Signup page route */}
						<Route path="/signup" element={<Signup />} />

						{/* Main dashboard route */}
						<Route
							path="/dashboard"
							element={
								<ProtectedRoute>
									<Dashboard />
								</ProtectedRoute>
							}
						/>

						{/* Bookings route */}
						<Route
							path="/dashboard/bookings"
							element={
								<ProtectedRoute>
									<NavTabs />
									<MyBookings />
								</ProtectedRoute>
							}
						/>

						{/* Add placeholder routes for other tabs */}
						<Route
							path="/dashboard/favorites"
							element={
								<ProtectedRoute>
									<NavTabs />
									<div className="min-h-screen bg-gray-50 py-12 px-4">
										<div className="max-w-7xl mx-auto">
											<h1 className="text-3xl font-bold">Favorites</h1>
											<p className="mt-4">Coming soon...</p>
										</div>
									</div>
								</ProtectedRoute>
							}
						/>

						<Route
							path="/dashboard/notifications"
							element={
								<ProtectedRoute>
									<NavTabs />
									<div className="min-h-screen bg-gray-50 py-12 px-4">
										<div className="max-w-7xl mx-auto">
											<h1 className="text-3xl font-bold">Notifications</h1>
											<p className="mt-4">Coming soon...</p>
										</div>
									</div>
								</ProtectedRoute>
							}
						/>

						<Route
							path="/dashboard/profile"
							element={
								<ProtectedRoute>
									<NavTabs />
									<div className="min-h-screen bg-gray-50 py-12 px-4">
										<div className="max-w-7xl mx-auto">
											<h1 className="text-3xl font-bold">Profile</h1>
											<p className="mt-4">Coming soon...</p>
										</div>
									</div>
								</ProtectedRoute>
							}
						/>
					</Routes>
				</LoadScript>
			</AuthProvider>
		</Router>
	);
}

export default App;
