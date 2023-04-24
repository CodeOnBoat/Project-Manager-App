import React, { useState, useEffect } from "react";
import "./Chart.css";

interface DonutChartProps {
  total: number;
  completed: number;
  size: number;
  strokeWidth: number;
  fontSize: number;
  fontColor: string;
  trackColor: string;
  progressColor: string;
}

const DonautChart: React.FC<DonutChartProps> = ({
  total,
  completed,
  size,
  strokeWidth,
  fontSize,
  fontColor,
  trackColor,
  progressColor,
}) => {
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressAnimation = () => {
      let progressValue = 0;
      let speedFactor = 0;
      const interval = setInterval(() => {
        speedFactor += 1.5;
        progressValue +=
          ((completed / total) * circumference) / (20 - speedFactor);
        if (progressValue >= (completed / total) * circumference) {
          clearInterval(interval);
          setProgress((completed / total) * circumference);
        } else {
          setProgress(progressValue);
        }
      }, 40);
    };
    progressAnimation();
  }, []);

  const remaining = circumference - progress;

  return (
    <div className="donaut-container">
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${progress} ${remaining}`}
          strokeDashoffset={-circumference / 4}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          fill="none"
          strokeLinecap="round"
          style={{
            transition: "stroke-dasharray 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <text
          x="50%"
          y="50%"
          fontSize={fontSize}
          fill={fontColor}
          dominantBaseline="middle"
          textAnchor="middle"
          wordSpacing="-8px"
        >
          {`${completed} / ${total}`}
        </text>
      </svg>
    </div>
  );
};

export default DonautChart;
