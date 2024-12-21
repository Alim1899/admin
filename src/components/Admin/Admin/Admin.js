import React from "react";
import classes from "./Admin.module.css";
import plus from "../../../assets/AdminIcons/add.svg";
import list from "../../../assets/AdminIcons/edit.svg";

const Admin = () => {
  return (
    <div className={classes.main}>
      <a href="newProject" className={classes.header}>
        <img className={classes.icon} src={plus} alt="add"></img>
        <h3 className={classes.head}> ახალი პროექტი</h3>
      </a>
      <a href="projectList" className={classes.header}>
        <img className={classes.icon} src={list} alt="show"></img>
        <h3 className={classes.head}>წაშლა - ცვლილება</h3>
      </a>
   
    </div>
  );
};

export default Admin;
