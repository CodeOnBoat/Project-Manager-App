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

export interface ChatBotRes {
  message: string;
  suggestions: string[];
}

export const ChatBot = ({ loading, setLoading }: props) => {
  const { profile, darkMode } = useContext(AppContext);
  const { project, messages, setMessages, setTags, tags } =
    useContext(ProjectContext);
  const chatRef = useRef<HTMLInputElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const handleChatSend = async () => {
    setTags([]);
    setLoading(true);
    const value = chatRef.current!.value;
    chatRef.current!.value = "";
    const newMessages = [...messages, { role: "user", content: value }];
    setMessages(newMessages);
    const res = await chatWithProjectAssistent(value, project!, messages);
    setLoading(false);
    setTags(res.suggestions);
    setMessages([...newMessages, { role: "assistant", content: res.message }]);
  };
  const handleTagSend = async (value: string) => {
    setTags([]);
    setLoading(true);
    const newMessages = [...messages, { role: "user", content: value }];
    setMessages(newMessages);
    const res = await chatWithProjectAssistent(value, project!, newMessages);
    setLoading(false);
    setTags(res.suggestions);
    setMessages([...newMessages, { role: "assistant", content: res.message }]);
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
            <div className={`dot-pulse ${darkMode}`}></div>
          </div>
        )}
      </div>

      <div className={`chatbot-input-container ${darkMode}`}>
        <div className="tags-container">
          {tags.map((t, index) => {
            return (
              <div
                className="tags"
                key={index}
                onClick={() => handleTagSend(t)}
              >
                {t}
              </div>
            );
          })}
        </div>
        <input
          ref={chatRef}
          placeholder=""
          type="text"
          className={`chatbot-chat-input ${darkMode}`}
          onKeyDown={handleKeyDown}
        />
        <img
          src={SendIcon}
          className={`chatbot-send-icon ${darkMode}`}
          onClick={handleChatSend}
        />
      </div>
    </div>
  );
};
