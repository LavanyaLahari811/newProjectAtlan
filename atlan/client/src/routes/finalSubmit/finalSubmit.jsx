import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import jsPDF from "jspdf";
import { useLocation, useNavigate } from "react-router-dom";
import "./finalSubmit.scss";

const FinalSubmit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;

  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateItinerary = async () => {
      if (formData) {
        try {
          const response = await axios.post(
            "https://backend-atlan.onrender.com/main/generate",
            formData
          );
          setItinerary(response.data.itinerary);
        } catch (error) {
          console.error("Error generating itinerary:", error);
          setError(error.response?.data.message || "An error occurred");
        }
      }
    };
    generateItinerary();
  }, [formData]);

  useEffect(() => {
    Chart.register(...registerables);
  }, []);

  const handleShare = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Your Personalized Itinerary", 10, 10);

    if (itinerary) {
      let yOffset = 20;

      itinerary.dailyItinerary.forEach((day) => {
        doc.setFontSize(14);
        doc.text(`Day ${day.day}:`, 10, yOffset);
        yOffset += 10;

        doc.setFontSize(12);
        doc.text("Activities:", 10, yOffset);
        yOffset += 10;
        day.activities.forEach((activity, index) => {
          doc.text(`${index + 1}. ${activity.name}`, 20, yOffset);
          yOffset += 10;
        });

        yOffset += 10;
      });

      doc.setFontSize(12);
      doc.text("Accommodation:", 10, yOffset);
      yOffset += 10;
      itinerary.accommodations.forEach((acc, index) => {
        doc.text(
          `${index + 1}. ${acc.name} - Cost: ${acc.cost} Rs`,
          20,
          yOffset
        );
        yOffset += 10;
      });

      doc.text("Restaurants:", 10, yOffset);
      yOffset += 10;
      itinerary.restaurants.forEach((restaurant, index) => {
        doc.text(
          `${index + 1}. ${restaurant.name} - Cost: ${restaurant.cost} Rs`,
          20,
          yOffset
        );
        yOffset += 10;
      });

      doc.text("Transportation:", 10, yOffset);
      yOffset += 10;
      itinerary.transportation.forEach((transport, index) => {
        doc.text(
          `${index + 1}. ${transport.type} - Cost: ${transport.cost} Rs`,
          20,
          yOffset
        );
        yOffset += 10;
      });
    }

    doc.save("itinerary.pdf");
  };

  const budgetData = {
    labels: ["Accommodation", "Activities", "Transportation", "Food"],
    datasets: [
      {
        data: [
          itinerary?.accommodations.reduce(
            (total, acc) => total + acc.cost,
            0
          ) || 0,
          itinerary?.dailyItinerary.reduce(
            (total, day) =>
              total +
              day.activities.reduce(
                (dayTotal, activity) => dayTotal + activity.cost,
                0
              ),
            0
          ) || 0,
          itinerary?.transportation.reduce(
            (total, transport) => total + transport.cost,
            0
          ) || 0,
          itinerary?.restaurants.reduce(
            (total, restaurant) => total + restaurant.cost,
            0
          ) || 0,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const handleSaveItinerary = async () => {
    if (itinerary) {
      const userId = localStorage.getItem("userId");

      const dataToSend = {
        userId: userId,
        destination: itinerary.destination,
        accommodations: itinerary.accommodations,
        restaurants: itinerary.restaurants,
        transportation: itinerary.transportation,
        activities: itinerary.dailyItinerary.flatMap((day) => day.activities),
      };

      console.log(dataToSend); 

      try {
        const response = await axios.post(
          "https://backend-atlan.onrender.com/main/itineraries",
          dataToSend
        );
        alert("Itinerary saved successfully!");
      } catch (error) {
        console.error("Error saving itinerary:", error);
        setError("Failed to save itinerary.");
      }
    }
  };

  return (
    <div className="final-submit-container">
      <h2>Your Personalized Travel Itinerary</h2>
      {error && <p className="error-message">{error}</p>}
      {itinerary ? (
        <div className="itinerary-content">
          <div className="small-chart-container">
            <Pie data={budgetData} />
          </div>
          <button className="download-button" onClick={handleShare}>
            Download Itinerary
          </button>
          <button className="save-button" onClick={handleSaveItinerary}>
            Save Itinerary
          </button>
          <h3>Itinerary Details</h3>
          <div className="itinerary-details">
            {itinerary.dailyItinerary.map((day) => (
              <div key={day.day} className="day-section">
                <h4>Day {day.day}</h4>
                <h5>Activities:</h5>
                <ul>
                  {day.activities.length > 0 ? (
                    day.activities.map((activity, index) => (
                      <li key={index}>
                        {activity.name || "Activity name not defined"}
                      </li>
                    ))
                  ) : (
                    <li>No activities available</li>
                  )}
                </ul>
              </div>
            ))}
            <h5>Accommodation:</h5>
            <ul>
              {itinerary.accommodations.map((acc) => (
                <li key={acc.name}>
                  {acc.name} - Cost: Rs.{acc.cost}
                </li>
              ))}
            </ul>
            <h5>Restaurants:</h5>
            <ul>
              {itinerary.restaurants.map((restaurant) => (
                <li key={restaurant.name}>
                  {restaurant.name} - Cost: Rs.{restaurant.cost}
                </li>
              ))}
            </ul>
            <h5>Transportation:</h5>
            <ul>
              {itinerary.transportation.map((transport) => (
                <li key={transport.type}>
                  {transport.type} - Cost: Rs.{transport.cost}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading itinerary...</p>
      )}
    </div>
  );
};

export default FinalSubmit;
