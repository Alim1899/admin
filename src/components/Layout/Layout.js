import classes from "./Layout.module.css";
import Error from "../Pages/Error/Error";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Newproject from "../Admin/NewProject/NewProject";
import Admin from "../Admin/Admin/Admin";
import ProjectList from "../Admin/ProjectList/ProjectList";
import Edit from '../Admin/Edit/Edit'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Admin />,
  },
  {
    path: "/newProject",
    element: <Newproject />,
  }, 
  {
    path: "/projectList",
    element: <ProjectList />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },

  {
    path: "*",
    element: <Error />,
  },
]);
const Layout = () => {
  return (      
      <div className={classes.content}>
        <RouterProvider router={router} />
      </div>
  );
};

export default Layout;
