import React, { useState } from "react";
import "./ProjectInfo.css";
import Trash from "../../../data/images/trash.png";
import Edit from "../../../data/images/edit.png";

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
  const [projectInfoHidden, setProjectInfoHidden] = useState(true);

  return (
    <div className="standard-container project-standard-container project-info-container">
      <div className="project-info-header">
        <div
          className={
            projectInfoHidden
              ? "standard-container-title hidden"
              : "standard-container-title"
          }
        >
          <h1 className="title-info">{title}</h1>
          <div className="project-info-btn-container">
            <button
              className="open-collaborators-button"
              onClick={() => setProjectInfoHidden(!projectInfoHidden)}
            >
              {projectInfoHidden ? "+" : "-"}
            </button>
            <img src={Edit} alt="" className="project-option-icon" />
            <img src={Trash} alt="" className="project-option-icon" onClick={() => deleteProject} />
          </div>
        </div>
      </div>
      <div
        className={
          projectInfoHidden ? "project-expandable hidden" : "project-expandable"
        }
      >
        <div className="project-info-description-container">{description}</div>
      </div>
    </div>
  );
};
