import React from "react";
import { Carousel, Button } from "react-bootstrap";
import "./Home.css";
import { Link } from "react-router-dom";
import AllItems from "../Store/AllItems";

export default function Home() {
  return (
    <div>
      <h1 className="center mt-2">Welcome to store!</h1>
      <div>
        <AllItems />
      </div>
    </div>
  );
}
