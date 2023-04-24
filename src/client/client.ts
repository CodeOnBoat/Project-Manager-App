import { TokenResponse } from "@react-oauth/google";
import axios from "axios";
import { ProjectType, Task } from "../data/Interfaces";

const root = "https://us-central1-taskwise-14398.cloudfunctions.net/app";

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
  console.log(res.status, res.data);
  return res.data;
};

export const getTasksByProjectId = async (project_id: string) => {
  const res = await axios.get(`${root}/projects/${project_id}/tasks`);
  console.log(res.status, res.data);
  return res.data;
};

export const addNewProject = async (newProject: ProjectType) => {
  const res = await axios.post(`${root}/projects`, {
    title: newProject.title,
    description: newProject.description,
    owner: newProject.owner,
  });
  return res.data;
};

export const addTaskToProject = async (project_id: string, task: Task) => {
  console.log(project_id, task);
  const res = await axios.post(`${root}/projects/${project_id}`, {
    title: task.title,
    time: task.time,
    state: task.state,
    assignedTo: task.assignedTo,
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

export const updateTaskStatus = async (task_id: string, project_id: string, status: string) => {
  console.log({ task_id: task_id, project_id: project_id, status: status  });

  const res = await axios.patch(`${root}/projects/${project_id}/${task_id}`, {
  status: status
  })
  console.log(res.status );
  return res.data;
}