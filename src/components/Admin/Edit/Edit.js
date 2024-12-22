import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";
import {
  getData,
  handleLocation,
  edit,
  imageUploadHandler,
  deleteImage,
  deleteProjectImage,
  getImages,
  deleteAllData,
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
  const [project, setProject] = useState([{}]);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [savedSucces, setSavedSucces] = useState(false);
  const { id } = useParams();

  let navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { dataArrived, projectDetails } = state;
  const [newImages, setnewImages] = useState([]);
  const [coords, setCoords] = useState("");
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
  } = projectDetails;

  useEffect(() => {
    if (!dataArrived) {
      getData(id, dispatch);
    } else {
      setCoords(flyTo);
    }
  }, [state, dataArrived, id, setCoords, flyTo]);
  const handleMouseOver = (e) => {
    const element = e.currentTarget.childNodes[1];
    element.classList.add(classes.bindiv);
    element.classList.remove(classes.none);
  };

  const handleMouseOut = (e) => {
    const element = e.currentTarget.childNodes[1];
    element.classList.remove(classes.bindiv);
    element.classList.add(classes.none);
  };

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
                  type="input"
                  header="სახელი GE"
                  label="geHeader"
                  id="geHeader"
                  value={geHeader}
                  onChange={(e) => {
                    dispatch({
                      type: "updateField",
                      field: "geHeader",
                      payload: e.target.value,
                    });
                  }}
                />
                <Input
                  type="input"
                  header="სახელი EN"
                  label="enHeader"
                  id="enHeader"
                  value={enHeader}
                  onChange={(e) => {
                    dispatch({
                      type: "updateField",
                      field: "enHeader",
                      payload: e.target.value,
                    });
                  }}
                />
                <div className={classes.datePicker}>
                  <label htmlFor="month" className={classes.label}>
                    თვე
                    <select
                      name="month"
                      value={selectedMonth.ge}
                      onChange={(e) => {
                        dispatch({
                          type: "updateField",
                          field: "selectedMonth",
                          payload: {
                            ge: e.target.value,
                            en: e.target.options[e.target.selectedIndex].id,
                          },
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
                      onChange={(e) => {
                        dispatch({
                          type: "updateField",
                          field: "year",
                          payload: e.target.value,
                        });
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
                  type="input"
                  header="კოორდინატები"
                  label="flyTo"
                  id="flyTo"
                  value={coords}
                  onBlur={(e) => {
                    const value = e.target.value
                      .replace(/[^0-9.,]/g, "")
                      .split(",")
                      .filter((coord) => coord);
                    console.log(value.length === 2);
                    if (value.length === 2)
                      dispatch({ type: "updateCoords", payload: value });
                    else dispatch({ type: "updateCoords", payload: "" });
                  }}
                  onChange={(e) => setCoords(e.target.value)}
                />

                <Input
                  type="input"
                  header="ლოკაცია GE"
                  label="geLocation"
                  id="geLocation"
                  value={geLocation}
                  onChange={(e) => {
                    dispatch({
                      type: "updateField",
                      field: "geLocation",
                      payload: e.target.value,
                    });
                  }}
                />
                <Input
                  type="input"
                  header="ლოკაცია EN"
                  label="enLocation"
                  id="enLocation"
                  value={enLocation}
                  onChange={(e) => {
                    dispatch({
                      type: "updateField",
                      field: "enLocation",
                      payload: e.target.value,
                    });
                  }}
                />
</div>
              
               
                
              </div>
              <div className={classes.description}>
                <Input
                  type="textarea"
                  header="აღწერა GE"
                  label="geDescription"
                  id="geDescription"
                  value={geDescription}
                  onChange={(e) => {
                    dispatch({
                      type: "updateField",
                      field: "geDescription",
                      payload: e.target.value,
                    });
                  }}
                />
                <Input
                  type="textarea"
                  header="აღწერა EN"
                  label="enDescription"
                  id="enDescription"
                  value={enDescription}
                  onChange={(e) => {
                    dispatch({
                      type: "updateField",
                      field: "enDescription",
                      payload: e.target.value,
                    });
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
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
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
                          deleteImage(e, el[0], setnewImages, newImages);
                        }}
                      />
                    </div>
                  ))}
              </div>
              <div className={classes.oldImages}>
              <h2 className={classes.photoHeader}>არსებული ფოტოები</h2>
              <div className={classes.photoList}>
                {allImages.length > 0 &&
                  allImages.map((el) => (
                    <div
                      key={el[0]}
                      className={classes.photo}
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
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
                        onClick={(e) => deleteProjectImage(e, id, el[0])}
                      />
                    </div>
                  ))}
              </div>
                
              </div>
            </div>
          </div>

          <button
            type="submit"
            onClick={(e) =>
              edit(e, project, id, setSavedSucces, navigate, setBtnDisabled)
            }
            className={classes.submit}
            disabled={btnDisabled}
          >
            შენახვა
          </button>
        </div>
      )}
    </div>
  );
};

export default Edit;

// if(savedSucces){
//   return(
//   <div className={classes.succes}>
//   <h2>პროექტი შენახულია✅</h2>
// </div>
//   )

// }
