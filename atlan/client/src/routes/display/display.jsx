import React from 'react';
import { FormProvider } from '../formContent/formContent';
import MultiStepForm from '../../components/multiform/multiform.component';

function Display() {
  return (
    <FormProvider>
      <div className="App">
        <MultiStepForm />
      </div>
    </FormProvider>
  );
}

export default Display;
