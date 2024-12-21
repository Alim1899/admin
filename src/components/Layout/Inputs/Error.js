import React from 'react'
import classes from './Cases.module.css'
const Error = (props) => {
  return (
    <div className={classes.error}>
    <div className={classes.errorText} >
      {props.children}
    </div>
    </div>
  )
}

export default Error