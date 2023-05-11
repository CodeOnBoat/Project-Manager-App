import React, { useContext, useEffect, useRef, useState } from "react";
import { realTimeUpdates, writeNewPost } from "../../../firebase/chatFunctions";
import { ProjectContext } from "../../../context/ProjectContext";
import { Message } from "../../ChatBot/Message";
import SendIcon from "../../../data/images/send.png";
import { AppContext } from "../../../context/AppContext";
import { CollaboratorChatMessage } from "../../../data/Interfaces";

export const Chat = () => {
  const [currentConversation, setCurrentConversation] = useState<
    CollaboratorChatMessage[]
  >([]);
  const { project } = useContext(ProjectContext);
  const { profile } = useContext(AppContext);
  const chatRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleChatSend = async () => {
    setLoading(true);
    const value = chatRef.current!.value;
    chatRef.current!.value = "";
    const newMessages = [
      ...currentConversation,
      { author: profile?.name!, body: value },
    ];
    setCurrentConversation(newMessages);
    writeNewPost(profile?.name!, value, project?.project_id!);
    console.log(currentConversation);
  };

  useEffect(() => {
    if (project) {
      realTimeUpdates(
        project?.project_id!,
        currentConversation!,
        setCurrentConversation
      );
    }
  }, [project]);

  return (
    <>
      <div className="chatbot-message-container">
        {currentConversation.map((m) => {
          return (
            <Message message={m.body} role={m.author} myUser={profile?.name!} />
          );
        })}
      </div>
      <div className="chatbot-input-container">
        <input
          ref={chatRef}
          placeholder=""
          type="text"
          className="chatbot-chat-input"
        />
        <img
          src={SendIcon}
          className="chatbot-send-icon"
          onClick={handleChatSend}
        />
      </div>
    </>
  );
};
