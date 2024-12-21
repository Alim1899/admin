import React, { useState, useReducer } from "react";
import classes from "./NewProject.module.css";
import Leaflet from "../../Map/Leaflet";
import "leaflet/dist/leaflet.css";
import edit from "../../../assets/AdminIcons/list.svg";
import office from "../../../assets/icons/office.png";
import point from "../../../assets/icons/marker.png";
import { months, years } from "./DatePicker";
import ProjectPreview from "../Preview/Preview";
import Input from "../Input";
import {saveProject} from '../Functions'
const initialState = {
  geHeader: "",
  enHeader: "",
  savedSuccess: false,
  geLocation: "",
  enLocation: "",
  geDescription: "",
  enDescription: "",
  allImages: [],
  position: [42.259061, 43.00614],
  marker: [42.259061, 42.66614],
  flyTo: "",
  year: "",
  btnDisabled: true,
  selectedMonth: { ge: "", en: "" },
};
const reducer = (state, action) => {
  switch (action.type) {
    case "updateField":
      return { ...state, [action.field]: action.value };
    case "updateCoords":
      return { ...state, flyTo: action.payload };
    case "setImages":
      return { ...state, allImages: action.payload };
    case "setSavedSuccess":
      return { ...state, savedSuccess: action.payload };
    case "imageUpload":
      return { ...state, allImages: action.payload };
    case "resetState":
      return initialState;
    default:
      throw new Error("Unknown action type");
  }
};

const NewProject = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    geHeader,
    enHeader,
    selectedMonth,
    geLocation,
    enLocation,
    year,
    flyTo,
    enDescription,
    geDescription,
    position,
    marker,
    allImages,
  } = state;
  const [savedSuccess, setSavedSuccess] = useState(false);

  const btnDisabled =
    geHeader &&
    enHeader &&
    selectedMonth.ge &&
    year &&
    flyTo &&
    geLocation &&
    enLocation &&
    geDescription &&
    enDescription&&
    allImages.length>0;

  return (
    <div className={classes.main}>
      <div className={classes.headers}>
        <div className={classes.headerDiv}>
          <h1 className={classes.header}>პროექტის დამატება</h1>
        </div>
        <a className={classes.link} href="projectList">
          <img className={classes.iconl} src={edit} alt="addproject" />
          პროექტების სია
        </a>
      </div>

      <div className={classes.content}>
        <div className={classes.form}>
          <div className={classes.formWrapper}>
            <div className={classes.inputs}>
              <div className={classes.projectHeaders}>
                <div className={classes.enge}>
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
                        value: e.target.value,
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
                        value: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className={classes.datePicker}>
                  <label htmlFor="month" className={classes.label}>
                    თვე
                    <select
                      name="month"
                      onChange={(e) => {
                        dispatch({
                          type: "updateField",
                          field: "selectedMonth",
                          value: {
                            ge: e.target.value,
                            en: e.target.options[e.target.selectedIndex].id,
                          },
                        });
                      }}
                    >
                      <option value="" disabled={selectedMonth.ge !== ""}>
                        აირჩიე თვე
                      </option>
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
                          value: e.target.value,
                        });
                      }}
                    >
                      <option value="" disabled={year !== ""}>
                        აირჩიე წელი
                      </option>
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
                  label="coords"
                  id="coords"
                  placeholder="43.456,42.12345"
                  onBlur={(e) => {
                    const value = e.target.value.split(",").map(Number);
                    if (
                      value.length === 2 &&
                      value.every((num) => !isNaN(num))
                    ) {
                      dispatch({
                        type: "updateCoords",
                        payload: value,
                      });
                    } else {
                      dispatch({
                        type: "updateCoords",
                        payload: "",
                      });
                    }
                  }}
                />
                <Input
                  type="input"
                  header="ლოკაცია ქარ."
                  label="geLocation"
                  value={geLocation}
                  id="geLocation"
                  placeholder="ქუთაისი, იმერეთი"
                  onChange={(e) => {
                    dispatch({
                      type: "updateField",
                      field: "geLocation",
                      value: e.target.value,
                    });
                  }}
                />
                <Input
                  type="input"
                  header="ლოკაცია en."
                  label="enLocation"
                  value={enLocation}
                  id="enLocation"
                  placeholder="Kutaisi, Imereti"
                  onChange={(e) => {
                    dispatch({
                      type: "updateField",
                      field: "enLocation",
                      value: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className={classes.description}>
              <Input
                type="textarea"
                header="აღწერა ქარ.."
                label="geDescription"
                id="geDescription"
                value={geDescription}
                onChange={(e) => {
                  dispatch({
                    type: "updateField",
                    field: "geDescription",
                    value: e.target.value,
                  });
                }}
              />
              <Input
                type="textarea"
                header="აღწერა EN."
                label="enDescription"
                value={enDescription}
                id="enDescription"
                onChange={(e) => {
                  dispatch({
                    type: "updateField",
                    field: "enDescription",
                    value: e.target.value,
                  });
                }}
              />
            </div>
            <div className={classes.map}>
              <Leaflet
                marker={marker}
                center={position}
                zoom={7}
                iconUrl={point}
                popup="ოფისი"
                office={office}
                flyTo={flyTo}
              />
            </div>

            <ProjectPreview
              allImages={allImages}
              dispatch={dispatch}
            ></ProjectPreview>
          </div>
        </div>
        <button
          type="submit"
          className={classes.submit}
          disabled={!btnDisabled}
          onClick={(e)=>{
            saveProject(e,
             geHeader,
  enHeader,
  selectedMonth,
  year,
 flyTo,
 geLocation,
 enLocation,
 geDescription,
 enDescription,
 allImages,
  setSavedSuccess,
  dispatch
  )
          }}
        >
          პროექტის შენახვა
        </button>
      </div>

      {savedSuccess && (
        <div className={classes.popup}>
          <h1>პროექტი შენახულია ✅</h1>
        </div>
      )}
    </div>
  );
};

export default NewProject;
