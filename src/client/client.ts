import { TokenResponse } from "@react-oauth/google";
import axios from "axios";
import { ProjectType, Task } from "../data/Interfaces";
import { MessageType } from "../components/ChatBot/ChatBot";

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
    steps: task.steps,
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

  const res = await axios.patch(`${root}/sendnotification`, o);
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
  messageHistory: MessageType[]
): Promise<string> => {
  console.log("message ", message);
  console.log("project ", project);
  console.log("messageHistory ", messageHistory);
  const res = await axios.post(`${root}/projects/chatbox`, {
    message: message,
    project: project,
    messageHistory: messageHistory,
  });
  console.log(res.data);
  return res.data;
};

export const updateProjectInfo = async (
  project_id: string,
  projectTitle: string,
  projectDescription: string
) => {
  console.log("infoooooo ", project_id, projectTitle, projectDescription);
  const res = await axios.patch(`${root}/projects/${project_id}`, {
    title: projectTitle,
    description: projectDescription,
  });
  console.log("dataaaa", res.data);
  return res.data;
};

const sendPrompt = async (
  prompt: string,
  messages: { role: string; content: string }[]
) => {
  const key = "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";
  const client = axios.create({
    headers: { Authorization: "Bearer " + key },
  });
  const res = await client.post("https://api.openai.com/v1/chat/completions", {
    model: "gpt-3.5-turbo",
    messages: [...messages, { role: "user", content: prompt }],
  });
  console.log("received", res);
  return res.data.choices[0].message.content;
};

export const getTasksWithParameters = async (
  title: string,
  description: string
) => {
  const prompt = `You are the api for a task management application.
    Act as a project manager.
    At the end of the prompt you will have the title and a short description of a project that someone wants to make. 
    Your work is the following: 
    1 - Study the subject of the project to be able to provide specific and acurate information. You can 
    2 - Extract usefull documentation and guides of completition of similar projects. Youtube videos, blog posts, etc.
    2 - Generate all the tasks needed to complete the project. These should be between 10 and 15 tasks, depending on the complexity of the project. 
    The tasks should be as specific as possible, and should be ordered in a way that makes sense.
    3 - Your response should be in JSON.
    The json will have this structure:

  {
    tasks : [{
      title : a title of the task,
      description : a description of the task. Should be detailed and give simple structured instructions as a string,
      steps : a list of steps to follow in order the complete the current task. every step looks like this: {
        name : name of the step,
        description : description of the step,
        completed : set by default to false
      }
      time : estimated time it will take to make it,
      state : set by default to 'notstarted',
      taskId : a random uuid,
      emoji : a emoji that relates to the task
    }]
  }

    The data for the current request is delimited by triple angle brackets.
    The title for the current request is <<<${title}>>> and the description is <<<${description}>>>`;

  return JSON.parse(await sendPrompt(prompt, [])).tasks;
};

export const chatWithProjectAssistant2 = async (
  project: ProjectType,
  userInput: string,
  messageHistory: { role: string; content: string }[]
) => {
  const setUp = `You are the api for a task management application.
  Here is a JSON that has all the information about a project that is being developed: ${JSON.stringify(
    project
  )}
  

  I want you to display that you have knowledge about the project he is working on.
  I also want you to be able to answer questions concerning the project, or a particular task or step inside of the project.


  You will also give more details about a specific task if required.
  You will offer advice on the project, apporting creative ideas and providing links with documentation for the user.
  Following this message will come your conversation with the owner of this project.`;
  return await sendPrompt(userInput, [
    { role: "system", content: setUp },
    ...messageHistory,
  ]);

  // If asked, you will provide a new task. When you do so, your reply will be: 'Sure! I have added a new task in your project', followed by the task. this task will be enclosed in [t].
  // Example of task:
  // [t]
  // {
  //   title : a title of the task,
  //   description : a description of the task. Should be detailed and give simple structured instructions as a string,
  //   steps : a list of steps to follow in order the complete the current task. every step looks like this: {
  //     name : name of the step,
  //     description : description of the step,
  //     completed : set by default to false
  //   }
  //   time : estimated time it will take to make it,
  //   state : set by default to 'notstarted',
  //   taskId : a random uuid,
  //   emoji : a emoji that relates to the task
  // }
  // [t]
};
