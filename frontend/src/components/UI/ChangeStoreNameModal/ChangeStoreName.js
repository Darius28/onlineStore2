import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import "./ChangeStoreName.css";
import Card from "../Card/Card";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { BackendUrl } from "../../../utils/BackendUrl";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onCloseModal}></div>;
};

const Modal = (props) => {
  const newNameRef = useRef();
  const renameStoreHandler = async (e) => {
    e.preventDefault();
    const newStoreName = newNameRef.current.value;
    const { data } = await axios.post(
      `${BackendUrl}/edit-store-name`,
      { newStoreName },
      { withCredentials: true }
    );

    const oldLS = JSON.parse(localStorage.getItem("user"));
    const newLS = { ...oldLS, shop_name: newStoreName };
    console.log(newLS);
    localStorage.setItem("user", JSON.stringify(newLS));
    props.setShowShopNameChange(false);
  };
  return (
    <Card className="modal container pt-3">
      <div className="mb-3 current-name-container">
        <label className="current-name-label">Current Name: </label>
        <span>{props.oldShopName}</span>
      </div>
      <Form onSubmit={renameStoreHandler}>
        <Form.Control
          className="mb-3"
          required
          autoFocus
          ref={newNameRef}
          type="text"
          placeholder="Enter new Store Name"
        />
        <div className="center mb-3">
          <Button type="submit" variant="primary">
            Confirm new Store Name
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default function ChangeStoreName(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCloseModal={props.onCloseModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Modal
          oldShopName={props.oldShopName}
          setShowShopNameChange={props.setShowShopNameChange}
        />,
        document.getElementById("modal-root")
      )}
    </>
  );
}
