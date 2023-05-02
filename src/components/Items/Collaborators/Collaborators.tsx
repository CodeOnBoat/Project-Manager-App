import React, { useContext, useRef, useState } from "react";
import { sendNotification } from "../../../client/client";
import { CollaboratorsProps } from "../../../data/Interfaces";
import { AppContext } from "../../../context/AppContext";
import { ProjectContext } from "../../../context/ProjectContext";
import { OneCollaborator } from "./OneCollaborator";
import "./Collaborators.css";

export const Collaborators = () => {
  const { project } = useContext(ProjectContext);
  const { profile } = useContext(AppContext);

  const [showWriteMail, setShowWriteMail] = useState(false);
  const mailRef = useRef<HTMLInputElement>(null);
  const [collaboratorsHidden, setCollaboratorsHidden] = useState(true);

  const handleSendNotification = () => {
    console.log({
      user_id: profile?.id,
      collaborator_mail: mailRef.current?.value!,
      project_id: project?.project_id,
    });
    sendNotification(
      profile?.name + "",
      mailRef.current?.value!,
      project?.project_id!
    );
    setShowWriteMail(false);
  };

  const handleWriteMail = () => {
    setShowWriteMail(true);
  };

  return (
    <div className={"standard-container project-collaborator-container"}>
      <div
        className={
          collaboratorsHidden
            ? "standard-container-title hidden"
            : "standard-container-title"
        }
      >
        <h1 className="collaborators-title">Collaborators</h1>
        <button
          className="open-collaborators-button"
          onClick={() => setCollaboratorsHidden(!collaboratorsHidden)}
        >
          {collaboratorsHidden ? "+" : "-"}
        </button>
      </div>
      <div
        className={
          collaboratorsHidden ? "collab-expandable hidden" : "collab-expandable"
        }
      >
        {showWriteMail ? (
          <div className="collaborators-container">
            <label>Send invitation</label>
            <input
              className="new-project-input"
              placeholder="user@email.com"
              type="text"
              ref={mailRef}
            />
            <button
              onClick={() => setShowWriteMail(false)}
              className="standard-container-button left"
            >
              Back
            </button>
            <button
              onClick={handleSendNotification}
              className="standard-container-button right"
            >
              Send
            </button>
          </div>
        ) : (
          <div className="collaborators-container">
            {project &&
              project.collaborators.map((c) => (
                <OneCollaborator collaborator={c} />
              ))}
            <button
              className="standard-container-button right small "
              onClick={handleWriteMail}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
