import { Project } from "../components/project/Project";

export interface Profile {
  email: string;
  family_name: string;
  given_name: string;
  id: number;
  name: string;
  picture: string;
  verified_email: boolean;
}

export interface DashbordProps {
  profile: Profile;
  logOut: () => void;
  projects: ProjectType[];
  setProjects: (projects: ProjectType[]) => void;
}

export interface ProjectProps {
  project: ProjectType;
}

export interface Profile {
  email: string;
  family_name: string;
  given_name: string;
  id: number;
  name: string;
  picture: string;
  verified_email: boolean;
}

export interface ProjectType {
  project_id?: string;
  title: string;
  description: string;
  tasks?: Task[];
  owner: string;
}

export interface Task {
  title: string;
  time: number;
  state: string;
  assignedTo: "";
}
