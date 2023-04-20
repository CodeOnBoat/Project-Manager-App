import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { DashbordProps, Profile } from "../../data/Interfaces";
import { addNewProject, getProjectsById } from "../../client/client";
import { Project } from "../../Iterfaces";
import { Link } from "react-router-dom";

function Dashboard(props: DashbordProps) {
  const [projects, setProjects] = useState<Project[]>([]);

  const createNewProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProject: Project = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      owner: props.profile.id + "",
    };
    console.log(newProject.title + "hereeee");
    addNewProject(newProject);
    setProjects([...projects, newProject]);
  };

  useEffect(() => {
    const getProjects = async () => {
      const projectArray = await getProjectsById(props.profile.id);
      setProjects(projectArray);
    };
    if (props.profile) getProjects();
  }, [props.profile]);

  return (
    <div className="dashboard-container">
      {props.profile && (
        <>
          <div className="user-info">
            <img src={props.profile.picture} alt="user image" sizes="60x60" />
            <p>{props.profile.given_name}</p>
            <button onClick={props.logOut}>Log out</button>
          </div>
          <div className="input-form-container">
            <form onSubmit={createNewProject}>
              <input
                name="title"
                className="project-title"
                placeholder="Project title"
                type="text"
              />
              <input
                name="description"
                className="project-description"
                placeholder="Project description"
                type="text"
              />
              <button type="submit">submit</button>
            </form>
          </div>
          <div className="projects-container">
            {projects.map((project, index) => (
              <div className="project-title" key={index}>
                <Link to="/project">{project.title}</Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
