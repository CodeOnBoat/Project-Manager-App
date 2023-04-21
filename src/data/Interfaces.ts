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
}

interface ProjectProps {
  project : Project
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

export interface Project {
  title: string;
  description: string;
  tasks?: Task[];
  owner: string;
}

export interface Task {
  title: string;
  description: string;
  time: number;
  state: string;
}