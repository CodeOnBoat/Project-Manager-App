import React, { useContext, useRef, useState } from "react";
import "./ProjectInfo.css";
import Trash from "../../../data/images/trash.png";
import Edit from "../../../data/images/edit.png";
import Save from "../../../data/images/save.png";
import { updateProjectInfo } from "../../../client/client";
import { AppContext } from "../../../context/AppContext";
import { ProjectContext } from "../../../context/ProjectContext";
import { useEffect } from "react";

export interface ProjectInfoProps {
  id: string;
  deleteProject: () => void;
}

export const ProjectInfo = ({ id, deleteProject }: ProjectInfoProps) => {
  const { profile, darkMode } = useContext(AppContext);
  const { project, setProject } = useContext(ProjectContext);
  const { projects, setProjects } = useContext(AppContext);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
    }
  }, [project]);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = () => {
    setIsEditable(false);
    updateProjectInfo(id, title!, description!);
    setProject({
      ...project!,
      title: title,
      description: description,
    });
    const tempProjects = projects!;
    tempProjects.filter((p) => p.project_id === project!.project_id)[0].title =
      title;
    tempProjects.filter(
      (p) => p.project_id === project!.project_id
    )[0].description = description;
    setProjects(tempProjects);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  return (
    <>
      {showPopup && project && (
        <div className="popup">
          <div className=" standard-container popup-content">
            <h1>Delete project</h1>
            <p className="pop-up-text">{`Are you sure you want to delete the project "${project?.title}"?`}</p>
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
        <div className="standard-container-title">
          <h1>
            <textarea
              className="editable-title"
              value={title}
              disabled={!isEditable}
              onChange={handleTitleChange}
            />
          </h1>

          {project?.owner === profile?.id + "" && (
            <div className="project-info-btn-container">
              {!isEditable && (
                <img
                  src={Edit}
                  alt=""
                  className={`project-option-icon ${darkMode}`}
                  onClick={handleEditClick}
                />
              )}
              {isEditable && (
                <img
                  src={Save}
                  alt=""
                  className={`project-option-icon ${darkMode}`}
                  onClick={handleSaveClick}
                />
              )}
              <img
                src={Trash}
                alt=""
                className={`project-option-icon ${darkMode}`}
                onClick={() => setShowPopup(true)}
              />
            </div>
          )}
        </div>
        <div className="project-info-description-container">
          <textarea
            className="description-text"
            value={description}
            disabled={!isEditable}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
      </div>
    </>
  );
};
