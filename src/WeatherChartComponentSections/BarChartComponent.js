import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomToolTip";
const BarChartComponent = ({
  chartData,
  yAxisDomain,
  selectedUnit,
  selectedParameter,
}) => {
  const [width, setWidth] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setScreenWidth]);

  useEffect(() => {
    if (screenWidth < 400) {
      setWidth(320);
    } else if (screenWidth < 600 && screenWidth > 400) {
      setWidth(400);
    } else {
      setWidth(600);
    }
  }, [screenWidth]);
  return (
    <>
      <BarChart
        width={width}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: screenWidth < 600 ? -30 : -20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis domain={yAxisDomain} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={<CustomTooltip selectedUnit={selectedUnit} />} />
        <Legend />
        {selectedParameter === "temperature" && (
          <Bar dataKey="temperature" fill="#8884d8" />
        )}
        {selectedParameter === "humidity" && (
          <Bar dataKey="humidity" fill="#82ca9d" />
        )}
        {selectedParameter === "windspeed" && (
          <Bar dataKey="windspeed" fill="#ffc658" />
        )}
      </BarChart>
    </>
  );
};

export default BarChartComponent;
