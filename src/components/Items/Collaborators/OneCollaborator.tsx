import React from "react";
import { CollaboratorType } from "../../../data/Interfaces";

export interface OneCollaboratorProps {
  collaborator: CollaboratorType;
}

export const OneCollaborator = ({ collaborator }: OneCollaboratorProps) => {
  return (
    <div className="list task-container">
      {<div className="task-title">{collaborator.user_name}</div>}
    </div>
  );
};
