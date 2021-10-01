import React from "react";
import ReactDOM from "react-dom";
import "./LoadingScreen.css";
import { Spinner } from "react-bootstrap";

const Backdrop = () => {
  return <div className="backdrop"></div>;
};

const Modal = () => {
  return (
    <div className="center spinner-bg">
      <Spinner animation="border" className="spinner-lg loading-spinner" variant="primary" />
    </div>
  );
};

export default function LoadingScreen() {
  return (
    <div>
      {ReactDOM.createPortal(<Modal />, document.getElementById("modal-root"))}
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
    </div>
  );
}
