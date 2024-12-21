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
      <div className={classes.photos}>
        {allImages.length === 0 && (
          <div className={classes.uploadedImages}>
            <h6>ფოტოების ატვირთვა აუცილებელია</h6>
          </div>
        )}
        <div className={classes.header}>
          <div className={classes.photoInput}>
            <label htmlFor="image" className={classes.imageLabel}>
              <img src={upload} alt="upload"></img>
              <h6>ატვირთვა</h6>
              <input
                id="image"
                onChange={(e) => {
                  projectImageUploader(e, dispatch);
                }}
                className={classes.imageUpload}
                type="file"
                multiple
              />{" "}
            </label>
          </div>
        </div>

        {allImages.length > 0 &&
          allImages.map((el) => (
            <div
              key={el[0]}
              id={el[0]}
              className={classes.photo}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <img src={el[1].url} alt={el[0]} className={classes.imagePrev} />

              <img
                className={`${classes.none} ${classes.bin}`}
                onClick={(e) => removeProjectImage(e, allImages, dispatch)}
                src={recycle}
                alt="bin"
                id={el[0]}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProjectPreview;
