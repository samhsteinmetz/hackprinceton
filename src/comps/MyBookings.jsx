import { useState, useEffect } from "react";
import { Clock, Calendar, MapPin } from "lucide-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";

const MyBookings = () => {
	const { user } = useAuth();
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBookings = async () => {
			if (!user) return;

			try {
				const q = query(
					collection(db, "bookings"),
					where("userId", "==", user.uid)
				);
				const querySnapshot = await getDocs(q);
				const bookingsData = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				// Sort bookings by date, most recent first
				bookingsData.sort((a, b) => new Date(b.date) - new Date(a.date));
				setBookings(bookingsData);
			} catch (error) {
				console.error("Error fetching bookings:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchBookings();
	}, [user]);

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 py-12 px-4">
				<div className="max-w-7xl mx-auto">
					<div className="text-center">Loading your bookings...</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

				{bookings.length === 0 ? (
					<div className="text-center py-12 bg-white rounded-lg shadow">
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							No bookings yet
						</h3>
						<p className="text-gray-600">
							When you book a parking spot, it will appear here.
						</p>
					</div>
				) : (
					<div className="space-y-6">
						{bookings.map((booking) => (
							<div
								key={booking.id}
								className="bg-white rounded-lg shadow overflow-hidden"
							>
								<div className="p-6">
									<div className="flex justify-between items-start">
										<div>
											<h3 className="text-lg font-medium text-gray-900">
												{booking.location.address}
											</h3>
											<div className="mt-2 space-y-2">
												<p className="flex items-center text-gray-600">
													<Calendar className="h-4 w-4 mr-2" />
													{new Date(booking.date).toLocaleDateString()}
												</p>
												<p className="flex items-center text-gray-600">
													<Clock className="h-4 w-4 mr-2" />
													{booking.startTime} - {booking.endTime}
												</p>
												<p className="flex items-center text-gray-600">
													<MapPin className="h-4 w-4 mr-2" />
													{booking.location.city}, {booking.location.state}
												</p>
											</div>
										</div>
										<div className="text-right">
											<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
												{booking.status}
											</span>
											<p className="mt-2 text-2xl font-semibold text-gray-900">
												${booking.totalPrice}
											</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default MyBookings;
