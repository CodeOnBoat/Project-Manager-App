import React, { useContext, useEffect, useState } from "react";
import { ProjectProps, Task } from "../../../data/Interfaces";
import {
  addTaskToProject,
  deleteProjectById,
  deleteTaskById,
  getTasksByProjectId,
  updateTaskStatus,
} from "../../../client/client";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { OneTask } from "./OneTask";
import "./Project.css";
import { Collaborators } from "../../Items/Collaborators/Collaborators";
import { ProjectInfo } from "../../Items/ProjectInfo/ProjectInfo";
import { Todo } from "../../Items/ToDo/Todo";
import { SelectedTaskTab } from "../../Items/SelectedTask/SelectedTaskTab";
import { FinishedTasks } from "../../Items/FinishedTasks/FinishedTasks";

export const Project = ({ project }: ProjectProps) => {
  const { setProjects, projects } = useContext(AppContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [showNewTask, setShowNewTask] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getTasks = async () => {
      const taskArray = await getTasksByProjectId(project.project_id!);
      setTasks(taskArray);
    };
    getTasks();
  }, []);

  const modifyTaskStatus = (taskId: string, state: string) => {
    let tempTasks = [...tasks];
    tempTasks.forEach((t) => {
      if (t.taskId === taskId) {
        t.state = state;
      }
    });
    setTasks(tempTasks);
  };

  const handleDelete = async () => {
    await deleteProjectById(project.project_id!);
    navigate("/dashboard");
  };

  return (
    <div className="project-page-container">
      <ProjectInfo
        title={project.title}
        description={project.description}
        deleteProject={handleDelete}
      />
      <Collaborators />
      <Todo
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        tasks={tasks.filter(
          (t) => t.state === "notstarted" || t.state === "inprogress"
        )}
        setTasks={setTasks}
        project={project}
        setShowNewTask={setShowNewTask}
      />
      <SelectedTaskTab
        setShowNewTask={setShowNewTask}
        updateTaskState={(status: string) => {
          modifyTaskStatus(
            tasks.filter((t) => t.taskId === selectedTask)[0]?.taskId || "",
            status
          );
        }}
        project={project}
        task={tasks.filter((t) => t.taskId === selectedTask)[0]}
        tasks={tasks}
        setTasks={setTasks}
        showNewTask={showNewTask}
      />
      <FinishedTasks
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        tasks={tasks.filter((t) => t.state === "finished")}
        setTasks={setTasks}
        project={project}
      />
    </div>
  );
};
