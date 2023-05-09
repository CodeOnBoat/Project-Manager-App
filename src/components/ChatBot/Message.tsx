import React, { useEffect, useRef, useState } from "react";
import { Task } from "../../data/Interfaces";
import { TaskDisplay } from "../Items/SelectedTask/TaskDisplay";
import { renderToString } from "react-dom/server";
import { MessageTask } from "./MessageTask";

export interface MessageProps {
  message: string;
  role: string;
}

export const Message = ({ message, role }: MessageProps) => {
  const messageContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const regexCode = /```([^`]+)```/g;
    const regexB = /\*\*([^`]+)\*\*/g;
    const regexTask = /\[t\]([^`]+)\[t\]/;

    let result = message
      .replace(regexCode, "<code>$1</code>")
      .replace(/\n/g, "<br/>")
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
        role === "user" ? "chatbot-message user" : "chatbot-message bot"
      }
    ></div>
  );
};
