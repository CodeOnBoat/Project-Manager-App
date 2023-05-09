import React, { useContext, useEffect, useRef, useState } from "react";
import { sendNotification } from "../../../client/client";
import { CollaboratorsProps } from "../../../data/Interfaces";
import { AppContext } from "../../../context/AppContext";
import { ProjectContext } from "../../../context/ProjectContext";
import { OneCollaborator } from "./OneCollaborator";
import "./Collaborators.css";

export const Collaborators = () => {
  const { project } = useContext(ProjectContext);
  const { profile } = useContext(AppContext);

  const mailRef = useRef<HTMLInputElement>(null);
  const [selectedCollaboratorTab, setSelectedCollaboratorTab] = useState<
    "chat" | "collaborators" | "invitation"
  >("chat");
  const [showSentMessage, setShowSentMessage] = useState(false);
  const [collaboratorNumber, setCollaboratorNumber] = useState<number>();

  useEffect(() => {
    let provNumber: number = -1;
    project?.collaborators.forEach((c) => {
      provNumber = provNumber + 1;
    });
    setCollaboratorNumber(provNumber);
    console.log(collaboratorNumber);
  }, [collaboratorNumber]);

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
      setSelectedCollaboratorTab("chat");
    }, 1000);
  };

  const handleWriteMail = () => {
    setSelectedCollaboratorTab("invitation");
  };

  const handleCollaborators = () => {
    setSelectedCollaboratorTab("collaborators");
  };

  return (
    <div className="standard-container project-standard-container taller">
      <div className="standard-container-title">
        <h1>Collaborators</h1>
      </div>
      {selectedCollaboratorTab === "invitation" ? (
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
              onClick={() => setSelectedCollaboratorTab("chat")}
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
        </>
      ) : (
        <>
          {selectedCollaboratorTab === "collaborators" ? (
            <>
              <div className="collaborators-container">
                {project &&
                  project.collaborators.map((c) => (
                    <OneCollaborator collaborator={c} />
                  ))}
                <button
                  onClick={() => setSelectedCollaboratorTab("chat")}
                  className="standard-container-button left"
                >
                  Chat
                </button>
              </div>
            </>
          ) : (
            <div className="collaborator-chat-container">
              <h1>CHAT</h1>
              <button
                onClick={() => setSelectedCollaboratorTab("collaborators")}
                className="standard-container-button left medium"
              >
                {collaboratorNumber} Collaborators
              </button>
              <button
                className="standard-container-button right small "
                onClick={handleWriteMail}
              >
                +
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
