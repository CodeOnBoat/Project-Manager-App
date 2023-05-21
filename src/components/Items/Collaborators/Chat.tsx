import React, { useContext, useEffect, useRef, useState } from "react";
import { realTimeUpdates, writeNewPost } from "../../../firebase/chatFunctions";
import { ProjectContext } from "../../../context/ProjectContext";
import { Message } from "../../ChatBot/Message";
import SendIcon from "../../../data/images/send.png";
import { AppContext } from "../../../context/AppContext";
import { CollaboratorChatMessage } from "../../../data/Interfaces";

export const Chat = () => {
  const { project } = useContext(ProjectContext);
  const { profile, darkMode } = useContext(AppContext);
  const chatRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const { currentConversation, setCurrentConversation } =
    useContext(ProjectContext);

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

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [currentConversation]);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleChatSend();
    }
  };

  return (
    <>
      <div className="chatbot-message-container" ref={chatContainerRef}>
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
          onKeyDown={handleKeyDown}
        />
        <img
          src={SendIcon}
          className={`chatbot-send-icon ${darkMode}`}
          onClick={handleChatSend}
        />
      </div>
    </>
  );
};
