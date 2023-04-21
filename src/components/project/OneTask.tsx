import React from "react";
import { Task } from "../../data/Interfaces";

export interface OneTaskProps {
  task: Task;
}

export const OneTask = ({ task }: OneTaskProps) => {
  return <div>{task.title}</div>;
};
