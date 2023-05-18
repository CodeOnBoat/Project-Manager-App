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
import { ChatBot, MessageType } from "../../ChatBot/ChatBot";
import App from "../../../App";
import { AppContext } from "../../../context/AppContext";
import e from "express";

export const Project = ({ project }: ProjectProps) => {
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [showNewTask, setShowNewTask] = useState(false);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [home, setHome] = useState(true);
  const [loading, setLoading] = useState(false);

  const { profile } = useContext(AppContext);
  const { setTasks, tasks, setProject, messages, setMessages } =
    useContext(ProjectContext);

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

  const getTasks = async () => {
    const taskArray = await getTasksByProjectId(project.project_id!);
    setTasks(taskArray);
    setTasksLoading(false);
  };

  useEffect(() => {
    const inverval = setInterval(getTasks, 100000);
    getTasks();
    setProject(project);
    return () => clearInterval(inverval);
  }, []);

  useEffect(() => {
    // setMessages([
    //   {
    //     role: "assistant",
    //     content: `Hello ${profile?.given_name}!,
    //     If you have any questions about the project as a whole, a specific task or step, or need advice or creative ideas, feel free to ask.
    //     I can also assist you in adding new tasks to your project.
    //     Just tell me what you need.`,
    //   },
    // ]);
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
              id={project.project_id!}
              deleteProject={handleDelete}
            />
            <Collaborators />
            <ChatBot setLoading={setLoading} loading={loading} />
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
              setLoading={setLoading}
              setHome={setHome}
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
