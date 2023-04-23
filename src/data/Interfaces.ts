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
  logOut: () => void;
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
  taskId?: string;
  title: string;
  time: number;
  state: string;
  assignedTo: "";
}

export interface OneTaskProps {
  task: Task;
  deleteSelf: () => void;
}

export interface LandingPageProps {
  profile: Profile | undefined;
  setProfile: Function;
  logOut: () => void;
}
