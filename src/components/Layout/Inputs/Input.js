import React from "react";
import classes from "./Cases.module.css";
import { Field, ErrorMessage } from "formik";
import Error from "./Error";
const Input = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div className={classes.formControl}>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} />
      <div className={classes.errorinput}>
        {" "}
        <ErrorMessage name={name} component={Error} />
      </div>
    </div>
  );
};

export default Input;