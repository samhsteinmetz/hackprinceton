import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Sliders } from "lucide-react";
import PropTypes from "prop-types";

const SearchBar = ({ onSearch }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [showFilters, setShowFilters] = useState(false);
	const [selectedPlace, setSelectedPlace] = useState(null);
	const [filters, setFilters] = useState({
		maxPrice: Infinity,
		parkingType: "all",
		radius: 5, // Default to 5 miles
	});

	const autocompleteRef = useRef(null);
	const inputRef = useRef(null);

	useEffect(() => {
		if (!window.google) return;
		if (!inputRef.current) return;

		autocompleteRef.current = new window.google.maps.places.Autocomplete(
			inputRef.current,
			{
				types: ["establishment", "geocode"],
				componentRestrictions: { country: "us" },
			}
		);

		autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
	}, []);

	// const initAutocomplete = () => {
	// 	if (!inputRef.current) return;

	// 	autocompleteRef.current = new window.google.maps.places.Autocomplete(
	// 		inputRef.current,
	// 		{
	// 			types: ["establishment", "geocode"],
	// 			componentRestrictions: { country: "us" },
	// 		}
	// 	);

	// 	autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
	// };

	const handlePlaceSelect = () => {
		const place = autocompleteRef.current.getPlace();
		if (!place.geometry) return;

		setSelectedPlace({
			name: place.name,
			address: place.formatted_address,
			coordinates: {
				lat: place.geometry.location.lat(),
				lng: place.geometry.location.lng(),
			},
		});
		setSearchQuery(place.formatted_address);
	};

	const handleFilterChange = (newFilters) => {
		setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!selectedPlace) {
			alert("Please select a location from the autocomplete suggestions");
			return;
		}

		onSearch({
			query: searchQuery,
			place: selectedPlace,
			filters,
		});
	};

	return (
		<div className="relative max-w-4xl mx-auto px-4">
			<form onSubmit={handleSubmit}>
				<div className="flex items-center space-x-2">
					{/* Search Input */}
					<div className="flex-1">
						<div className="flex items-center bg-white rounded-full shadow-md border border-gray-200">
							<MapPin className="h-5 w-5 text-gray-400 ml-4" />
							<input
								ref={inputRef}
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Search for venues or addresses..."
								className="w-full px-4 py-3 rounded-full focus:outline-none"
							/>
						</div>
					</div>

					{/* Filter Toggle */}
					<button
						type="button"
						onClick={() => setShowFilters(!showFilters)}
						className="p-3 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50"
					>
						<Sliders className="h-5 w-5 text-gray-600" />
					</button>

					{/* Search Button */}
					<button
						type="submit"
						className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors flex items-center"
					>
						<Search className="h-5 w-5" />
						<span className="ml-2 hidden sm:inline">Search</span>
					</button>
				</div>

				{/* Filters */}
				{showFilters && (
					<div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{/* Distance Filter - Now Required */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Search Radius <span className="text-red-500">*</span>
								</label>
								<select
									value={filters.radius}
									onChange={(e) =>
										handleFilterChange({
											radius: Number(e.target.value),
										})
									}
									className="block w-full rounded-md border border-gray-300 py-2 px-3"
									required
								>
									<option value="1">Within 1 mile</option>
									<option value="5">Within 5 miles</option>
									<option value="10">Within 10 miles</option>
								</select>
							</div>

							{/* Price Filter */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Max Price
								</label>
								<select
									value={filters.maxPrice}
									onChange={(e) =>
										handleFilterChange({
											maxPrice:
												e.target.value === "any"
													? Infinity
													: Number(e.target.value),
										})
									}
									className="block w-full rounded-md border border-gray-300 py-2 px-3"
								>
									<option value="any">Any Price</option>
									<option value="10">Up to $10/hr</option>
									<option value="25">Up to $25/hr</option>
									<option value="50">Up to $50/hr</option>
								</select>
							</div>

							{/* Type Filter */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Parking Type
								</label>
								<select
									value={filters.parkingType}
									onChange={(e) =>
										handleFilterChange({ parkingType: e.target.value })
									}
									className="block w-full rounded-md border border-gray-300 py-2 px-3"
								>
									<option value="all">All Types</option>
									<option value="Driveway">Driveway</option>
									<option value="Garage">Garage</option>
									<option value="Street">Street</option>
								</select>
							</div>
						</div>
					</div>
				)}
			</form>
		</div>
	);
};

SearchBar.propTypes = {
	onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
