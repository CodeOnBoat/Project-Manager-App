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
import { ChatBot, Message } from "../../ChatBot/ChatBot";
import App from "../../../App";
import { AppContext } from "../../../context/AppContext";

export const Project = ({ project }: ProjectProps) => {
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [showNewTask, setShowNewTask] = useState(false);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [home, setHome] = useState(true);


  const { profile } = useContext(AppContext);
  const { setTasks, tasks, setProject, messages, setMessages } = useContext(ProjectContext);

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

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `Hello ${profile?.given_name}!,
        How can I assist you with the  "${project?.title}" project?`,
      },
    ]);
  }, [project]);

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
    <div className="project-page">
      <div className="project-page-menu">
        <label
          className={home ? "option-label selected" : "option-label"}
          onClick={() => setHome(true)}
        >
          Home
        </label>
        <label>|</label>
        <label
          className={home ? "option-label" : "option-label selected"}
          onClick={() => setHome(false)}
        >
          Tasks
        </label>
      </div>
      <div className="project-page-container">
        {home ? (
          <>
            <ProjectInfo
              title={project.title}
              description={project.description}
              deleteProject={handleDelete}
            />
            <Collaborators />
            <ChatBot/>
          </>
        ) : (
          <>
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
                  tasks.filter((t) => t.taskId === selectedTask)[0].taskId ||
                    "",
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
          </>
        )}
      </div>
    </div>
  );
};
