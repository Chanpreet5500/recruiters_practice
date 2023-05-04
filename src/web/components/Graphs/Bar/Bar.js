import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "recruitment-components/Button/Button.js";
import SingleSelect from "recruitment-components/SingleSelect/SingleSelect.js";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarGraph = (props) => {
  const { title, data, xKey, yKey, colorCode, durationData, handleDurationChange } = props;
  const [duration, setDuration] = useState(durationData?.length ? durationData[0] : "");

  const handleChange = (id) => {
    setDuration(id);
    handleDurationChange(id);
  }
  return (
    <React.Fragment>
      <div className="cardContainer">
        <div className="statsTitle mb-4">
          <div className="title">
            <label>{props.title}</label>
            <span>{props.totalCount}</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={data}>
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip wrapperStyle={{ top: -150, left: 100 }} />
            <Bar dataKey={yKey} fill={colorCode} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  );
};
export default BarGraph;
