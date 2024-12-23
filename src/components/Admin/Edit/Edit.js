import { useParams } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";
import {
  getData,
  handleFieldChange,
  saveEditedProject,
  imageUploadHandler,
  deleteImage,
  deleteProjectImageEdit,
  deleteAllData,
  handleMouseOver,
  handleMouseOut,
} from "../Functions";
import Input from "../Input";
import classes from "./Edit.module.css";
import point from "../../../assets/icons/marker.png";
import Leaflet from "../../Map/Leaflet";
import add from "../../../assets/AdminIcons/add_black.svg";
import admin from "../../../assets/AdminIcons/list.svg";
import office from "../../../assets/icons/office.png";
import { years, months } from "../NewProject/DatePicker";
import recycle from "../../../assets/icons/delete.png";
import upload from "../../../assets/AdminIcons/upload.svg";
import { initialState, reducer } from "./Reducer";

const Edit = () => {
  const position = [42.259061, 43.00614];
  const marker = [42.259061, 42.66614];
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { dataArrived, projectDetails } = state;
  const [newImages, setnewImages] = useState([]);
  const [coords, setCoords] = useState("");
  const [savedSucces, setSavedSucces] = useState(false);
  const {
    geHeader,
    enHeader,
    selectedMonth,
    geLocation,
    enLocation,
    flyTo,
    enDescription,
    geDescription,
    allImages,
    year,
  } = projectDetails;
  useEffect(() => {
    if (!dataArrived) {
      getData(id, dispatch);
    } else {
      setCoords(flyTo);
    }
  }, [state, dataArrived, id, setCoords, flyTo]);

  useEffect(() => {
    deleteAllData();
  }, []);
  if (!dataArrived) {
    return (
      <div className={classes.animation}>
        <h2>იტვირთება...</h2>
        <div className={classes.loader}></div>
      </div>
    );
  }

  return (
    <div className={classes.main}>
      <div className={classes.headers}>
        <a className={classes.link} href="/newProject">
          <img className={classes.iconl} src={add} alt="addproject" />
          დამატება
        </a>
        <a className={classes.link} href="/projectList">
          <img className={classes.iconl} src={admin} alt="projectList" />
          პროექტები
        </a>
      </div>

      {dataArrived && (
        <div className={classes.content}>
          <div className={classes.form}>
            <div className={classes.formWrapper}>
              <div className={classes.wrap}>
                <div className={classes.name}>
                  <Input
                    className={classes.input}
                    type="input"
                    header="სახელი GE"
                    label="geHeader"
                    id="geHeader"
                    value={geHeader}
                    onChange={(e) => {
                      handleFieldChange(dispatch, "geHeader", e.target.value);
                    }}
                  />
                  <Input
                    className={classes.input}
                    type="input"
                    header="სახელი EN"
                    label="enHeader"
                    id="enHeader"
                    value={enHeader}
                    onChange={(e) => {
                      handleFieldChange(dispatch, "enHeader", e.target.value);
                    }}
                  />
                  <div className={classes.datePicker}>
                    <label htmlFor="month" className={classes.label}>
                      თვე
                      <select
                        className={classes.select}
                        name="month"
                        value={selectedMonth.ge}
                        onChange={(e) => {
                          handleFieldChange(dispatch, "selectedMonth", {
                            ge: e.target.value,
                            en: e.target.options[e.target.selectedIndex].id,
                          });
                        }}
                      >
                        {months.map((el) => {
                          return (
                            el.value && (
                              <option
                                key={el.key}
                                id={el.enValue}
                                disabled={!el.value}
                              >
                                {el.value}
                              </option>
                            )
                          );
                        })}
                      </select>
                    </label>

                    <label htmlFor="year" className={classes.label}>
                      წელი
                      <select
                        name="year"
                        className={classes.select}
                        onChange={(e) => {
                          handleFieldChange(dispatch, "year", e.target.value);
                        }}
                      >
                        {years.map((el) => {
                          return (
                            el.value && <option key={el.key}>{el.value}</option>
                          );
                        })}
                      </select>
                    </label>
                  </div>
                </div>
                <div className={classes.location}>
                  <Input
                    className={classes.input}
                    type="input"
                    header="კოორდინატები"
                    label="flyTo"
                    id="flyTo"
                    value={coords}
                    onBlur={(e) => {
                      const value = e.target.value.trim();
                      const pattern = /^(-?\d+(\.\d+)?),(-?\d+(\.\d+)?)$/;
                      if (pattern.test(value)) {
                        const coords = value
                          .split(",")
                          .map((coord) => coord.trim());
                        dispatch({ type: "updateCoords", payload: coords });
                      } else {
                        dispatch({ type: "updateCoords", payload: "" });
                      }
                    }}
                    onChange={(e) => setCoords(e.target.value)}
                  />

                  <Input
                    className={classes.input}
                    type="input"
                    header="ლოკაცია GE"
                    label="geLocation"
                    id="geLocation"
                    value={geLocation}
                    onChange={(e) => {
                      handleFieldChange(dispatch, "geLocation", e.target.value);
                    }}
                  />
                  <Input
                    className={classes.input}
                    type="input"
                    header="ლოკაცია EN"
                    label="enLocation"
                    id="enLocation"
                    value={enLocation}
                    onChange={(e) => {
                      handleFieldChange(dispatch, "enLocation", e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className={classes.description}>
                <Input
                  className={classes.textarea}
                  type="textarea"
                  header="აღწერა GE"
                  label="geDescription"
                  id="geDescription"
                  value={geDescription}
                  onChange={(e) => {
                    handleFieldChange(
                      dispatch,
                      "geDescription",
                      e.target.value
                    );
                  }}
                />
                <Input
                  className={classes.textarea}
                  type="textarea"
                  header="აღწერა EN"
                  label="enDescription"
                  id="enDescription"
                  value={enDescription}
                  onChange={(e) => {
                    handleFieldChange(
                      dispatch,
                      "enDescription",
                      e.target.value
                    );
                  }}
                />
              </div>
            </div>
            <div className={classes.map}>
              <Leaflet
                center={position}
                zoom={7}
                marker={marker}
                iconUrl={point}
                popup="ოფისი"
                office={office}
                flyTo={flyTo}
              />
            </div>

            <div className={classes.photos}>
              <div className={classes.newImages}>
                <h2 className={classes.photoHeader}>ახალი ფოტოები</h2>
                <div className={classes.uploadNew}>
                  <div className={classes.uploadBtn}>
                    <label htmlFor="image" className={classes.imageLabel}>
                      <img
                        src={upload}
                        alt="newImage"
                        className={classes.icon}
                      ></img>{" "}
                      ატვირთვა
                    </label>
                    <input
                      id="image"
                      onChange={(e) => imageUploadHandler(e, setnewImages)}
                      className={classes.imageUpload}
                      type="file"
                      multiple
                    ></input>
                  </div>
                  {newImages.length > 0 &&
                    newImages.map((el) => (
                      <div
                        key={el[0]}
                        className={classes.photo}
                        onMouseOver={(e) => handleMouseOver(e, classes)}
                        onMouseOut={(e) => handleMouseOut(e, classes)}
                      >
                        <img
                          src={el[1].url}
                          alt={el[0]}
                          className={classes.imagePrev}
                        />

                        <img
                          className={`${classes.none} ${classes.bin}`}
                          src={recycle}
                          alt={el[0]}
                          onClick={(e) => {
                            deleteImage(e, el[0], setnewImages);
                          }}
                        />
                      </div>
                    ))}
                </div>
              </div>

              <div className={classes.oldImages}>
                <h2 className={classes.photoHeader}>არსებული ფოტოები</h2>
                <div className={classes.photoList}>
                  {allImages.length > 0 &&
                    allImages.map((el) => (
                      <div
                        key={el[0]}
                        className={classes.photo}
                        onMouseOver={(e) => handleMouseOver(e, classes)}
                        onMouseOut={(e) => handleMouseOut(e, classes)}
                      >
                        <img
                          src={el[1].url}
                          alt={el[0]}
                          key={el[1].key}
                          className={classes.imagePrev}
                        />

                        <img
                          className={`${classes.none} ${classes.bin}`}
                          src={recycle}
                          key={el[0]}
                          alt={el[0]}
                          onClick={(e) =>
                            deleteProjectImageEdit(
                              e,
                              id,
                              el[0],
                              allImages,
                              dispatch
                            )
                          }
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            onClick={(e) => {
              saveEditedProject(
                e,
                id,
                geHeader,
                enHeader,
                selectedMonth,
                year,
                coords,
                geLocation,
                enLocation,
                geDescription,
                enDescription,
                allImages,
                newImages,
                setSavedSucces
              );
            }}
            className={classes.submit}
          >
            შენახვა
          </button>
        </div>
      )}
      {savedSucces && (
        <div className={classes.succes}>
          <h2>პროექტი შენახულია✅</h2>
        </div>
      )}
    </div>
  );
};

export default Edit;
