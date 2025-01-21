import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import { getContextIds, getProjects } from "../Admin/Functions";

const ProjectsContext = createContext();
const initialState = {
  data: [],
  projectsLoaded: false,
  ids: [],
  length: 0,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "get/ids":
      return { ...state, ids: action.payload, length: action.payload.length };
    case "null/projects":
      return { ...state, error: true, projectsLoaded: true };
    case "get/project":
      return {
        ...state,
        projectsLoaded: true,
        data: [
          ...state.data,
          { id: action.payload.id, value: action.payload.value },
        ],
      };
    case "delete/project":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
const ProjectsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { ids, projectsLoaded, data, length, error } = state;
  const contextValue = useMemo(
    () => ({ data, projectsLoaded, ids, error, dispatch }),
    [data, projectsLoaded, ids, error]
  );

  useEffect(() => {
    getContextIds(dispatch);
  }, []);

  useEffect(() => {
    if (length === 0) return;
    ids.forEach((id) => {
      getProjects(id, dispatch);
    });
  }, [length, ids]);

  return (
    <ProjectsContext.Provider value={contextValue}>
      {children}
    </ProjectsContext.Provider>
  );
};

const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};

export { ProjectsProvider, useProjects };
