import React from 'react';
import './features.scss'; 

const FeaturesPage = () => {
  const features = [
    {
      title: "Budget-Friendly Options",
      description: "Plan your trip while staying within your budget, with customized suggestions tailored to your financial preferences.",
    },
    {
      title: "Personalized Itineraries",
      description: "Get itineraries based on your travel interests, preferred activities, and available time for a seamless experience.",
    }
  ];

  return (
    <div className="features-page">
      <h1>Explore Our Features</h1>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <button className="cta-button">Learn More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;
