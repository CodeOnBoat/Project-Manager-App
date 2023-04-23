import React, { useState, useEffect, useContext } from "react";
import "./Dashboard.css";
import { DashbordProps, Profile, ProjectType } from "../../data/Interfaces";
import { addNewProject, getProjectsById } from "../../client/client";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { Stats } from "../Stats/Stats";
import { Chart } from "chart.js";
import { ProjectList } from "../ProjectList/ProjectList";
import DonautChart from "../chart/DonautChart";

function Dashboard(props: DashbordProps) {
  const { profile, setProjects, projects } = useContext(AppContext);

  const createNewProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProject: ProjectType = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      owner: profile!.id + "",
    };
    const updateProjects = async () => {
      const newP = await addNewProject(newProject);
      setProjects([...projects!, newP]);
    };
    updateProjects();
  };

  useEffect(() => {
    console.log("here");
    const getProjects = async () => {
      const projectArray = await getProjectsById(profile!.id);
      setProjects(projectArray);
    };
    if (profile) getProjects();
  }, [profile]);

  return (
    <div className="dashboard-container">
      {profile && (
        <>
          <div className="block statc-block">
            <DonautChart
              total={100}
              completed={90}
              size={200}
              strokeWidth={12}
              fontSize={30}
              fontColor="#fff"
              trackColor="rgba(0, 200, 0, 0)"
              progressColor="#fff"
            />
            <div className="standard-container stats-container">
              <Stats
                completedTasks={4}
                effectiveTime="12:04"
                remainingTasks={6}
                estimatedTime="21:06"
              />
            </div>
          </div>

          <div className="block">
            <div className="standard-container">
              <form className="newProject-form" onSubmit={createNewProject}>
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
          </div>
          <div className="block">
            <div className="standard-container">
              {projects && <ProjectList projects={projects!} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
