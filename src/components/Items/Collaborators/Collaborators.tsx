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

  const handleSendNotification = () => {
    console.log({
      user_id: profile?.id,
      collaborator_mail: mailRef.current?.value!,
      project_id: project?.project_id,
    });
    sendNotification(
      profile?.id + "",
      mailRef.current?.value!,
      project?.project_id!
    );
    setShowWriteMail(false);
  };

  const handleWriteMail = () => {
    setShowWriteMail(true);
  };

  return (
    <div className="standard-container project-standard-container project-collaborator-container">
      <div className="standard-container-title">
        <h1>Collaborators</h1>
      </div>
      {showWriteMail ? (
        <>
          <div>Send invitation</div>
          <input placeholder="user@email.TsaskWise" type="text" ref={mailRef} />
          <button onClick={handleSendNotification}>submit</button>
        </>
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
  );
};
