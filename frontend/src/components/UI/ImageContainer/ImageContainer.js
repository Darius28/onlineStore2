import React from "react";
import Carousel from "react-bootstrap/Carousel";

export default function ImageContainer(props) {
  return (
    <Carousel.Item>
      <img className="d-block w-100" src={props.src} alt="First slide" />
    </Carousel.Item>
  );
}
