import { useState, useEffect, useContext, useRef } from "react";
import "./Dashboard.css";
import { getProjectsById } from "../../../client/client";
import { AppContext } from "../../../context/AppContext";
import { ProjectList } from "../../Items/ProjectList/ProjectList";
import { NewProject } from "../../Items/NewProject/NewProject";
import { Gear } from "../../Items/Gear/Gear";
import { writeNewPost } from "../../../firebase/chatFunctions";

function Dashboard() {
  const { profile, setProjects, projects } = useContext(AppContext);
  const dashBoardRef = useRef<HTMLDivElement>(null);
  const newProjectRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);
  const [projectLoading, setProjectLoading] = useState(false);

  const handleShowNewProject = () => {
    if (isDesktop) {
      dashBoardRef.current!.classList.add("show-new-project");
    }
    setTimeout(() => {
      if (isDesktop) {
        dashBoardRef.current!.classList.remove("show-new-project");
      }
      newProjectRef.current!.style.display = "flex";
    }, 150);
    setShowNewProject(true);
  };

  const handleCancelNewProject = () => {
    if (isDesktop) {
      dashBoardRef.current!.classList.add("remove-new-project");
    }
    setTimeout(() => {
      if (isDesktop) {
        dashBoardRef.current!.classList.remove("remove-new-project");
      }
      newProjectRef.current!.style.display = "none";
    }, 150);
    setShowNewProject(false);
  };

  useEffect(() => {
    const getProjects = async () => {
        const projectArray = await getProjectsById(profile!.id);
        setProjects(projectArray);
    };
    console.log(profile);
    if (profile) getProjects();
  }, [profile]);

  useEffect(() => {
    if (window.innerWidth > 1200) {
      setIsDesktop(true);
    }
  }, []);

  return (
    <div className="dashboard-container" ref={dashBoardRef}>
      {profile && !projectLoading && (
        <>
          <div className="block newProject" ref={newProjectRef}>
            <NewProject
              setProjectLoading={setProjectLoading}
              handleCancelNewProject={handleCancelNewProject}
            />
          </div>
          <div className="block projectList">
            <div className="standard-container taller">
              {projects && (
                <ProjectList
                  projects={projects!}
                  handleShowNewProject={handleShowNewProject}
                  showNewProject={showNewProject}
                />
              )}
              {!projects && (
                <div className="todo-loading-container">
                  <Gear />
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {projectLoading && (
        <div className="dashboard-loading-container">
          <Gear />
          <div className="loading-text">Assembling your project</div>
          <p>Your assistant is setting up the project. This may take a minute</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
