import { createContext, useState, useEffect } from "react";
import { ProjectType, Task } from "../data/Interfaces";
import { log } from "console";
import { MessageType } from "../components/ChatBot/ChatBot";

type ProjectContextType = {
  tasks: Task[];
  setTasks: (task: Task[]) => void;
  project: ProjectType | undefined;
  setProject: (project: ProjectType) => void;
  messages: MessageType[];
  setMessages: (messages: MessageType[]) => void;
};

const initialValue: ProjectContextType = {
  tasks: [],
  setTasks: (task: Task[]) => {},
  project: undefined,
  setProject: (project: ProjectType) => {},
  messages: [],
  setMessages: (messages: MessageType[]) => {},
};

export const ProjectContext = createContext(initialValue);

export const ProjectContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [project, setProject] = useState<ProjectType>();
  const [messages, setMessages] = useState<MessageType[]>([]);

  return (
    <ProjectContext.Provider
      value={{
        tasks,
        setTasks,
        project,
        setProject,
        messages,
        setMessages,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
