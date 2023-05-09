import { TokenResponse } from "@react-oauth/google";
import axios from "axios";
import { ProjectType, Task } from "../data/Interfaces";
import { Message } from "../components/ChatBot/ChatBot";

const root = "https://us-central1-taskwise-14398.cloudfunctions.net/app";
// const root = "http://127.0.0.1:5001/taskwise-14398/us-central1/app";

export const postUser = async (google_id: string, email: string) => {
  axios
    .post(`${root}/users`, {
      google_id: google_id,
      email: email,
    })
    .then(function (response) {
      console.log(response.status);
    })
    .catch((err) => console.log(err));
};

export const getUser = async (user_id: string) => {
  const res = await axios.get(`${root}/users/${user_id}`);
  console.log(res.status, res.data);
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
  console.log(res.status, res.data);
  postUser(res.data.id, res.data.email);
  return res.data;
};

export const getProjectsById = async (google_id: number) => {
  console.log(google_id);
  const res = await axios.get(`${root}/projects/${google_id}`);
  return res.data;
};

export const getTasksByProjectId = async (project_id: string) => {
  const res = await axios.get(`${root}/projects/${project_id}/tasks`);
  console.log(res.status, res.data);
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
  console.log(project_id, task);
  const res = await axios.post(`${root}/projects/${project_id}`, {
    title: task.title,
    time: task.time,
    state: task.state,
    assignedTo: task.assignedTo,
    links: task.steps,
    description: task.description,
  });
  return res.data;
};

export const deleteProjectById = async (project_id: string) => {
  console.log(project_id);
  await axios.delete(`${root}/projects/${project_id}`);
};

export const deleteTaskById = async (task_id: string, project_id: string) => {
  console.log({ task_id: task_id, project_id: project_id });
  axios
    .delete(`${root}/projects/${project_id}/${task_id}`)
    .then(function (response) {
      console.log(response.status);
    })
    .catch((err) => console.log(err));
};

export const updateTaskStatus = async (
  task_id: string,
  project_id: string,
  status: string,
  collaborator: string
) => {
  console.log({ task_id: task_id, project_id: project_id, status: status });

  const res = await axios.patch(`${root}/projects/${project_id}/${task_id}`, {
    status: status,
    collaborator: collaborator,
  });
  console.log(res.status);
  return res.data;
};

export const sendNotification = async (
  sender_username: string,
  collaborator_mail: string,
  project_id: string
) => {
  console.log(sender_username, collaborator_mail, project_id);

  const o = {
    sender_username: sender_username,
    collaborator_mail: collaborator_mail,
    project_id: project_id,
  };

  console.log(o);
  const res = await axios.patch(`${root}/projects/sendnotification`, o);
  console.log(res.status);
  return res.data;
};

export const getNotifications = async (user_id: string) => {
  const res = await axios.get(`${root}/users/${user_id}/notifications`);
  console.log(res.status, "helooooooo ", res.data);
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
  messageHistory: Message[]
): Promise<string> => {
  console.log("message ", message);
  const res = await axios.post(`${root}/projects/chatbox`, {
    message: message,
    project: project,
    messageHistory: messageHistory,
  });
  console.log(res.data);
  return res.data;
};
