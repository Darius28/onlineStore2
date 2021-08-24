import React, { useState } from "react";
import Card from "../Card/Card";
import ReactDOM from "react-dom";
import "./ImagePreview.css";
import CancelButton from "../Button/CancelButton";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onCloseModal}></div>;
};

const Modal = (props) => {
  const imageContainer = props.images.map((image) => {
    return (
      <>
        <div className="image-container">
          <img className="image-dimensions" src={image.url} />
          <div className="image-delete">
            <CancelButton
              onClick={props.onRemovePicture.bind(null, image.url)}
            />
          </div>
          <div className="image-name">
            <span>{image.imageObj.name}</span>
          </div>
        </div>
      </>
    );
  });

  return (
    <Card className="modal">
      <h1 className="center mt-2">Added Images</h1>
      <div className="image-preview-container">{imageContainer}</div>
    </Card>
  );
};

export default function ImagePreview(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCloseModal={props.onCloseModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Modal
          onCloseModal={props.onCloseModal}
          images={props.images}
          onRemovePicture={props.onRemovePicture}
        />,
        document.getElementById("modal-root")
      )}
    </>
  );
}
