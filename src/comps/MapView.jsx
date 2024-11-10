import { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { X, Clock } from "lucide-react";
import PropTypes from "prop-types";

const MapView = ({ spots, onBookNow, center }) => {
	const [selectedSpot, setSelectedSpot] = useState(null);
	const [mapRef, setMapRef] = useState(null);

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
	});

	const mapStyles = {
		height: "calc(100vh - 64px)",
		width: "100%",
	};

	const defaultCenter = {
		lat: 40.3573,
		lng: -74.6672,
	};

	// Pan to new center when center prop changes
	useEffect(() => {
		if (mapRef && center) {
			mapRef.panTo(center);
			mapRef.setZoom(14);
		}
	}, [center, mapRef]);

	if (loadError) return <div>Error loading maps</div>;
	if (!isLoaded) return <div>Loading maps...</div>;

	return (
		<div className="relative">
			<GoogleMap
				mapContainerStyle={mapStyles}
				zoom={13}
				center={center || defaultCenter}
				onClick={() => setSelectedSpot(null)}
				onLoad={(map) => setMapRef(map)}
			>
				{spots.map((spot) => (
					<Marker
						key={spot.id}
						position={{
							lat: spot.location.coordinates.lat,
							lng: spot.location.coordinates.lng,
						}}
						onClick={() => setSelectedSpot(spot)}
						label={{
							text: `$${spot.price}`,
							color: "white",
							className: "marker-label",
						}}
					/>
				))}
			</GoogleMap>

			{/* Floating Preview Card */}
			{selectedSpot && (
				<div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-[400px] bg-white rounded-xl shadow-lg overflow-hidden">
					<div className="relative h-[200px]">
						<img
							src={`https://maps.googleapis.com/maps/api/staticmap?center=${
								selectedSpot.location.coordinates.lat
							},${
								selectedSpot.location.coordinates.lng
							}&zoom=15&size=400x200&markers=color:red%7C${
								selectedSpot.location.coordinates.lat
							},${selectedSpot.location.coordinates.lng}&key=${
								import.meta.env.VITE_GOOGLE_MAPS_API_KEY
							}`}
							alt={`Preview of ${selectedSpot.location.address}`}
							className="w-full h-full object-cover"
						/>

						<button
							onClick={() => setSelectedSpot(null)}
							className="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-gray-100"
						>
							<X className="h-4 w-4" />
						</button>
					</div>

					<div className="p-4">
						<div className="flex justify-between items-start mb-2">
							<div>
								<h3 className="font-semibold text-lg">
									{selectedSpot.type} Parking
								</h3>
								<p className="text-gray-600">{selectedSpot.location.address}</p>
							</div>
						</div>

						<div className="flex items-center text-sm text-gray-600 mb-2">
							<Clock className="w-4 h-4 mr-2" />
							<span>
								{selectedSpot.availability.start} -{" "}
								{selectedSpot.availability.end}
							</span>
						</div>

						<div className="flex justify-between items-center mt-4">
							<div className="flex items-center">
								<span className="font-semibold text-lg">
									${selectedSpot.price}/hr
								</span>
							</div>

							<button
								onClick={() => onBookNow(selectedSpot)}
								className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
							>
								Book Now
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

MapView.propTypes = {
	spots: PropTypes.array.isRequired,
	onBookNow: PropTypes.func.isRequired,
	center: PropTypes.any.isRequired,
};

export default MapView;
