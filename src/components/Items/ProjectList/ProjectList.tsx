import React from "react";
import { ProjectType } from "../../../data/Interfaces";
import { Link } from "react-router-dom";
import "./ProjectList.css";
import "../Stats/Stats.css";

export interface ProjectListProps {
  projects: ProjectType[];
  handleShowNewProject: () => void;
  showNewProject: boolean;
  setEnableBack: Function;
}

export const ProjectList = ({
  projects,
  handleShowNewProject,
  showNewProject,
  setEnableBack,
}: ProjectListProps) => {
  return (
    <>
      <div className="standard-container-title">
        <h1>Projects</h1>
      </div>
      <div className="project-list">
        {projects.map((p) => (
          <div className="task-container list">
            <div className="flex-space-between list">
              <Link
                className="link-to-project"
                to={`/project/${p.title}`}
                onClick={() => setEnableBack(true)}
              >
                {p.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
      {!showNewProject && (
        <button
          className="standard-container-button right small"
          onClick={handleShowNewProject}
        >
          +
        </button>
      )}
    </>
  );
};
