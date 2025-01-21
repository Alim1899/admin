import { deleteProject } from "../Functions";
import Project from "./Project";
import add from "../../../assets/AdminIcons/add_black.svg";

import classes from "./ProjectList.module.css";
import { useProjects } from "../../Context/ProjectsContext";

const ProjectList = () => {
  const { data, projectsLoaded, error, dispatch } = useProjects();
  const projects = data.filter((value, index, self) => {
    return index === self.findIndex((t) => t.id === value.id);
  });
  return (
    <div className={classes.main}>
      <div className={classes.headers}>
        <div className={classes.headerDiv}>
          <h1 className={classes.header}>პროექტები</h1>
        </div>
        <a className={classes.link} href="newProject">
          <img className={classes.iconl} src={add} alt="addproject" />
          დამატება
        </a>
      </div>

      {!projectsLoaded && (
        <div className={classes.animation}>
          <h2>იტვირთება პროექტები</h2>
          <div className={classes.loader}></div>
        </div>
      )}
      {error && (
        <div className={classes.animation}>
          <h2>პროექტები ვერ მოიძებნა🚫</h2>
        </div>
      )}

      {projects.length > 0 && (
        <div className={classes.projectList}>
          {projects.map((project) => (
            <Project
              key={project.id}
              project={project.value}
              id={project.id}
              deleteProject={() =>
                deleteProject(project.id, dispatch, projects)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
