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

export const retrieveImage = async (setAllImages) => {
  const db = getDatabase(app);
  const dbRef = ref(db, "images");
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    setAllImages(snapshot.val());
  } else {
    console.error("cant find");
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

export const imageUploadHandler = async (e, setAllImages) => {
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
            await retrieveImage(setAllImages);
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

export const deleteImage = async (e, imageId, setKeys, keys) => {
  if (!imageId) {
    imageId = e.target.id;
  }
  const db = getDatabase(app);
  const dbRef = ref(db, "images/" + imageId);
  await remove(dbRef);

  const newKeys = { ...keys };
  delete newKeys[imageId];

  setKeys(newKeys);
};
export const deleteProject = async (id) => {
  const db = getDatabase(app);
  const dbRef = ref(db, "projects/" + id);
  const key = ref(db, "ids/" + id);
  await remove(dbRef);
  await remove(key);
};
export const getData = async (id, setProject, setDataArrived) => {
  const db = getDatabase(app);
  const dbRef = ref(db, `projects/${id}`);
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const projectData = snapshot.val();
      setProject(projectData);
      setDataArrived(true);
    } else {
      console.error("Can't find project with the given ID");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteProjectImage = async (
  e,
  projectId,
  imageId,
  setAllImages,
  allImages
) => {
  const db = getDatabase(app);
  const dbRef = ref(db, `projects/${projectId}/images/${imageId}`);
  const newKeys = { ...allImages };
  delete newKeys[imageId];
  setAllImages(newKeys);
  await remove(dbRef);
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
    await set(newDocRef, {
      id: `project${new Date().getTime()}`,
      header: { ge: geHeader, en: enHeader },
      description: { ge: geDescription, en: enDescription },
      date: { month: month, year: year },
      images: allImages,
      coords: coords.join(),
      location: { ge: geLocation, en: enLocation },
    });
    await push(ref(db, "ids"), newDocRef.key);
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
