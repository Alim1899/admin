import React, { useEffect } from "react";
import classes from "./Preview.module.css";
import recycle from "../../../assets/icons/delete.png";
import { removeProjectImage, deleteAllData } from "../Functions";
import upload from "../../../assets/AdminIcons/upload.svg";
import { projectImageUploader } from "../Functions";

const ProjectPreview = ({ allImages, dispatch }) => {
  const handleMouseOver = (e) => {
    const element = e.currentTarget.childNodes[1];
    element.classList.add(classes.bindiv);
    element.classList.remove(classes.none);
  };

  useEffect(() => {
    deleteAllData();
  }, []);
  const handleMouseOut = (e) => {
    const element = e.currentTarget.childNodes[1];
    element.classList.remove(classes.bindiv);
    element.classList.add(classes.none);
  };
  return (
    <div className={classes.preview}>
      <h6 className={classes.header}>ფოტოების ატვირთვა აუცილებელია</h6>

      <div className={classes.uploadNew}>
        <div className={classes.uploadBtn}>
          <label htmlFor="image" className={classes.imageLabel}>
            <img src={upload} alt="newImage" className={classes.icon}></img>{" "}
            ატვირთვა
          </label>
          <input
            id="image"
            onChange={(e) => projectImageUploader(e, dispatch)}
            className={classes.imageUpload}
            type="file"
            multiple
          ></input>
        </div>
        {allImages.length > 0 &&
          allImages.map((el) => (
            <div
              key={el[0]}
              className={classes.photo}
              onMouseOver={(e) => handleMouseOver(e, classes)}
              onMouseOut={(e) => handleMouseOut(e, classes)}
            >
              <img src={el[1].url} alt={el[0]} className={classes.imagePrev} />

              <img
                className={`${classes.none} ${classes.bin}`}
                src={recycle}
                alt={el[0]}
                onClick={(e) => removeProjectImage(e, allImages, dispatch)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProjectPreview;
