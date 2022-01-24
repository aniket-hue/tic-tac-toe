import React from "react";
import "./stat.css";

export const Stat = (props) => {
  const color = props.color;
  const boxShadow = `0 0 .2rem ${color}`;
  const textShadow = `0 0 .2rem ${color}`;

  return (
    <div
      style={{ boxShadow, textShadow, border: `2px solid ${color}`, color }}
      className="stat-box"
    >
      <p className="title">{props.title}</p>
      <p className="value">{props.value}</p>
    </div>
  );
};
