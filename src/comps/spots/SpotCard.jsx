import { useState } from "react";
import { Heart, MapPin, Clock } from "lucide-react";
import PropTypes from "prop-types";

const SpotCard = ({ spot, onSelect }) => {
	const [isFavorite, setIsFavorite] = useState(false);

	return (
		<div
			className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
			onClick={() => onSelect(spot)}
		>
			{/* Map Preview Section */}
			<div className="relative h-48">
				<img
					src={`https://maps.googleapis.com/maps/api/staticmap?center=${
						spot.location.coordinates.lat
					},${
						spot.location.coordinates.lng
					}&zoom=15&size=400x200&markers=color:red%7C${
						spot.location.coordinates.lat
					},${spot.location.coordinates.lng}&key=${
						import.meta.env.VITE_GOOGLE_MAPS_API_KEY
					}`}
					alt={`Map preview of ${spot.location.address}`}
					className="w-full h-full object-cover"
				/>
				<button
					onClick={(e) => {
						e.stopPropagation();
						setIsFavorite(!isFavorite);
					}}
					className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
				>
					<Heart
						className={`w-5 h-5 ${
							isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
						}`}
					/>
				</button>
			</div>

			{/* Content Section */}
			<div className="p-4">
				{/* Location and Type */}
				<div className="flex justify-between items-start mb-2">
					<div>
						<h3 className="font-semibold text-lg">{spot.location.address}</h3>
						<div className="flex items-center text-sm text-gray-600 mt-1">
							<MapPin className="w-4 h-4 mr-1" />
							<span>
								{spot.location.city}, {spot.location.state}
							</span>
						</div>
					</div>
					<div className="flex items-center bg-gray-100 px-2 py-1 rounded">
						<span className="text-sm">{spot.type}</span>
					</div>
				</div>

				{/* Availability */}
				<div className="flex items-center text-sm text-gray-600 mb-2">
					<Clock className="w-4 h-4 mr-2" />
					<span>
						{spot.availability.start} - {spot.availability.end}
					</span>
				</div>

				{/* Price */}
				<div className="flex justify-between items-center mt-4">
					<div className="flex items-center">
						<span className="font-semibold text-lg">
							${spot.price.toFixed(2)}
						</span>
						<span className="text-sm text-gray-600">/hour</span>
					</div>

					<button
						onClick={(e) => {
							e.stopPropagation();
							onSelect(spot);
						}}
						className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
					>
						Book Now
					</button>
				</div>
			</div>
		</div>
	);
};

SpotCard.propTypes = {
	spot: PropTypes.shape({
		location: PropTypes.shape({
			address: PropTypes.string.isRequired,
			city: PropTypes.string.isRequired,
			state: PropTypes.string.isRequired,
			coordinates: PropTypes.shape({
				lat: PropTypes.number.isRequired,
				lng: PropTypes.number.isRequired,
			}).isRequired,
		}).isRequired,
		price: PropTypes.number.isRequired,
		type: PropTypes.string.isRequired,
		availability: PropTypes.shape({
			start: PropTypes.string.isRequired,
			end: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
	onSelect: PropTypes.func.isRequired,
};

export default SpotCard;
