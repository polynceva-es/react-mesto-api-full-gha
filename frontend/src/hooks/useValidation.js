import React from "react";

function useValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isFormValid, setIsFormValid] = React.useState(false);
  
  // function searchIsFormValid(values, errors){
  //   const valuesKeys = Object.keys(values).sort();
  //   const errorsKeys = Object.keys(errors).sort();
  //   const errorsValues = Object.values(errors);
  //   let res = false;
  //   let res1 = true;
  //     for (let i = 0; i<errorsValues.length; i++) {
  //       if(errorsValues[i] !== '') {
  //         res1 = false;
  //         break;
  //       }
  //     }
  //   let res2;
  //   let count = 0;
  //     if(valuesKeys.length !== errorsKeys.length) {
  //       res2 = false;
  //     } else {
  //       for(let i=0; i<valuesKeys.length; i++) {
  //         if(valuesKeys[i] === errorsKeys[i]) {
  //           count = count + 1;
  //         }
  //       }
  //       if(count === valuesKeys.length) {
  //         res2 = true;
  //       } else {
  //         res2 = false;
  //       }
  //     }
  //   if (res1 && res2) {
  //     res = true;
  //   }
  //   return res;
  // }

  function onChange(evt) {
    const errorMessage = evt.target.validationMessage;
    const { name, value } = evt.target;
    const newValues = {...values, [name]: value};
    const newErrors = {...errors, [name]: errorMessage};
    // const formValid = searchIsFormValid(newValues, newErrors);
    const formValid = evt.target.closest('form').checkValidity();
    setIsFormValid(formValid); 
    setValues(newValues);
    setErrors(newErrors);
  }

  function resetValidation(values = {}, errors = {}) {
    setValues(values);
    setErrors(errors);
  }

  return {
    values,
    errors,
    onChange,
    resetValidation,
    isFormValid,
    setIsFormValid
  };
}

export default useValidation;
