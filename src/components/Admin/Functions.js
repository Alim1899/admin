import app from "../../firebaseConfig";
import markerIcon from "../../assets/icons/marker.png";

import {
  getDatabase,
  set,
  get,
  ref,
  push,
  remove,
  update,
} from "firebase/database";
// TESTED WORKING
export const save = async (
  e,
  header,
  description,
  year,
  month,
  allImages,
  coords,
  location,
  setSavedSucces
) => {
  try {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "projects"));
    const key = newDocRef.key;
    console.log(newDocRef, key);
    await set(newDocRef, {
      id: `project${new Date().getTime()}`,
      header: header,
      description: description,
      date: { month: month, year: year },
      images: allImages,
      coords: coords,
      location: location,
    });
    await update(ref(db), {
      [`ids/${key}`]: key,
    });
    setSavedSucces(true);
    window.location.reload();
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export const edit = async (
  e,
  project,
  projectId,
  setSavedSucces,
  navigate,
  setBtnDisabled
) => {
  e.preventDefault();
  setBtnDisabled(true);
  try {
    const db = getDatabase(app);
    const projectRef = ref(db, `projects/${projectId}`);
    await update(projectRef, project);
    setSavedSucces(true);
    setTimeout(() => {
      navigate("/projectList");
      deleteAllData();
    }, 1200);
  } catch (error) {
    console.log("Error updating data:", error);
  }
};

