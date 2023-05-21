import React, { useContext, useEffect, useRef, useState } from "react";
import { sendNotification } from "../../../client/client";
import { CollaboratorsProps } from "../../../data/Interfaces";
import { AppContext } from "../../../context/AppContext";
import { ProjectContext } from "../../../context/ProjectContext";
import { OneCollaborator } from "./OneCollaborator";
import "./Collaborators.css";
import { Chat } from "./Chat";
import collaboratorsImage from "../../../data/images/collaborators.png";
import chatImage from "../../../data/images/chat.png";
import emailjs from "@emailjs/browser";

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
  }, [collaboratorNumber]);

  const handleSendNotification = () => {
    const result: boolean = mailRegex.test(mailRef.current?.value!);
    if (!result) {
      setShowWrongMail(true);
      return;
    }
    const templateParams = {
      from_name: profile?.name!,
      project_name: project?.title!,
      collaborator_mail: mailRef.current?.value!,
    };

    emailjs.init("NPt7mNcSpels1zThI");
    emailjs.send("service_b615p2w", "template_a8n0o6k", templateParams);
    sendNotification(
      profile?.name!,
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
        {selectedCollaboratorTab === "collaborators" && <h1>Collaborators</h1>}
        {selectedCollaboratorTab === "chat" && <h1>Collaborator chat</h1>}
        {selectedCollaboratorTab === "invitation" && <h1>Add collaborator</h1>}
        <img
          src={
            selectedCollaboratorTab === "invitation" ||
            selectedCollaboratorTab === "chat"
              ? collaboratorsImage
              : chatImage
          }
          className="project-option-icon"
          onClick={
            selectedCollaboratorTab === "invitation" ||
            selectedCollaboratorTab === "chat"
              ? () => setSelectedCollaboratorTab("collaborators")
              : () => setSelectedCollaboratorTab("chat")
          }
        />
      </div>
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

            {project?.owner === profile?.id + "" && (
              <button
                className="standard-container-button right small "
                onClick={handleWriteMail}
              >
                +
              </button>
            )}
          </div>
        </>
      ) : (
        <Chat />
      )}
    </div>
  );
};
