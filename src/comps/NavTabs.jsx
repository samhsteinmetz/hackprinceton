// src/components/Navigation/NavTabs.jsx
import { useState } from "react";
import { Home, Car, Heart, Bell, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import UserTitle from "/Users/samstein/hackprinceton/src/comps/UserTitle/UserTitle.jsx";

const NavTabs = () => {
	const [activeTab, setActiveTab] = useState("home");
	const userId = useAuth().user?.uid;

	const tabs = [
		{ id: "home", name: "Home", icon: Home },
		{ id: "bookings", name: "My Bookings", icon: Car },
		{ id: "favorites", name: "Favorites", icon: Heart },
		{ id: "notifications", name: "Notifications", icon: Bell },
		{ id: "profile", name: "Profile", icon: User },
	];

	return (
		<div className="bg-white shadow-sm border-b">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<div className="flex-shrink-0">
						<h1 className="text-2xl font-bold text-gray-900">Parq</h1>
					</div>

					{/* Navigation Tabs */}
					<div className="flex-1 flex justify-center">
						<div className="hidden sm:flex space-x-8">
							{tabs.map((tab) => {
								const Icon = tab.icon;
								return (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`flex items-center space-x-2 px-3 py-4 text-sm font-medium border-b-2 ${
											activeTab === tab.id
												? "border-blue-500 text-blue-600"
												: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
										}`}
									>
										<Icon className="h-5 w-5" />
										<span>{tab.name}</span>
									</button>
								);
							})}
						</div>
					</div>

					
					<UserTitle userId={userId} />
					

				</div>
			</div>
		</div>
	);
};

export default NavTabs;
