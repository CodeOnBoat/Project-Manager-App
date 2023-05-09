import React, { useContext, useRef } from "react";
import Logo from "../../data/images/logo.png";
import "./ChatBot.css";
import { useState } from "react";
import { chatWithProjectAssistent } from "../../client/client";
import { ProjectContext } from "../../context/ProjectContext";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import SendIcon from "../../data/images/send.png";
export interface Message {
  role: string;
  content: string;
}
export const ChatBot = () => {
  const { profile } = useContext(AppContext);
  const { project, messages, setMessages } = useContext(ProjectContext);
  const chatRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleChatSend = async () => {
    setLoading(true);
    const value = chatRef.current!.value;
    chatRef.current!.value = "";
    const newMessages = [...messages, { role: "user", content: value }];
    setMessages(newMessages);
    const res = await chatWithProjectAssistent(value, project!, messages);
    setLoading(false);
    setMessages([...newMessages, { role: "assistant", content: res }]);
  };
  return (
    <div className="standard-container project-standard-container taller">
      <div className="standard-container-title">
        <h1>Project Assistant</h1>
        {!loading && <img src={Logo} className="header-logo-image smaller" />}
        {loading && <label>Writing...</label>}
      </div>
      <div className="chatbot-message-container">
        {messages.map((m) => {
          return (
            <div
              className={
                m.role === "user"
                  ? "chatbot-message user"
                  : "chatbot-message bot"
              }
            >
              {m.content}
            </div>
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
    </div>
  );
};
