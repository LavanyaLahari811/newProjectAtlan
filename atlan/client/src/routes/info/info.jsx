import React, { useState } from "react";
import "./info.scss";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

const Info = () => {
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activities, setActivities] = useState([
    { name: "", date: "", location: "", description: "" },
  ]);
  const [accommodation, setAccommodation] = useState({
    name: "",
    address: "",
    checkIn: "",
    checkOut: "",
  });
  const [transportation, setTransportation] = useState({
    mode: "",
    details: "",
  });

  const handleActivityChange = (index, e) => {
    const updatedActivities = [...activities];
    updatedActivities[index][e.target.name] = e.target.value;
    setActivities(updatedActivities);
  };

  const addActivity = () => {
    setActivities([
      ...activities,
      { name: "", date: "", location: "", description: "" },
    ]);
  };

  const deleteActivity = (index) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
  };

  const id = localStorage.getItem("userId");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const itineraryData = {
      user_id: id,
      trip_name: tripName,
      destination,
      start_date: startDate,
      end_date: endDate,
      activities,
      accommodation,
      transportation,
    };

    console.log(
      "Sending data to:",
      "http://localhost:3000/main/info",
      itineraryData
    );

    try {
      const response = await axios.post(
        "http://localhost:3000/main/info",
        itineraryData
      );
      console.log(response.data);
      alert("Itinerary stored successfully!");

      
      setTripName("");
      setDestination("");
      setStartDate("");
      setEndDate("");
      setActivities([{ name: "", date: "", location: "", description: "" }]);
      setAccommodation({ name: "", address: "", checkIn: "", checkOut: "" });
      setTransportation({ mode: "", details: "" });
    } catch (error) {
      console.error("Error during Axios call:", error);
      alert("Failed to store itinerary. Please try again.");
    }
  };

  return (
    <form className="itinerary-form" onSubmit={handleSubmit}>
      <h2>Create Your Travel Itinerary</h2>

      <div className="input-group">
        <label>Trip Name:</label>
        <input
          type="text"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>Destination:</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>

      <h3>Activities</h3>
      {activities.map((activity, index) => (
        <div key={index} className="activity">
          <div className="activity-details">
            <label>Activity Name:</label>
            <input
              type="text"
              name="name"
              value={activity.name}
              onChange={(e) => handleActivityChange(index, e)}
              required
            />
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={activity.date}
              onChange={(e) => handleActivityChange(index, e)}
              required
            />
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={activity.location}
              onChange={(e) => handleActivityChange(index, e)}
              required
            />
            <label>Description:</label>
            <textarea
              name="description"
              value={activity.description}
              onChange={(e) => handleActivityChange(index, e)}
              required
            />
          </div>
          <button
            type="button"
            className="delete-button"
            onClick={() => deleteActivity(index)}
          >
            <FaTrash />
          </button>
        </div>
      ))}
      <button type="button" onClick={addActivity}>
        Add Another Activity
      </button>

      <h3>Accommodation</h3>
      <div className="input-group">
        <label>Name:</label>
        <input
          type="text"
          value={accommodation.name}
          onChange={(e) =>
            setAccommodation({ ...accommodation, name: e.target.value })
          }
          required
        />
      </div>
      <div className="input-group">
        <label>Address:</label>
        <input
          type="text"
          value={accommodation.address}
          onChange={(e) =>
            setAccommodation({ ...accommodation, address: e.target.value })
          }
          required
        />
      </div>
      <div className="input-group">
        <label>Check-In Date:</label>
        <input
          type="date"
          value={accommodation.checkIn}
          onChange={(e) =>
            setAccommodation({ ...accommodation, checkIn: e.target.value })
          }
          required
        />
      </div>
      <div className="input-group">
        <label>Check-Out Date:</label>
        <input
          type="date"
          value={accommodation.checkOut}
          onChange={(e) =>
            setAccommodation({ ...accommodation, checkOut: e.target.value })
          }
          required
        />
      </div>

      <h3>Transportation</h3>
      <div className="input-group">
        <label>Mode of Transportation:</label>
        <input
          type="text"
          value={transportation.mode}
          onChange={(e) =>
            setTransportation({ ...transportation, mode: e.target.value })
          }
          required
        />
      </div>
      <div className="input-group">
        <label>Transportation Details:</label>
        <textarea
          value={transportation.details}
          onChange={(e) =>
            setTransportation({ ...transportation, details: e.target.value })
          }
          required
        />
      </div>

      <button type="submit">Submit Itinerary</button>
    </form>
  );
};

export default Info;
