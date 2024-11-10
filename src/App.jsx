import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./comps/Login";
import Signup from "./comps/Signup";
import Dashboard from "./comps/Dashboard";
import ProtectedRoute from "./comps/ProtectedRoute";

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
								<h1 className="text-3xl font-bold text-center py-8">Parq</h1>
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
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