export const retrieveData = async (setProjects) => {
  const db = getDatabase();
  const projectsRef = ref(db, "projects");
  try {
    const snapshot = await get(projectsRef);
    if (snapshot.exists()) {
      setProjects(Object.entries(snapshot.val()));
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
};

export const handleLocation = (
  e,
  coords,
  setPosition,
  setmarker,
  setFlyTo,
  setIcon
) => {
  var pattern = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/;
  if (pattern.test(coords)) {
    setPosition(coords.split(","));
    setmarker(coords.split(","));
    setFlyTo(coords.split(","));
    setIcon(markerIcon);
  } else {
    alert("აკრიფე სწორი ფორმატით - 42.123456,43.123456");
  }
};
export const retrieveImage = async (setnewImages) => {
  const db = getDatabase(app);
  const dbRef = ref(db, "images");
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    setnewImages(Object.entries(snapshot.val()));
  } else {
    console.error("cant find");
  }
};
export const imageUploadHandler = async (e, setnewImages) => {
  if (e.target.files) {
    const fileList = e.target.files;
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const reader = new FileReader();

      if (file.type.startsWith("image/")) {
        reader.onload = async () => {
          const dataURL = reader.result;
          const key = "photo" + Date.now() + i;
          try {
            const db = getDatabase(app);
            const newDocRef = push(ref(db, "images"));
            await set(newDocRef, {
              key: key,
              url: dataURL,
            });
            await retrieveImage(setnewImages);
          } catch (error) {
            console.error("Something went wrong:", error);
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert("ატვირთეთ მხოლოდ ფოტოები");
      }
    }
  }
};

export const deleteAllData = async () => {
  try {
    const db = getDatabase(app);
    const imagesRef = ref(db, "images");
    await remove(imagesRef);
  } catch (error) {
    console.error("Error deleting all data:", error);
  }
};

export const deleteImage = async (e, imageId, setNewImages) => {
  if (!imageId) {
    imageId = e.target.id;
  }
  const db = getDatabase(app);
  const dbRef = ref(db, "images/" + imageId);
  await remove(dbRef);
  await retrieveImage(setNewImages)
};


export const deleteProject = async (id) => {
  const db = getDatabase(app);
  const dbRef = ref(db, `projects/${id}`);
  const key = ref(db, `ids/${id}`);

  await remove(dbRef);
  await remove(key);
};

export const getData = async (id, dispatch) => {
  const db = getDatabase(app);
  const dbRef = ref(db, `projects/${id}`);
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const projectData = snapshot.val();
      const transformedData = {
        flyTo: projectData.coords.split(","),
        year: projectData.date.year,
        selectedMonth: projectData.date.month,
        geHeader: projectData.header.ge,
        enHeader: projectData.header.en,
        geLocation: projectData.location.ge,
        enLocation: projectData.location.en,
        geDescription: projectData.description.ge,
        enDescription: projectData.description.en,
        allImages: projectData.images,
      };
      dispatch({ type: "dataArrived", payload: transformedData });
    } else {
      dispatch({ type: "error" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteProjectImageEdit = async (
  e,
  projectId,
  imageId,
  allImages,
  dispatch
) => {
  console.log(projectId,imageId,allImages);
   allImages.filter(img=>img[0]!==imageId);
  dispatch({type:'setImages',payload:allImages.filter(img=>img[0]!==imageId)})
  // const dbRef = ref(db, `projects/${projectId}/images/${imageId}`);
  // const newKeys = { ...allImages };
  // delete newKeys[imageId];
  // setAllImages(newKeys);
  // await remove(dbRef);
};

export const getImages = async (projectId, setAllImages) => {
  console.log(projectId);
  const db = getDatabase(app);
  const dbRef = ref(db, `projects/${projectId}/images`);
  const snapshot = await get(dbRef);
  if (snapshot.exists()) setAllImages(snapshot.val());
};

export const projectImageUploader = async (e, dispatch) => {
  if (e.target.files) {
    const fileList = e.target.files;
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const reader = new FileReader();

      if (file.type.startsWith("image/")) {
        reader.onload = async () => {
          const dataURL = reader.result;
          const key = "photo" + Date.now() + i;
          try {
            const db = getDatabase(app);
            const newDocRef = push(ref(db, "images"));
            await set(newDocRef, {
              key: key,
              url: dataURL,
            });
            const dbRef = ref(db, "images");
            const snapshot = await get(dbRef);
            if (snapshot.val()) {
              dispatch({
                type: "imageUpload",
                payload: Object.entries(snapshot.val()),
              });
            }
          } catch (error) {
            console.error("Something went wrong:", error);
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert("ატვირთეთ მხოლოდ ფოტოები");
      }
    }
  }
};

export const removeProjectImage = async (e, allImages, dispatch) => {
  const targetId = e.target.id;
  console.log(`Target ID: ${targetId}`);
  const index = allImages.findIndex((item) => item[0] === targetId);
  allImages.splice(index, 1);
  dispatch({
    type: "imageUpload",
    payload: allImages,
  });
  const db = getDatabase(app);
  const dbRef = ref(db, "images/" + targetId);
  await remove(dbRef);
};

export const saveProject = async (
  e,
  geHeader,
  enHeader,
  month,
  year,
  coords,
  geLocation,
  enLocation,
  geDescription,
  enDescription,
  allImages,
  setSavedSuccess,
  dispatch
) => {
  e.preventDefault();
  try {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "projects"));
    const key = newDocRef.key;
    await set(newDocRef, {
      id: `project${new Date().getTime()}`,
      header: { ge: geHeader, en: enHeader },
      description: { ge: geDescription, en: enDescription },
      date: { month: month, year: year },
      images: allImages,
      coords: coords.join(),
      location: { ge: geLocation, en: enLocation },
    });
    await push(ref(db, `ids/${key}`), key);
    setSavedSuccess(true);
    dispatch({ type: "resetState" });
    setTimeout(() => {
      setSavedSuccess(false);
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export const handleMouseOver = (e,classes) => {
  const element = e.currentTarget.childNodes[1];
  element.classList.add(classes.bindiv);
  element.classList.remove(classes.none);
};

export const handleMouseOut = (e,classes) => {
  const element = e.currentTarget.childNodes[1];
  element.classList.remove(classes.bindiv);
  element.classList.add(classes.none);
};

  export const handleFieldChange = (dispatch,field, value) => {
    dispatch({ type: "updateField", field, payload: value });
  };


  export const saveEditedProject = async (
    e,
    id,
    geHeader,
    enHeader,
    month,
    year,
    coords,
    geLocation,
    enLocation,
    geDescription,
    enDescription,
    allImages,
    newImages,
    setSavedSuccess,
  ) => {
    e.preventDefault();

    try {
      const db = getDatabase(app);
      const newDocRef = (ref(db, `projects/${id}`));
      await update(newDocRef, {
        header: { en: enHeader, ge: geHeader },
         description: { ge: geDescription, en: enDescription },
         date: { month: month, year: year },
         images: allImages.concat(newImages),
         coords: coords.join(","),
         location: { ge: geLocation, en: enLocation },
      });
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        window.location.href = "/projectList"
      }, 2000);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };