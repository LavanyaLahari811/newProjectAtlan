import React, { useState } from 'react';
import "./dates.styles.scss"; 

const Dates = ({ prevStep, nextStep, handleTravelDatesChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (startDate && endDate) {
      const travelDates = [startDate, endDate];
      console.log("Travel dates to be submitted:", travelDates);
      handleTravelDatesChange(travelDates);
      nextStep();
    } else {
      alert("Please select both start and end dates.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="dates-form"> 
      <h2>Select Your Travel Dates</h2>
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>
      <div className="button-group">
        <button type="button" className="back-button" onClick={prevStep}>Back</button>
        <button type="submit" className="next-button">Next</button>
      </div>
    </form>
  );
};

export default Dates;
