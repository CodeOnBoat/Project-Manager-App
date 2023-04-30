import { createContext, useState, useEffect } from "react";
import { ProjectType, Task } from "../data/Interfaces";
import { log } from "console";

type ProjectContextType = {
  tasks: Task[];
  setTasks: (task: Task[]) => void;
  project: ProjectType | undefined;
  setProject: (project: ProjectType) => void;
};

const initialValue: ProjectContextType = {
  tasks: [],
  setTasks: (task: Task[]) => {},
  project: undefined,
  setProject: (project: ProjectType) => {},
};

export const ProjectContext = createContext(initialValue);

export const ProjectContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [project, setProject] = useState<ProjectType>();

  return (
    <ProjectContext.Provider
      value={{
        tasks,
        setTasks,
        project,
        setProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
