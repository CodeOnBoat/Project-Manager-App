import { Project } from "../components/Pages/Project/Project";

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
  collaborators: CollaboratorType[];
}
export interface CollaboratorType {
  user_id: string;
  user_name: string;
}
export interface Task {
  taskId?: string;
  title: string;
  time: number;
  state: string;
  description: string;
  assignedTo: "";
  emoji: string;
  steps: Step[];
  collaborator : string,
}

export interface Step {
  name: string;
  link: string;
  linkname: string;
  completed: boolean;
}

export interface OneTaskProps {
  task: Task;
  setSelected: (str: string) => void;
}

export interface LandingPageProps {
  profile: Profile | undefined;
  setProfile: Function;
  logOut: () => void;
}

export interface CollaboratorsProps {
  user_id: string;
  project_id: string;
}

export interface NotificationType {
  project_id: string;
  user_id: string;
  projectName: string;
  user_username: string;
}
