import React from "react";
import "./ReviewContainer.css";
import Badge from "../Badge/Badge";
import { StarFill } from "react-bootstrap-icons";

export default function ReviewContainer({ review }) {
  console.log(review);
  return (
    <>
      <Badge className="bg-green">
        <span>
          <StarFill /> {review.rating}
        </span>
      </Badge>
      <div>
        <span>{review.description}</span>
      </div>
    </>
  );
}
