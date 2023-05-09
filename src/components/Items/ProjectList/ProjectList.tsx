import React from "react";
import { ProjectType } from "../../../data/Interfaces";
import { Link } from "react-router-dom";
import "./ProjectList.css";
import "../Stats/Stats.css";

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
          <Link className="task-container " to={`/project/${p.project_id}`}>
            <div className="flex-space-between list">
              <div className=" link-to-project">{p.title}</div>
            </div>
          </Link>
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
