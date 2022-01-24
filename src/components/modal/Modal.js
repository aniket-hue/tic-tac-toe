import React from "react";
import "./modal.css";

export const Modal = (props) => {
  if (props.visible) {
    return (
      <div className="modal-wrapper">
        {props.children}
        <div className="modal-btn-container">
          <button onClick={props.okHandle}>OK</button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
