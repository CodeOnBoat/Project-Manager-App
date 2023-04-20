import { TokenResponse } from "@react-oauth/google";
import axios from "axios";
import { Profile, Project } from "../Iterfaces";

export const postUser = async (google_id: string, email: string) => {
  axios
    .post(`https://us-central1-taskwise-14398.cloudfunctions.net/app/users`, {
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
  const res = await axios.get(
    `https://us-central1-taskwise-14398.cloudfunctions.net/app/projects/${google_id}`
  );
  console.log(res.status, res.data);
  return res.data;
};

export const addNewProject = async (newProject: Project) => {
  axios
    .post(
      `https://us-central1-taskwise-14398.cloudfunctions.net/app/projects`,
      {
        title: newProject.title,
        description: newProject.description,
        owner: newProject.owner,
      }
    )
    .then(function (response) {
      console.log(response.status);
    })
    .catch((err) => console.log(err));
};
