import React from "react";
import { Carousel, Button } from "react-bootstrap";
import "./Home.css";
import { Link } from "react-router-dom";
import AllItems from "../Store/AllItems";

export default function Home() {
  return (
    <div>
      <Carousel className="carousel-container">
        <Carousel.Item>
          <div className="d-block w-100 home-image" alt="First slide" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            <Link to="/product">
              <Button variant="info">Check it out!</Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-block w-100 home-image" alt="First slide" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            <Link to="/product">
              <Button variant="info">Check it out!</Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-block w-100 home-image" alt="First slide" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            <Link to="/product">
              <Button variant="info">Check it out!</Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div>
        <AllItems />
      </div>
    </div>
  );
}
