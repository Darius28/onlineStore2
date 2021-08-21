import React, { useState } from "react";
import Card from "../Card/Card";
import ReactDOM from "react-dom";
import "./ImagePreview.css";
import Carousel from "react-bootstrap/Carousel";
import ImageContainer from "../ImageContainer/ImageContainer";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onCloseModal}></div>;
};

const Modal = (props) => {
  const [displayImgUrl, setDisplayImgUrl] = useState(props.images);

  const imageContainer = displayImgUrl.map((image) => {
    return (
      <Carousel.Item>
        <img
          className="d-block"
          height={250}
          width={600}
          src={image}
          alt="First slide"
        />
      </Carousel.Item>
    );
  });

  return (
    <Card className="modal">
      <h1 className="center">Added Images</h1>
      <Carousel>{imageContainer}</Carousel>
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
        <Modal onCloseModal={props.onCloseModal} images={props.images} />,
        document.getElementById("modal-root")
      )}
    </>
  );
}
