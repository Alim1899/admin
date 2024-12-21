import classes from "./Error.module.css";
const Error = () => {
  return (
    <div className={classes.main}>
      <div className={classes.content}>
      <div className={classes.errors}>
      <h1>დაფიქსირდა შეცდომა</h1>
        <button className={classes.button} type="button">
         <a href="/">დაბრუნება</a> 
        </button>
      </div>

      </div>
    </div>
  );
};

export default Error;
