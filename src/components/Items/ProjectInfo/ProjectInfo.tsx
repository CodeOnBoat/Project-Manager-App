import React from "react";
import { deleteProjectById } from "../../../client/client";
import { useNavigate } from "react-router-dom";
import "./ProjectInfo.css";

export interface ProjectInfoProps {
  title: string;
  description: string;
  deleteProject: () => void;
}

export const ProjectInfo = ({
  title,
  description,
  deleteProject,
}: ProjectInfoProps) => {
  return (
    <div className="standard-container project-standard-container project-info-container">
      <div className="project-info-header">
        <h1 className="project-name-title">{title}</h1>
        <div className="project-info-btn-container">
          <button className="project-info-option-icon">edit</button>
          <button className="project-info-option-icon" onClick={deleteProject}>
            Delete
          </button>
          <button className="project-info-option-icon">settings</button>
        </div>
      </div>
      <div className="project-info-description-container">{description}</div>
    </div>
  );
};
