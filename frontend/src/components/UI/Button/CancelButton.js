import React from "react";
import "./CancelButton.css";

export default function CancelButton(props) {
  return (
    <div className="cancel-button-container" onClick={props.onClick}>
      <p className="cancel-button-text">x</p>
    </div>
  );
}
