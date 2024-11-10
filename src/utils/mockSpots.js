export const MOCK_SPOTS = [
	{
		id: "1",
		location: {
			address: "123 Nassau Street",
			city: "Princeton",
			state: "NJ",
			coordinates: {
				lat: 40.3573,
				lng: -74.6672,
			},
		},
		type: "Driveway",
		price: 3.5,
		owner: {
			name: "John Smith",
			photoUrl: "/api/placeholder/32/32",
		},
		availability: {
			start: "09:00",
			end: "17:00",
		},
	},
	{
		id: "2",
		location: {
			address: "45 Witherspoon St",
			city: "Princeton",
			state: "NJ",
			coordinates: {
				lat: 40.3502,
				lng: -74.6603,
			},
		},
		type: "Garage",
		price: 5.0,
		owner: {
			name: "Emma Wilson",
			photoUrl: "/api/placeholder/32/32",
		},
		availability: {
			start: "08:00",
			end: "20:00",
		},
	},
	{
		id: "3",
		location: {
			address: "255 Palmer Square",
			city: "Princeton",
			state: "NJ",
			coordinates: {
				lat: 40.3491,
				lng: -74.6608,
			},
		},
		type: "Driveway",
		price: 4.0,
		owner: {
			name: "Michael Brown",
			photoUrl: "/api/placeholder/32/32",
		},
		availability: {
			start: "07:00",
			end: "19:00",
		},
	},
	{
		id: "4",
		location: {
			address: "86 Mercer Street",
			city: "Princeton",
			state: "NJ",
			coordinates: {
				lat: 40.3486,
				lng: -74.659,
			},
		},
		type: "Street",
		price: 2.5,
		owner: {
			name: "Sarah Davis",
			photoUrl: "/api/placeholder/32/32",
		},
		availability: {
			start: "10:00",
			end: "22:00",
		},
	},
	{
		id: "5",
		location: {
			address: "158 University Place",
			city: "Princeton",
			state: "NJ",
			coordinates: {
				lat: 40.3478,
				lng: -74.6567,
			},
		},
		type: "Garage",
		price: 6.0,
		owner: {
			name: "David Chen",
			photoUrl: "/api/placeholder/32/32",
		},
		availability: {
			start: "08:30",
			end: "18:30",
		},
	},
	{
		id: "6",
		location: {
			address: "90 Washington Road",
			city: "Princeton",
			state: "NJ",
			coordinates: {
				lat: 40.3467,
				lng: -74.6545,
			},
		},
		type: "Driveway",
		price: 3.75,
		owner: {
			name: "Lisa Johnson",
			photoUrl: "/api/placeholder/32/32",
		},
		availability: {
			start: "09:30",
			end: "21:00",
		},
	},
	{
		id: "7",
		location: {
			address: "42 Prospect Avenue",
			city: "Princeton",
			state: "NJ",
			coordinates: {
				lat: 40.3498,
				lng: -74.6512,
			},
		},
		type: "Street",
		price: 2.0,
		owner: {
			name: "Robert Taylor",
			photoUrl: "/api/placeholder/32/32",
		},
		availability: {
			start: "11:00",
			end: "23:00",
		},
	},
	{
		id: "8",
		location: {
			address: "75 Alexander Street",
			city: "Princeton",
			state: "NJ",
			coordinates: {
				lat: 40.3512,
				lng: -74.6589,
			},
		},
		type: "Garage",
		price: 5.5,
		owner: {
			name: "Amanda Miller",
			photoUrl: "/api/placeholder/32/32",
		},
		availability: {
			start: "07:30",
			end: "20:30",
		},
	},
	{
		id: "9",
		location: {
			address: "1001 Rose Bowl Drive",
			city: "Pasadena",
			state: "CA",
			coordinates: {
				lat: 34.1613,
				lng: -118.1676,
			},
		},
		type: "Driveway",
		price: 25.0, // Higher price due to venue proximity
		owner: {
			name: "Maria Rodriguez",
			photoUrl: "/api/placeholder/32/32",
		},
		availability: {
			start: "15:00",
			end: "23:00",
		},
	},
	{
		id: "10",
		location: {
			address: "100 W Walnut St",
			city: "Pasadena",
			state: "CA",
			coordinates: {
				lat: 34.1508,
				lng: -118.1553,
			},
		},
		type: "Garage",
		price: 20.0,
		owner: {
			name: "David Lee",
			photoUrl: "/api/placeholder/32/32",
		},
		availability: {
			start: "14:00",
			end: "23:00",
		},
	},

	// Madison Square Garden Area (NYC)
	{
		id: "11",
		location: {
			address: "401 7th Avenue",
			city: "New York",
			state: "NY",
			coordinates: {
				lat: 40.7505,
				lng: -73.9934,
			},
		},
		type: "Garage",
		price: 45.0,
		owner: {
			name: "James Wilson",
			photoUrl: "/api/placeholder/32/32",
		},
		availability: {
			start: "08:00",
			end: "23:00",
		},
	},
	{
		id: "12",
		location: {
			address: "252 West 31st Street",
			city: "New York",
			state: "NY",
			coordinates: {
				lat: 40.7497,
				lng: -73.9915,
			},
		},
		type: "Garage",
		price: 40.0,
		owner: {
			name: "Sarah Chen",
			photoUrl: "/api/placeholder/32/32",
		},
		availability: {
			start: "06:00",
			end: "22:00",
		},
	},

	// Staples Center/Crypto.com Arena (LA)
	{
		id: "13",
		location: {
			address: "1201 S Figueroa St",
			city: "Los Angeles",
			state: "CA",
			coordinates: {
				lat: 34.043,
				lng: -118.2673,
			},
		},
		type: "Garage",
		price: 35.0,
		owner: {
			name: "Michael Park",
			photoUrl: "/api/placeholder/32/32",
		},
		availability: {
			start: "16:00",
			end: "23:00",
		},
	},
	{
		id: "14",
		location: {
			address: "1111 S Flower St",
			city: "Los Angeles",
			state: "CA",
			coordinates: {
				lat: 34.0422,
				lng: -118.2645,
			},
		},
		type: "Driveway",
		price: 30.0,
		owner: {
			name: "Lisa Garcia",
			photoUrl: "/api/placeholder/32/32",
		},
		availability: {
			start: "17:00",
			end: "23:00",
		},
	},
];

