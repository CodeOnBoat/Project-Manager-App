import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBJ-JM4dOzq5cQfnSp4CPm-RuxkTxUjIiw",
  authDomain: "taskwise-14398.firebaseapp.com",
  databaseURL: "https://taskwise-14398-default-rtdb.firebaseio.com",
  projectId: "taskwise-14398",
  storageBucket: "taskwise-14398.appspot.com",
  messagingSenderId: "539505487562",
  appId: "1:539505487562:web:d6e158c8196741e464ce33",
  measurementId: "G-49PFWPFE3J",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
