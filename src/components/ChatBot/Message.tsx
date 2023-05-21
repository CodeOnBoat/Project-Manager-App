import React, { useContext, useEffect, useRef, useState } from "react";
import { Task } from "../../data/Interfaces";
import { TaskDisplay } from "../Items/SelectedTask/TaskDisplay";
import { renderToString } from "react-dom/server";
import { MessageTask } from "./MessageTask";
import { AppContext } from "../../context/AppContext";
import { ProjectContext } from "../../context/ProjectContext";
import { writeNewPost } from "../../firebase/chatFunctions";

export interface MessageProps {
  message: string;
  role: string;
  myUser: string;
}

export const Message = ({ message, role, myUser }: MessageProps) => {
  const messageContainer = useRef<HTMLDivElement>(null);
  const { profile } = useContext(AppContext);
  const { currentConversation, setCurrentConversation, project } =
    useContext(ProjectContext);

  useEffect(() => {
    const regexCode = /```([^`]+)```/g;
    const regexB = /\*\*([^`]+)\*\*/g;
    const regexTask = /\[t\]([^`]+)\[\/t\]/;
    let result = "";
    if (role !== "user" && role !== "assistant" && role != profile?.name) {
      result += `<h4>${role}</h4><br/>`;
    }
    result += message;

    if (regexTask.test(result)) {
      result = result.replace(
        regexTask,
        renderToString(
          <MessageTask task={JSON.parse(regexTask.exec(result)![1])} />
        )
      );
    }

    result = result
      .replace(regexCode, "<code>$1</code>")
      .replace(regexB, "<b>$1</b>")
      .replace(/\n/g, "<br/>")
      .replace(/`([^`]+)`/g, "");

    messageContainer.current!.innerHTML = result;
  }, []);

  const handleChatSend = async () => {
    const newMessages = [
      ...currentConversation,
      { author: `${profile?.name} [assistant]`, body: message },
    ];
    setCurrentConversation(newMessages);
    writeNewPost(`${profile?.name} [assistant]`, message, project?.project_id!);
  };

  return (
    <>
      <div
        ref={messageContainer}
        className={
          role === myUser ? "chatbot-message user" : "chatbot-message bot"
        }
      ></div>
      {role === "assistant" && (
        <label className="send-to-chat-label" onClick={handleChatSend}>
          Send to collaborators
        </label>
      )}
    </>
  );
};
