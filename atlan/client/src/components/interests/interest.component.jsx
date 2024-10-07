import React, { useState } from 'react';
import "./interest.styles.scss"; 



const accommodationOptions = ['luxury','budget'];
const restaurantOptions = ['local','casual','fine dining'];
const transportationOptions = ['budget','convenience','adventure'];

const Interests = ({ nextStep, prevStep, handleDataChange }) => {
  const [interests, setInterests] = useState([]);

  const handleCheckboxChange = (interest) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDataChange({ interests });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="interests-form">
      <h2>Select Your Interests</h2>

      <h3>Activities</h3>
      {['sightseeing','culture','nature','food','shopping','photography','adventure','relaxation','wildlife'].map((interest) => (
        <label key={interest} className="interest-label">
          <input
            type="checkbox"
            checked={interests.includes(interest)}
            onChange={() => handleCheckboxChange(interest)}
          />
          {interest}
        </label>
      ))}

      <h3>Accommodations</h3>
      {accommodationOptions.map((interest) => (
        <label key={interest} className="interest-label">
          <input
            type="checkbox"
            checked={interests.includes(interest)}
            onChange={() => handleCheckboxChange(interest)}
          />
          {interest}
        </label>
      ))}

      <h3>Restaurants</h3>
      {restaurantOptions.map((interest) => (
        <label key={interest} className="interest-label">
          <input
            type="checkbox"
            checked={interests.includes(interest)}
            onChange={() => handleCheckboxChange(interest)}
          />
          {interest}
        </label>
      ))}

      <h3>Transportation</h3>
      {transportationOptions.map((interest) => (
        <label key={interest} className="interest-label">
          <input
            type="checkbox"
            checked={interests.includes(interest)}
            onChange={() => handleCheckboxChange(interest)}
          />
          {interest}
        </label>
      ))}

      <div className="button-group">
        <button type="button" className="back-button" onClick={prevStep}>Back</button>
        <button type="submit" className="next-button">Next</button>
      </div>
    </form>
  );
};

export default Interests;
