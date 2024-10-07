import React from "react";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("userId");
    if (userToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleNavigation = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate("/auth");
    }
  };
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Plan Your Perfect Trip</h1>
        <p>
          Personalized itineraries tailored to your budget, interests, and
          schedule.
        </p>
        <div className="btns">
          <button
            className="cta-button"
            onClick={() => handleNavigation("/display")}
          >
            Tell us your interests
          </button>
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature">
            <h3>Personalized Trips</h3>
            <p>Tailored itineraries based on your preferences and interests.</p>
          </div>
          <div className="feature">
            <h3>Budget-Friendly</h3>
            <p>Stay within your budget with cost-effective trip plans.</p>
          </div>
          <div className="feature">
            <h3>Explore Destinations</h3>
            <p>Discover new places with curated activity suggestions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
