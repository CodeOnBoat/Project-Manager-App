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
  const [showPopup, setShowPopup] = useState(false);

  const mailRef = useRef<HTMLInputElement>(null);
  const [selectedCollaboratorTab, setSelectedCollaboratorTab] = useState<
    "chat" | "collaborators" | "invitation"
  >("chat");
  const [showSentMessage, setShowSentMessage] = useState(false);
  const [showWrongMail, setShowWrongMail] = useState(false);

  const [collaboratorNumber, setCollaboratorNumber] = useState<number>();
  const mailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
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
    const result: boolean = mailRegex.test(mailRef.current?.value!);
    if (!result) {
      setShowWrongMail(true);
      return;
    }
    sendNotification(
      profile?.name + "",
      mailRef.current?.value!,
      project?.project_id!
    );
    setShowSentMessage(true);
    setTimeout(() => {
      setShowSentMessage(false);
      setShowWrongMail(false);
      setShowPopup(false);
    }, 1000);
  };

  const handleWriteMail = () => {
    setShowPopup(true);
  };
  const handleEmailSelect = (event: React.FocusEvent<HTMLInputElement>) => {
    if (showWrongMail) {
      if (mailRef.current) {
        mailRef.current.value = "";
      }
    }
    setShowWrongMail(false);
  };

  return (
    <div className="standard-container project-standard-container taller">
      <div className="standard-container-title">
        <h1>Collaborators</h1>
      </div>
      {/* {selectedCollaboratorTab === "invitation" ? (
        <>
          <div className="collaborators-container new-collaborator">
            <h1>Send invitation</h1>
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
              Close
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
      ) : ( */}
      <>
        {showPopup && project && (
          <div className="popup">
            <div className=" standard-container popup-content send-invitation">
              <h1>Send invitation</h1>
              <input
                className="standard-container-input"
                placeholder="user@email.com"
                type="text"
                ref={mailRef}
                onSelect={handleEmailSelect}
              />
              <button
                className="standard-container-button left medium"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
              <button
                onClick={handleSendNotification}
                className="standard-container-button right medium"
              >
                Send
              </button>
              {showSentMessage && (
                <div className="sent-succesfully">
                  Invitation sent succesfully!
                </div>
              )}
              {showWrongMail && (
                <div className="wrong-mail">
                  Please enter a valid email address
                </div>
              )}
            </div>
          </div>
        )}
        {selectedCollaboratorTab === "collaborators" ? (
          <>
            <div className="collaborators-container">
              {project &&
                project.collaborators.map((c) => (
                  <OneCollaborator collaborator={c} />
                ))}
              <button
                onClick={() => setSelectedCollaboratorTab("chat")}
                className="standard-container-button left medium"
              >
                Chat
              </button>
              <button
                className="standard-container-button right small "
                onClick={handleWriteMail}
              >
                +
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
          </div>
        )}
      </>
      {/* )} */}
    </div>
  );
};
