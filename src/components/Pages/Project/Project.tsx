import React, { useContext, useEffect, useState } from "react";
import { ProjectProps, Task } from "../../../data/Interfaces";
import { deleteProjectById, getTasksByProjectId } from "../../../client/client";
import { useNavigate } from "react-router-dom";
import "./Project.css";
import { Collaborators } from "../../Items/Collaborators/Collaborators";
import { ProjectInfo } from "../../Items/ProjectInfo/ProjectInfo";
import { Todo } from "../../Items/ToDo/Todo";
import { SelectedTaskTab } from "../../Items/SelectedTask/SelectedTaskTab";
import { FinishedTasks } from "../../Items/FinishedTasks/FinishedTasks";
import { ProjectContext } from "../../../context/ProjectContext";
import { ChatBot } from "../../ChatBot/ChatBot";

export const Project = ({ project }: ProjectProps) => {
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [showNewTask, setShowNewTask] = useState(false);
  const [tasksLoading, setTasksLoading] = useState(true);

  const { setTasks, tasks, setProject } = useContext(ProjectContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedTask !== "") {
      setShowNewTask(false);
    }
  }, [selectedTask]);

  useEffect(() => {
    if (showNewTask) {
      setSelectedTask("");
    }
  }, [showNewTask]);

  useEffect(() => {
    const getTasks = async () => {
      const taskArray = await getTasksByProjectId(project.project_id!);
      setTasks(taskArray);
      setTasksLoading(false);
    };
    getTasks();
    setProject(project);
  }, []);

  const modifyTaskStatus = (
    taskId: string,
    state: string,
    collaborator: string
  ) => {
    let tempTasks = [...tasks];
    tempTasks.forEach((t) => {
      if (t.taskId === taskId) {
        t.state = state;
        t.collaborator = collaborator;
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
      <Todo
        tasksLoading={tasksLoading}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        setShowNewTask={setShowNewTask}
      />
      <SelectedTaskTab
        setShowNewTask={setShowNewTask}
        updateTaskState={(status: string, collaborator: string) => {
          modifyTaskStatus(
            tasks.filter((t) => t.taskId === selectedTask)[0].taskId || "",
            status,
            collaborator
          );
        }}
        task={tasks.filter((t) => t.taskId === selectedTask)[0]}
        showNewTask={showNewTask}
      />
      <FinishedTasks
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
      />
      <ProjectInfo
        title={project.title}
        description={project.description}
        deleteProject={handleDelete}
      />
      <Collaborators />
      <ChatBot />
    </div>
  );
};
