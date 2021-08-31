import React from "react";
import ReactDOM from "react-dom";
import "./ReviewModal.css";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onCloseModal}></div>;
};

const Modal = (props) => {
  return (
    <div>
      <h1>Review here!</h1>
    </div>
  );
};

export default function ReviewModal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCloseModal={props.onCloseModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(<Modal />, document.getElementById("modal-root"))}
    </>
  );
}
