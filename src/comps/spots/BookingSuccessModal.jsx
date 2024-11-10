import { CheckCircle } from "lucide-react";
import PropTypes from "prop-types";

const BookingSuccessModal = ({ booking, onClose }) => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-lg max-w-md w-full p-6">
				<div className="flex flex-col items-center text-center">
					<CheckCircle className="h-16 w-16 text-green-500 mb-4" />
					<h2 className="text-2xl font-semibold mb-2">Booking Confirmed!</h2>
					<p className="text-gray-600 mb-4">
						Your parking spot has been successfully booked.
					</p>

					<div className="w-full bg-gray-50 rounded-lg p-4 mb-4">
						<div className="text-left">
							<p className="font-medium">{booking.location.address}</p>
							<p className="text-gray-600 text-sm mt-1">
								Date: {new Date(booking.date).toLocaleDateString()}
							</p>
							<p className="text-gray-600 text-sm">
								Time: {booking.startTime} - {booking.endTime}
							</p>
							<p className="text-gray-600 text-sm">
								Total: ${booking.totalPrice}
							</p>
						</div>
					</div>

					<div className="space-y-2 w-full">
						<button
							onClick={() => (window.location.href = "/dashboard/bookings")}
							className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
						>
							View My Bookings
						</button>
						<button
							onClick={onClose}
							className="w-full border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

BookingSuccessModal.propTypes = {
	booking: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default BookingSuccessModal;
