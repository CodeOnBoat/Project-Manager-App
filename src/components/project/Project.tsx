import React, { useContext, useEffect, useState } from "react";
import { ProjectProps, Task } from "../../data/Interfaces";
import {
  addTaskToProject,
  deleteProjectById,
  deleteTaskById,
  getTasksByProjectId,
} from "../../client/client";
import { OneTask } from "./OneTask";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { Stats } from "../Stats/Stats";

export const Project = ({ project }: ProjectProps) => {
  const { setProjects, projects } = useContext(AppContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTasks = async () => {
      const taskArray = await getTasksByProjectId(project.project_id!);
      setTasks(taskArray);
    };
    getTasks();
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
    const updateTasks = async () => {
      const newT: Task = await addTaskToProject(project.project_id!, newTask);
      setTasks([...tasks, newT]);
    };
    updateTasks();
  };

  const handleDelete = async () => {
    await deleteProjectById(project.project_id!);
    navigate("/dashboard");
  };

  const deleteTask = (taskId: string) => {
    deleteTaskById(taskId, project.project_id!);
    let tempTasks = [...tasks];
    tempTasks = tempTasks.filter((t) => t.taskId != taskId);
    setTasks(tempTasks);
  };

  return (
    <div>
      {project.title}
      {project.description}
      <button className="delete-project-btn" onClick={handleDelete}>
        Delete
      </button>
      {project.owner}
      {tasks.map((t, index) => {
        return (
          <OneTask
            task={t}
            key={index}
            deleteSelf={() => {
              deleteTask(t.taskId!);
            }}
          />
        );
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
