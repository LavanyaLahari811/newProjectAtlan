import React, { useState } from 'react';
import "./budget.styles.scss"

const Budget = ({ nextStep, handleDataChange }) => {
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (budget && duration && destination) {
      handleDataChange({ budget, duration, destination });
      nextStep();
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="budget-form">
      <label>
        Destination:
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        >
          <option value="">Select Destination</option>
          <option value="Agra">Agra</option>
          <option value="Delhi">Delhi</option>
          <option value="Hyderabad">Hyderabad</option> 
        </select>
      </label>
      <label>
        Budget:
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />
      </label>
      <label>
        Duration:
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </label>
      <button type="submit">Next</button>
    </form>
  );
};

export default Budget;
