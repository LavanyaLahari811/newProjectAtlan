import React, { createContext, useState } from 'react';


export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    budget: '',
    duration: '',
    interests: [],
    travelDates: '',
  });

  const updateFormData = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };
  

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );

};
