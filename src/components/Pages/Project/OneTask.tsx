import React, { useContext } from "react";
import { OneTaskProps, Task } from "../../../data/Interfaces";
import { AppContext } from "../../../context/AppContext";
import "./Project.css";

export const OneTask = ({ task, setSelected }: OneTaskProps) => {
  return (
    <div
      className="stats-one-stat list task-container"
      onClick={() => setSelected(task.taskId!)}
    >
      <div>{task.title}</div>
      <div>{task.emoji}</div>
    </div>
  );
};
