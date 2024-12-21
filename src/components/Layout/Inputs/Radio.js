import { React, Fragment } from "react";
import classes from "./Cases.module.css";
import { Field, ErrorMessage } from "formik";
import Error from './Error';
const Radio = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className={classes.formControl && classes.radio}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.optGroup}>
        <Field id={name} name={name} {...rest}>
          {({ field }) => {
            return options.map((option) => {
              return (
                <Fragment key={option.key}>
                  <input
                    type="radio"
                    {...field}
                    id={option.value}
                    value={option.value}
                    checked={field.value === option.value}
                  />
                  <option>{option.key}</option>
                </Fragment>
              );
            });
          }}
        </Field>
      </div>

      <ErrorMessage name={name} component={Error} />
    </div>
  );
};

export default Radio;