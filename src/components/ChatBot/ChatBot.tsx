import React, { useContext, useEffect, useRef, useState } from "react";
import LogoSmall from "../../data/images/logoSmall.png";
import "./ChatBot.css";
import { chatWithProjectAssistent } from "../../client/client";
import { ProjectContext } from "../../context/ProjectContext";
import { AppContext } from "../../context/AppContext";
import SendIcon from "../../data/images/send.png";
import { Message } from "./Message";
export interface MessageType {
  role: string;
  content: string;
}
interface props {
  loading: boolean;
  setLoading: (b: boolean) => void;
}

export const ChatBot = ({ loading, setLoading }: props) => {
  const { profile } = useContext(AppContext);
  const { project, messages, setMessages } = useContext(ProjectContext);
  const chatRef = useRef<HTMLInputElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

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
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleChatSend();
    }
  };

  return (
    <div className="standard-container project-standard-container taller">
      <div className="standard-container-title">
        <h1>Project Assistant</h1>
        {!loading && (
          <img src={LogoSmall} className="header-logo-image smaller " />
        )}
      </div>
      <div className="chatbot-message-container" ref={messageContainerRef}>
        {messages.map((m) => {
          return (
            <>
              <Message message={m.content} role={m.role} myUser="user" />
            </>
          );
        })}
        {loading && (
          <div className="dot-pulse-container">
            <div className="dot-pulse"></div>
          </div>
        )}
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
          className="chatbot-send-icon"
          onClick={handleChatSend}
        />
      </div>
    </div>
  );
};
