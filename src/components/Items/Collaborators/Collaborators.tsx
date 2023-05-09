import React, { useContext, useRef, useState } from "react";
import { sendNotification } from "../../../client/client";
import { CollaboratorsProps } from "../../../data/Interfaces";
import { AppContext } from "../../../context/AppContext";
import { ProjectContext } from "../../../context/ProjectContext";
import { OneCollaborator } from "./OneCollaborator";
import "./Collaborators.css";
import Plus from "../../../data/images/plus.png";
import Minus from "../../../data/images/minus.png";

export const Collaborators = () => {
  const { project } = useContext(ProjectContext);
  const { profile } = useContext(AppContext);

  const [showWriteMail, setShowWriteMail] = useState(false);
  const mailRef = useRef<HTMLInputElement>(null);
  const [showSentMessage, setShowSentMessage] = useState(false);

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
    setShowSentMessage(true);
    setTimeout(() => {
      setShowSentMessage(false);
      setShowWriteMail(false);
    }, 1000);
  };

  const handleWriteMail = () => {
    setShowWriteMail(true);
  };

  return (
    <div className="standard-container project-standard-container taller">
      <div className="standard-container-title">
        <h1>Collaborators</h1>
      </div>
      {showWriteMail ? (
        <>
          <div className="collaborators-container new-collaborator">
            <label>Send invitation</label>
            <input
              className="standard-container-input"
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
            {showSentMessage && <label>Invitation sent succesfully</label>}
          </div>
          <div className="collaborators-container">
            {project &&
              project.collaborators.map((c) => (
                <OneCollaborator collaborator={c} />
              ))}
          </div>
        </>
      ) : (
        <div className="collaborator-chat-container">
          <h1>CHAT</h1>
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
