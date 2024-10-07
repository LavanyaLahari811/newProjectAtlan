import React, { useState, useRef, useEffect } from "react";
import Budget from "../budget/budget.component";
import Dates from "../dates/dates.component";
import Interests from "../interests/interest.component";
import { useNavigate } from "react-router-dom";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    budget: 0,
    destination: "",
    travelDates: [],
    interests: [],
    duration: "",
  });

  const travelDatesRef = useRef([]);

  const navigate = useNavigate();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleDataChange = (newData) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData, ...newData };
      console.log("Updated form data:", updatedData);
      return updatedData;
    });
  };

  const handleTravelDatesChange = (dates) => {
    travelDatesRef.current = dates;
    handleDataChange({ travelDates: dates });
  };

  const handleFinalSubmit = () => {
    const finalFormData = { ...formData, travelDates: travelDatesRef.current };
    console.log("Final form data before submission:", finalFormData);
    navigate("/final-submit", { state: { formData: finalFormData } });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Budget nextStep={nextStep} handleDataChange={handleDataChange} />
        );
      case 2:
        return (
          <Interests
            nextStep={nextStep}
            prevStep={prevStep}
            handleDataChange={handleDataChange}
          />
        );
      case 3:
        return (
          <Dates
            nextStep={handleFinalSubmit}
            prevStep={prevStep}
            handleTravelDatesChange={handleTravelDatesChange}
          />
        );
      default:
        return (
          <Budget nextStep={nextStep} handleDataChange={handleDataChange} />
        );
    }
  };

  return (
    <div>
      <h1>Travel Itinerary Form</h1>
      {renderStep()}
    </div>
  );
};

export default MultiStepForm;
