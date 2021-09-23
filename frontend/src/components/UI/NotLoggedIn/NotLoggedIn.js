import React from "react";
import "./NotLoggedIn.css";
import ReactDOM from "react-dom";
import Card from "../Card/Card";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onCloseModal}></div>;
};

const Modal = (props) => {
  return (
    <Card className="modal card-sm-2">
      <h2 className="center mt-4 mb-4">You are not logged in</h2>
      <div className="center mt-4 mb-4">
        <h5>
          Go back to Home page and <span className="underline">Login</span>, or{" "}
          <span className="underline">Signup</span> if you don't have an
          account, from the <span className="underline">Navbar</span>.
        </h5>
      </div>
      <div className="center">
        <Link to="/">
          <Button variant="success">Back to Homepage</Button>
        </Link>
      </div>
    </Card>
  );
};

export default function NotLoggedIn(props) {
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
