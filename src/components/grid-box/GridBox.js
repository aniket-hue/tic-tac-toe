import "./gridBox.css";
import React from "react";
import { CIRCLE, CROSS } from "../../constants";
import { Cross } from "../cross/cross";
import { Circle } from "../circle/Circle";

export const GridBox = (props) => {
  let filler = null;

  if (props.type === CROSS) {
    filler = <Cross />;
  } else if (props.type === CIRCLE) {
    filler = <Circle />;
  }

  return (
    <>
      <div className="card">
        <div className="fill-box">{filler}</div>
      </div>
    </>
  );
};
