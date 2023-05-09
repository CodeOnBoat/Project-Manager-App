import React, { useContext, useRef } from "react";
import Logo from "../../data/images/logo.png";
import "./ChatBot.css";
import { useState } from "react";
import { chatWithProjectAssistent } from "../../client/client";
import { ProjectContext } from "../../context/ProjectContext";
import { Gear } from "../Items/Gear/Gear";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
export interface Message {
  role: string;
  content: string;
}
export const ChatBot = () => {
  const { profile } = useContext(AppContext);
  const { project } = useContext(ProjectContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const chatRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `Hello ${profile?.given_name}!,
        How can I assist you with the  "${project?.title}" project?`,
      },
    ]);
  }, [project]);

  const handleChatSend = async () => {
    setLoading(true);
    const newMessages = [
      ...messages,
      { role: "user", content: chatRef.current!.value },
    ];
    setMessages(newMessages);
    const res = await chatWithProjectAssistent(
      chatRef.current!.value,
      project!,
      messages
    );
    setLoading(false);
    chatRef.current!.value = "";
    setMessages([...newMessages, { role: "assistant", content: res }]);
  };
  return (
    <div className="standard-container project-standard-container taller">
      <div className="standard-container-title">
        <h1>Project Assistant</h1>
        {!loading && <img src={Logo} className="header-logo-image smaller" />}
        {loading && <label>Writing...</label>}
      </div>
      <div className="chatbox-message-container">
        {messages.map((m) => {
          return (
            <div
              className={
                m.role === "user" ? "chatbox-message user" : "chatbox-message"
              }
            >
              {m.content}
            </div>
          );
        })}
      </div>
      <input
        ref={chatRef}
        placeholder=""
        type="text"
        className="standard-container-input box chatbox-input"
      />

      <button
        type="submit"
        className="standard-container-button right"
        onClick={handleChatSend}
      >
        SEND
      </button>
    </div>
  );
};
