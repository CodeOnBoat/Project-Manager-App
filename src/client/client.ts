import { TokenResponse } from "@react-oauth/google";
import axios from "axios";
import { ProjectType, Task } from "../data/Interfaces";
import { ChatBotRes, MessageType } from "../components/ChatBot/ChatBot";

const root = "https://us-central1-taskwise-14398.cloudfunctions.net/app";
// const root = "http://127.0.0.1:5001/taskwise-14398/us-central1/app";

export const postUser = async (google_id: string, email: string) => {
  axios
    .post(`${root}/users`, {
      google_id: google_id,
      email: email,
    })
};

export const getUser = async (user_id: string) => {
  const res = await axios.get(`${root}/users/${user_id}`);
  return res.data;
};

export const googleLogin = async (user: TokenResponse) => {
  const res = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
    {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        Accept: "application/json",
      },
    }
  );
  postUser(res.data.id, res.data.email);
  return res.data;
};

export const getProjectsById = async (google_id: number) => {
  const res = await axios.get(`${root}/projects/${google_id}`);
  return res.data;
};

export const getTasksByProjectId = async (project_id: string) => {
  const res = await axios.get(`${root}/projects/${project_id}/tasks`);
  return res.data;
};

export const addNewProject = async (newProject: ProjectType) => {
  const res = await axios.post(`${root}/projects`, newProject);
  return res.data;
};

export const addNewProjectWithTasks = async (newProject: ProjectType) => {
  const res = await axios.post(`${root}/projects/ai`, newProject);
  return res.data;
};

export const addTaskToProject = async (project_id: string, task: Task) => {
  const res = await axios.post(`${root}/projects/${project_id}`, {
    title: task.title,
    time: task.time,
    state: task.state,
    assignedTo: task.assignedTo,
    steps: task.steps,
    description: task.description,
  });
  return res.data;
};

export const deleteProjectById = async (project_id: string) => {
  await axios.delete(`${root}/projects/${project_id}`);
};

export const deleteTaskById = async (task_id: string, project_id: string) => {
  axios
    .delete(`${root}/projects/${project_id}/${task_id}`)
    .catch((err) => console.log(err));
};

export const updateTaskStatus = async (
  task_id: string,
  project_id: string,
  status: string,
  collaborator: string
) => {

  const res = await axios.patch(`${root}/projects/${project_id}/${task_id}`, {
    status: status,
    collaborator: collaborator,
  });
  return res.data;
};

export const sendNotification = async (
  sender_username: string,
  collaborator_mail: string,
  project_id: string
) => {
  const o = {
    sender_username: sender_username,
    collaborator_mail: collaborator_mail,
    project_id: project_id,
  };

  const res = await axios.patch(`${root}/sendnotification`, o);
  return res.data;
};

export const getNotifications = async (user_id: string) => {
  const res = await axios.get(`${root}/users/${user_id}/notifications`);
  return res.data;
};

export const addCollaborator = async (
  project_id: string,
  collaborator_id: string
) => {
  const res = await axios.patch(
    `${root}/projects/${project_id}/users/${collaborator_id}`,
    {
      project_id: project_id,
      collaborator_id: collaborator_id,
    }
  );
};

export const resolveNotification = async (
  project_id: string,
  user_id: string,
  action: string,
  user_name: string
) => {
  const res = await axios.post(
    `${root}/users/${user_id}/notifications/${project_id}`,
    {
      action: action,
      user_name: user_name,
    }
  );
  return res.data;
};

export const changeCompletionOfStep = async (
  projectId: string,
  taskId: string,
  stepTitle: string
) => {
  const res = await axios.patch(
    `${root}/projects/${projectId}/${taskId}/${stepTitle}`
  );
  return res.data;
};

export const chatWithProjectAssistent = async (
  message: string,
  project: ProjectType,
  messageHistory: MessageType[]
): Promise<ChatBotRes> => {
  try {
    const res = await axios.post(`${root}/projects/chatbox`, {
      message: message,
      project: project,
      messageHistory: messageHistory,
    });
    if (res.status !== 200) {
      return res.data;
    } else {
      return {
        message: "Something went wrong. Please try again",
        suggestions: [],
      };
    }
  } catch (e) {
    return {
      message: "Something went wrong. Please try again",
      suggestions: [],
    };
  }
};

export const updateProjectInfo = async (
  project_id: string,
  projectTitle: string,
  projectDescription: string
) => {
  const res = await axios.patch(`${root}/projects/${project_id}`, {
    title: projectTitle,
    description: projectDescription,
  });
  return res.data;
};
