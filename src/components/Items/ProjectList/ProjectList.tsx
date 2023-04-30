import React from "react";
import { ProjectType } from "../../../data/Interfaces";
import { Link } from "react-router-dom";
import "./ProjectList.css";

export interface ProjectListProps {
  projects: ProjectType[];
  handleShowNewProject: () => void;
  showNewProject: boolean;
}

export const ProjectList = ({
  projects,
  handleShowNewProject,
  showNewProject,
}: ProjectListProps) => {
  return (
    <>
      <div className="standard-container-title">
        <h1>Projects</h1>
      </div>
      <div className="project-list">
        {projects.map((p) => (
          <div className="stats-one-stat list">
            <div className="flex-space-between list">
              <Link className="link-to-project" to={`/project/${p.title}`}>
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
