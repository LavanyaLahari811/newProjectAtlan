import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./dashboard.scss";

const Dashboard = () => {
  const [itineraries, setItineraries] = useState([]);
  const [expandedItineraryId, setExpandedItineraryId] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.get(`https://backend-atlan.onrender.com/main/itineraries/${userId}`);
        setItineraries(response.data);
      } catch (error) {
        console.error('Error fetching itineraries:', error);
      }
    };

    fetchItineraries();
  }, [userId]);

  const toggleExpandItinerary = (id) => {
    setExpandedItineraryId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className="dashboard">
      <h2>Your Itineraries</h2>
      {itineraries.length > 0 ? (
        itineraries.map((itinerary) => (
          <div key={itinerary._id} className="itinerary-card">
            <div className="itinerary-header">
              <h3>{itinerary.destination}</h3>
              <button className="view-more-button" onClick={() => toggleExpandItinerary(itinerary._id)}>
                {expandedItineraryId === itinerary._id ? 'View Less' : 'View More'}
              </button>
            </div>
            {expandedItineraryId === itinerary._id && (
              <div>
                <h4>Activities:</h4>
                <ul>
                  {itinerary.activities.map((activity, index) => (
                    <li key={index}>{activity.name} - Cost: {activity.cost} Rs</li>
                  ))}
                </ul>
                <h4>Accommodations:</h4>
                <ul>
                  {itinerary.accommodations.map((acc, index) => (
                    <li key={index}>{acc.name} - Cost: {acc.cost} Rs</li>
                  ))}
                </ul>
                <h4>Restaurants:</h4>
                <ul>
                  {itinerary.restaurants.map((restaurant, index) => (
                    <li key={index}>{restaurant.name} - Cost: {restaurant.cost} Rs</li>
                  ))}
                </ul>
                <h4>Transportation:</h4>
                <ul>
                  {itinerary.transportation.map((transport, index) => (
                    <li key={index}>{transport.type} - Cost: {transport.cost} Rs</li>
                  ))}
                </ul>
                <hr />
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No itineraries found.</p>
      )}
    </div>
  );
};

export default Dashboard;
