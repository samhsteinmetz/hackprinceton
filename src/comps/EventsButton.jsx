import  React from 'react';
import { useNavigate } from 'react-router-dom';

const EventsButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/eventsdashboard');
    };

    return (
        <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            View Events
        </button>
    );

}

export default EventsButton;
