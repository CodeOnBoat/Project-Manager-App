import React from "react";
import { CollaboratorType } from "../../../data/Interfaces";

export interface OneCollaboratorProps {
  collaborator: CollaboratorType;
}

export const OneCollaborator = ({ collaborator }: OneCollaboratorProps) => {
  return <div className="task-container">{collaborator.user_name}</div>;
};
