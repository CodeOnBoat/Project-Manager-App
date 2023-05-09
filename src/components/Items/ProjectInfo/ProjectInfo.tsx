import React, { useState } from "react";
import "./ProjectInfo.css";
import Trash from "../../../data/images/trash.png";
import Edit from "../../../data/images/edit.png";
import Plus from "../../../data/images/plus.png";
import Minus from "../../../data/images/minus.png";

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
  const [showPopup, setShowPopup] = useState(false);

  const deletePopUp = () => {};
  return (
    <>
      {showPopup && (
        <div className="popup">
          <div className=" standard-container popup-content">
            <h1>Delete project</h1>
            <p className="pop-up-text">{`Are you sure you want to delete the project "${title}"?`}</p>
            <button
              className="standard-container-button left medium"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
            <button
              className="standard-container-button right medium"
              onClick={() => deleteProject()}
            >
              Delete
            </button>
          </div>
        </div>
      )}
      <div className="standard-container project-standard-container taller">
        <div className="project-info-header">
          <div className="standard-container-title">
            <h1>{title}</h1>
            <div className="project-info-btn-container">
              <img src={Edit} alt="" className="project-option-icon" />
              <img
                src={Trash}
                alt=""
                className="project-option-icon"
                onClick={() => setShowPopup(true)}
              />
            </div>
          </div>
        </div>
        <div className="project-info-description-container">
          <p className="description-text"> {description}</p>
        </div>
      </div>
    </>
  );
};
