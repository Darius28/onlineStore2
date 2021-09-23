import React, { useContext } from "react";
import "./UserModal.css";
import ReactDOM from "react-dom";
import { Transition } from "react-transition-group";

import Card from "../Card/Card";
import { Context } from "../../../context";
import Login from "../../Form/Login";
import Signup from "../../Form/Signup";

const Backdrop = () => {
  const { dispatch } = useContext(Context);
  const modalHandler = () => {
    dispatch({
      type: "MODAL_STATUS",
    });
  };
  return <div className="backdrop" onClick={modalHandler}></div>;
};

const Modal = () => {
  const {
    state: { showModal },
  } = useContext(Context);

  const DisplayModal = showModal === "login" ? <Login /> : <Signup />;

  const DisplayModalHeading =
    showModal === "login" ? (
      <h1 className="center">Login to Store</h1>
    ) : (
      <h1 className="center">Sign Up to Store</h1>
    );

  return (
    <Card className="modal card-sm">
      <div className="modal-container">
        {DisplayModalHeading}
        {DisplayModal}
      </div>
    </Card>
  );
};

export default function UserModal() {
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
