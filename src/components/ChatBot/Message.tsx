import React, { useContext, useEffect, useRef, useState } from "react";
import { Task } from "../../data/Interfaces";
import { TaskDisplay } from "../Items/SelectedTask/TaskDisplay";
import { renderToString } from "react-dom/server";
import { MessageTask } from "./MessageTask";
import { AppContext } from "../../context/AppContext";

export interface MessageProps {
  message: string;
  role: string;
  myUser: string;
}

export const Message = ({ message, role, myUser }: MessageProps) => {
  const messageContainer = useRef<HTMLDivElement>(null);
  const { profile } = useContext(AppContext);

  useEffect(() => {
    const regexCode = /```([^`]+)```/g;
    const regexB = /\*\*([^`]+)\*\*/g;
    const regexTask = /\[t\]([^`]+)\[t\]/;
    let result = "";
    if (role !== "user" && role !== "assistant" && role != profile?.name) {
      result += `<h4>${role}</h4>`;
    }
    result += message
      .replace(regexCode, "<code>$1</code>")
      .replace(regexB, "<b>$1</b>")
      .replace(/`([^`]+)`/g, "");

    if (regexTask.test(result)) {
      result = result.replace(
        regexTask,
        renderToString(
          <MessageTask task={JSON.parse(regexTask.exec(result)![1])} />
        )
      );
    }

    messageContainer.current!.innerHTML = result;
  }, []);

  return (
    <div
      ref={messageContainer}
      className={
        role === myUser ? "chatbot-message user" : "chatbot-message bot"
      }
    ></div>
  );
};
