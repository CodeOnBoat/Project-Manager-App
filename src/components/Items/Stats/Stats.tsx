import React from "react";
import "./Stats.css";

export interface StatsProps {
  completedTasks: number;
  effectiveTime: string;
  remainingTasks: number;
  estimatedTime: string;
}

export const Stats = ({
  completedTasks,
  effectiveTime,
  remainingTasks,
  estimatedTime,
}: StatsProps) => {
  return (
    <>
      <div className="standard-container-title">
        <h1>Overall progress</h1>
      </div>
      <div className="stats-one-stat">
        <div className="flex-space-between">
          <label>Completed tasks</label>
          <label>{completedTasks}</label>
        </div>
        <div className="flex-space-between">
          <label>Effective time</label>
          <label>{effectiveTime}</label>
        </div>
      </div>
      <div className="stats-one-stat">
        <div className="flex-space-between">
          <label>Remaining tasks</label>
          <label>{remainingTasks}</label>
        </div>
        <div className="flex-space-between">
          <label>Estimated time</label>
          <label>{estimatedTime}</label>
        </div>
      </div>
    </>
  );
};
