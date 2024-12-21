import { useParams,useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import Control from "../../Layout/Inputs/Control";
import {
  getData,
  handleLocation,
  edit,
  imageUploadHandler,
  deleteImage,
  deleteProjectImage,
  getImages,
  deleteAllData
} from "../Functions";
import classes from "./Edit.module.css";
import Leaflet from "../../Map/Leaflet";
import add from "../../../assets/AdminIcons/add_black.svg";
import admin from "../../../assets/AdminIcons/list.svg";
import upload from "../../../assets/AdminIcons/upload.svg";
import office from "../../../assets/icons/office.png";
import { years, months } from "../NewProject/DatePicker";
import recycle from "../../../assets/icons/delete.png";
const Edit = () => {
  const [project, setProject] = useState([{}]);
  const [btnDisabled,setBtnDisabled] =useState(false);
  const [savedSucces,setSavedSucces] = useState(false);
  const [dataArrived, setDataArrived] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState({ ge: "", en: "" });
  const [position, setPosition] = useState([42.259061, 43.00614]);
  const [marker, setMarker] = useState([42.259061, 42.66614]);
  const [flyTo, setFlyTo] = useState(null);
  const [icon, setIcon] = useState(office);
  const { id } = useParams();
  const [oldImages, setOldImages] = useState([]);
  const [newImages, setnewImages] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    if (!dataArrived) {
      getData(id, setProject, setDataArrived);
      getImages(id,setOldImages)
    } else {
    }
  }, [id,project,dataArrived,oldImages]);
  useEffect(() => {
    deleteAllData();
  }, []);
  const handleMonthChange = (value) => {
    const month = months.find((m) => m.value === value);
    if (month) {
      setSelectedMonth({ ge: month.value, en: month.enValue });
    }
  };

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
  if (!dataArrived) {
    return (
      <div className={classes.animation}>
        <h2>იტვირთება...</h2>
        <div className={classes.loader}></div>
      </div>
    );
  }
  if(savedSucces){
    return(
    <div className={classes.succes}>
    <h2>პროექტი შენახულია✅</h2>
  </div>
    )

   
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

      <div className={classes.content}>
        <Formik
          validateOnChange
          initialValues={{
            geHeader: project.header.ge || "",
            enHeader: project.header.en || "",
            coords: project.coords || "",
            geDescription: project.description.ge || "",
            enDescription: project.description.en || "",
            geLocation: project.location.ge || "",
            enLocation: project.location.en || "",
            month: project.date.month.ge || "",
            year: project.date.year || "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values,setFieldValue }) => {
            console.log(project);
            project.header = {ge:values.geHeader,en:values.enHeader}
            project.description = {ge:values.geDescription,en:values.enDescription}
            project.coords = values.coords;
            project.date.month = {ge:selectedMonth.ge,en:selectedMonth.en};
            project.date.year = values.year;
            project.location = {ge:values.geLocation,en:values.enLocation}
            project.images = {...oldImages,...newImages};

            return (
              <div className={classes.content}>
                <Form className={classes.form}>
                  <div className={classes.formWrapper}>
                    <div className={classes.wrap}>
                      <Control
                        name="geHeader"
                        label="სათაური ქარ."
                        control="input"
                        type="text"
                      />
                       <Control
                        name="enHeader"
                        label="სათაური EN."
                        control="input"
                        type="text"
                      />
                      <Control
                        name="coords"
                        label="კოორდინატები"
                        control="input"
                        onBlur={(e) =>
                          handleLocation(
                            e,
                            values.coords,
                            setPosition,
                            setMarker,
                            setFlyTo,
                            setIcon
                          )
                        }
                        type="text"
                      ></Control>
                      <Control
                        name="geLocation"
                        label="ლოკაცია ქარ."
                        control="input"
                        type="text"
                      />
                      <Control
                        name="enLocation"
                        label="ლოკაცია EN."
                        control="input"
                        type="text"
                      />
                      <div className={classes.datePicker}>
                        <Control
                          name="month"
                          label="თვე"
                          options={months}
                          control="select"
                          onChange={(e) => {
                        setFieldValue("month", e.target.value);
                        handleMonthChange(e.target.value);
                      }}
                        />
                        <Control
                          name="year"
                          label="წელი"
                          options={years}
                          control="select"
                        />
                      </div>
                    </div>
                    <div className={classes.description}>
                      <Control
                        name="geDescription"
                        label="აღწერა ქარ."
                        control="textarea"
                        type="text"
                      />
                       <Control
                        name="enDescription"
                        label="აღწერა EN."
                        control="textarea"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className={classes.map}>
                    <Leaflet
                      popup="ოფისი"
                      center={position}
                      zoom={7}
                      icon={icon}
                      marker={marker}
                      location={flyTo}
                    />
                  </div>

                  <div className={classes.photoHeaders}>
                    <h2 className={classes.photoHeader}>ახალი ფოტოები</h2>
                    <h2 className={classes.photoHeader}>არსებული ფოტოები</h2>
                  </div>
                  <div className={classes.photos}>
                    <div className={classes.newImages}>
                      <div className={classes.uploadNew}>
                        <Control
                          name="image"
                          control="file"
                          label="ფოტოს ატვირთვა"
                        />
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
                          onChange={(e) =>
                            imageUploadHandler(e,setnewImages)
                          }
                          className={classes.imageUpload}
                          type="file"
                          multiple
                        ></input>
                      </div>
                      {Object.entries(newImages).length > 0 &&
                      Object.entries(newImages).map((el) => (
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
                            onClick={(e)=>{deleteImage(e,el[0],setnewImages,newImages)}}
                          />
                        </div>
                      ))}
                    </div>
                    <div className={classes.oldImages}>
                      {Object.entries(oldImages).length > 0 &&
                        Object.entries(oldImages).map((el) => (
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
                              onClick={(e)=>deleteProjectImage(e,id,el[0],setOldImages,oldImages)}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </Form>

                <button
                  type="submit"
                  onClick={(e) => edit(e, project, id,setSavedSucces,navigate,setBtnDisabled)}
                  className={classes.submit}
                  disabled={btnDisabled}
                >
                  შენახვა
                </button>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Edit;
