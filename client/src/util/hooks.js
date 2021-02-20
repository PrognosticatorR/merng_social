import { useState } from "react";

export const useForm = (cb, initialState = {}) => {
   const [values, setValues] = useState(initialState);

   function onChange(e) {
      setValues({ ...values, [e.target.name]: e.target.value });
   }
   function onSubmit(e) {
      e.preventDefault();
      cb();
   }
   return {
      onChange,
      onSubmit,
      values,
   };
};
