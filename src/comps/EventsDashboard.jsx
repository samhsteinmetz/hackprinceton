import React, { useEffect, useState } from 'react';

const EventsDashboard = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEvents = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=f5XcCiYokCCs3tC8VYf4qm9SkjkA4gQ8`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setEvents(data._embedded ? data._embedded.events : []);
        } catch (err) {
            setError(`Failed to fetch events: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    if (loading) return <p>Loading events...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Upcoming Events</h1>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <h2>{event.name}</h2>
                        <p>Date: {event.dates.start.localDate}</p>
                        <p>Venue: {event._embedded.venues[0].name}</p>
                        <p>Location: {event._embedded.venues[0].city.name}, {event._embedded.venues[0].country.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventsDashboard;
