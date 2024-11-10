import { useState } from "react";
import { X, Clock } from "lucide-react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import PropTypes from "prop-types";

const BookingModal = ({ spot, onClose }) => {
	const { user } = useAuth();
	const [date, setDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [duration, setDuration] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const calculateEndTime = (start, durationHours) => {
		if (!start) return "";
		const [hours, minutes] = start.split(":");
		const endDate = new Date();
		endDate.setHours(parseInt(hours) + durationHours);
		endDate.setMinutes(parseInt(minutes));
		return `${endDate.getHours().toString().padStart(2, "0")}:${endDate
			.getMinutes()
			.toString()
			.padStart(2, "0")}`;
	};

	const calculateTotalPrice = () => {
		return (spot.price * duration).toFixed(2);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!user) {
			setError("Please log in to book a spot");
			return;
		}

		setLoading(true);
		setError("");

		const booking = {
			spotId: spot.id,
			userId: user.uid,
			date,
			startTime,
			endTime: calculateEndTime(startTime, duration),
			duration,
			totalPrice: calculateTotalPrice(),
			status: "pending",
			createdAt: new Date().toISOString(),
		};

		try {
			await addDoc(collection(db, "bookings"), booking);
			onClose();
		} catch (error) {
			console.error("Booking error:", error);
			setError("Failed to create booking. Please try again.");
		}

		setLoading(false);
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-lg max-w-md w-full p-6">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">Book Parking Spot</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<X className="h-6 w-6" />
					</button>
				</div>

				<div className="mb-6">
					<h3 className="font-medium">{spot.location.address}</h3>
					<p className="text-gray-600">{spot.type} Parking</p>
					<p className="text-gray-600 flex items-center mt-1">
						<Clock className="h-4 w-4 mr-1" />
						Available: {spot.availability.start} - {spot.availability.end}
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Date
						</label>
						<input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							className="w-full rounded-md border border-gray-300 p-2"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Start Time
						</label>
						<input
							type="time"
							value={startTime}
							onChange={(e) => setStartTime(e.target.value)}
							className="w-full rounded-md border border-gray-300 p-2"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Duration (hours)
						</label>
						<select
							value={duration}
							onChange={(e) => setDuration(Number(e.target.value))}
							className="w-full rounded-md border border-gray-300 p-2"
						>
							{[1, 2, 3, 4, 5, 6, 7, 8].map((hours) => (
								<option key={hours} value={hours}>
									{hours} hour{hours > 1 ? "s" : ""}
								</option>
							))}
						</select>
					</div>

					<div className="border-t pt-4 mt-4">
						<div className="flex justify-between items-center mb-4">
							<span className="font-medium">Total Price</span>
							<span className="font-semibold text-lg">
								${calculateTotalPrice()}
							</span>
						</div>
					</div>

					{error && <div className="text-red-500 text-sm mt-2">{error}</div>}

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
					>
						{loading ? "Processing..." : "Confirm Booking"}
					</button>
				</form>
			</div>
		</div>
	);
};

BookingModal.propTypes = {
	spot: PropTypes.shape({
		id: PropTypes.string.isRequired,
		location: PropTypes.shape({
			address: PropTypes.string.isRequired,
		}).isRequired,
		type: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		availability: PropTypes.shape({
			start: PropTypes.string.isRequired,
			end: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
	onClose: PropTypes.func.isRequired,
};

export default BookingModal;
