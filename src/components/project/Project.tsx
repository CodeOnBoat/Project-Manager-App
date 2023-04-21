import React, { useEffect } from "react";
import { ProjectProps, Task } from "../../data/Interfaces";
import { addTaskToProject } from "../../client/client";
import { OneTask } from "./OneTask";

export const Project = ({ project }: ProjectProps) => {
  useEffect(() => {
    console.log(project);
  }, []);

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTask: Task = {
      title: formData.get("title") as string,
      time: parseInt(formData.get("time") as string),
      assignedTo: "",
      state: "notstarted",
    };
    addTaskToProject(project.project_id!, newTask);
  };

  return (
    <div>
      {project.title}
      {project.description}
      {project.owner}
      {project.tasks!.map((t) => {
        return <OneTask task={t} />;
      })}
      <h1>New task</h1>
      <form onSubmit={addTask}>
        <label>title</label>
        <input type="text" name="title" />
        <label>time (hours)</label>
        <input type="number" name="time" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
