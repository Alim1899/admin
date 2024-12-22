export const initialState = {
    dataArrived: false,
    hasError: false,
    projectDetails: {
      geHeader: "",
      enHeader: "",
      selectedMonth: { ge: "", en: "" },
      geLocation: "",
      enLocation: "",
      geDescription: "",
      enDescription: "",
      allImages: [],
      flyTo: "",
      year: "",
    },
    savedSuccess: false,
  };
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case "loading":
        return { ...initialState };
      case "dataArrived":
        return {
          ...state,
          dataArrived: true,
          hasError: false,
          projectDetails: {
            ...state.projectDetails,
            ...action.payload,
          },
        };
      case "updateField":
        return {
          ...state,
          projectDetails: {
            ...state.projectDetails,
            [action.field]: action.payload,
          },
        };
      case "updateCoords":
        return {
          ...state,
          projectDetails: { ...state.projectDetails, flyTo: action.payload },
        };
      case "setImages":
        return {
          ...state,
          projectDetails: {
            ...state.projectDetails,
            allImages: action.payload,
          },
        };
      case "setSavedSuccess":
        return { ...state, savedSuccess: action.payload };
      case "imageUpload":
        return {
          ...state,
          projectDetails: {
            ...state.projectDetails,
            allImages: action.payload,
          },
        };
      case "resetState":
        return initialState;
      case "error":
        return { ...state, hasError: true };
      default:
        throw new Error("Unknown action type");
    }
  };