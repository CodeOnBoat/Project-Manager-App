import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { NotificationType, Profile, ProjectType } from "../data/Interfaces";
import { log } from "console";

type AppContextType = {
  profile: Profile | undefined;
  setProfile: (profile: Profile | undefined) => void;
  projects: ProjectType[] | undefined;
  setProjects: (projects: ProjectType[] | undefined) => void;
  notifications: NotificationType[];
  setNotifications: (notifications: NotificationType[]) => void;
  darkMode: "dark" | "light";
  setDarkMode: Dispatch<SetStateAction<"dark" | "light">>;
};

const initialValue: AppContextType = {
  profile: undefined,
  setProfile: () => {},
  projects: [],
  setProjects: (projects: ProjectType[] | undefined) => {},
  notifications: [],
  setNotifications: () => {},
  darkMode: "dark",
  setDarkMode: () => {},
};

export const AppContext = createContext(initialValue);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [profile, setProfile] = useState<Profile | undefined>();
  const [projects, setProjects] = useState<ProjectType[] | undefined>([]);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [darkMode, setDarkMode] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    const storedProjects = localStorage.getItem("projects");
    console.log({ profile: storedProfile, project: storedProjects });
    if (
      storedProfile &&
      storedProjects &&
      storedProfile !== "undefined" &&
      storedProjects !== "undefined"
    ) {
      setProfile(JSON.parse(storedProfile!));
      setProjects(JSON.parse(storedProjects!));
    }
  }, []);

  const setProf = (profile: Profile | undefined) => {
    setProfile(profile);
    localStorage.setItem("profile", JSON.stringify(profile));
  };

  const setProj = (projects: ProjectType[] | undefined) => {
    setProjects(projects);
    localStorage.setItem("projects", JSON.stringify(projects));
  };

  return (
    <AppContext.Provider
      value={{
        profile: profile,
        setProfile: setProf,
        projects: projects,
        setProjects: setProj,
        notifications: notifications,
        setNotifications: setNotifications,
        darkMode: darkMode,
        setDarkMode: setDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
