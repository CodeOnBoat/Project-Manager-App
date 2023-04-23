import React from "react";
import DonutChart from "react-donut-chart";
import "./Chart.css";

export const ProgressChart = () => {
  const data = [
    {
      label: "",
      value: 12,
    },
    {
      label: "In progress",
      value: 1,
    },
    {
      label: "Not started",
      value: 2,
    },
  ];
  const colors = ["#fff", "rgba(0, 200, 0, 1)", "rgba(0, 0, 0, 1)"];

  return (
    <div>
      {/* <DonutChart
        className="chart"
        colors={colors}
        data={data}
        strokeColor="rgba(0, 0, 0, 0)"
        width={200}
        height={200}
        legend={false}
        interactive={false}
      /> */}
    </div>
  );
};
