import React, { useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import ka from "date-fns/locale/ka";
import { format } from "date-fns";
import classes from "./Cases.module.css";
import { Field, ErrorMessage } from "formik";
import Error from "./Error";
registerLocale("ka", ka);
const DateComponent = (props) => {
  const dateRef = useRef();
  const { label, name, ...rest } = props;

  return (
    <div className={classes.formControl}>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DatePicker
              id={name}
              {...field}
              {...rest}
              ref={dateRef}
              name="date"
              selected={value}
              locale="ka"
              dateFormat="dd/MM/yyyy"
              placeholderText="აირჩიე თარიღი"
              onChange={(val) =>
                setFieldValue(name, format(val, "dd/MM/yyyy", { locale: ka }))
              }
              showYearDropdown
              yearDropdownItemNumber={15}
              scrollableYearDropdown
             
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={Error} />
    </div>
  );
};

export default DateComponent;
