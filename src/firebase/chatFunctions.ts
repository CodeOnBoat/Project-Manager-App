import { child, get, onValue, push, ref, update } from "firebase/database";
import { database } from "./init";
import { MessageType } from "../components/Items/ChatBot/ChatBot";
import { CollaboratorChatMessage } from "../data/Interfaces";

export const writeNewPost = (
  sender: string,
  body: string,
  projectId: string
) => {
  const postData = {
    author: sender,
    body: body,
  };

  const newPostKey = push(
    child(ref(database), `conversation/${projectId}`)
  ).key;

  const updates: any = {};
  updates[`/conversations/${projectId}/` + newPostKey] = postData;
  return update(ref(database), updates);
};

export const realTimeUpdates = (
  projectId: string,
  currentConversation: CollaboratorChatMessage[],
  setCurrentConversation: (messages: CollaboratorChatMessage[]) => void
) => {
  const conversationRef = ref(database, `/conversations/${projectId}`);
  onValue(conversationRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const cu = Object.values(data) as CollaboratorChatMessage[];
      setCurrentConversation(cu);
    }
  });
};
