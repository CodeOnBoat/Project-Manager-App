import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBJ-JM4dOzq5cQfnSp4CPm-RuxkTxUjIiw",
  authDomain: "taskwise-14398.firebaseapp.com",
  projectId: "taskwise-14398",
  storageBucket: "taskwise-14398.appspot.com",
  messagingSenderId: "539505487562",
  appId: "1:539505487562:web:d6e158c8196741e464ce33",
  measurementId: "G-49PFWPFE3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);