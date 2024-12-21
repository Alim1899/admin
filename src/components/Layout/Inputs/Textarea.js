import React from 'react'
import classes from './Cases.module.css'
import {Field, ErrorMessage} from 'formik';
import Error from './Error';
const Textarea = (props) => {
    const {label, name, ...rest} = props;
  return (
    <div className={classes.formControl}>
    <label htmlFor={name}>{label}</label>
    <Field as='textarea' id={name}  name={name} {...rest}/>
    <ErrorMessage name={name} component={Error}/>
    </div>
  )
}

export default Textarea