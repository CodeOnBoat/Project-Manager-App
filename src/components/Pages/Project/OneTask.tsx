import React, { useContext } from "react";
import { OneTaskProps, Task } from "../../../data/Interfaces";
import { AppContext } from "../../../context/AppContext";
import "./Project.css";

export const OneTask = ({ task, setSelected }: OneTaskProps) => {
  return (
    <div
      className="list task-container"
      onClick={() => setSelected(task.taskId!)}
    >
      <>
        <div className={`task-dot ${task.state}`}></div>
        <div className="task-title">{task.title}</div>
      </>
      <div>{task.emoji}</div>
    </div>
  );
};