// Popular venues data for quick search
export const POPULAR_VENUES = [
	{
		id: "v1",
		name: "Rose Bowl",
		address: "1001 Rose Bowl Dr",
		city: "Pasadena",
		state: "CA",
		coordinates: {
			lat: 34.1613,
			lng: -118.1676,
		},
	},
	{
		id: "v2",
		name: "Madison Square Garden",
		address: "4 Pennsylvania Plaza",
		city: "New York",
		state: "NY",
		coordinates: {
			lat: 40.7505,
			lng: -73.9934,
		},
	},
	{
		id: "v3",
		name: "Crypto.com Arena",
		address: "1111 S Figueroa St",
		city: "Los Angeles",
		state: "CA",
		coordinates: {
			lat: 34.043,
			lng: -118.2673,
		},
	},
	{
		id: "v4",
		name: "Princeton Stadium",
		address: "Princeton University",
		city: "Princeton",
		state: "NJ",
		coordinates: {
			lat: 40.3573,
			lng: -74.6672,
		},
	},
];

// Helper function to calculate distance between two coordinates
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
	const R = 6371; // Radius of the earth in km
	const dLat = deg2rad(lat2 - lat1);
	const dLon = deg2rad(lon2 - lon1);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) *
			Math.cos(deg2rad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = R * c; // Distance in km
	return d * 0.621371; // Convert to miles
};

const deg2rad = (deg) => {
	return deg * (Math.PI / 180);
};
