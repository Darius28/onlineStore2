import React from "react";
import "./ReviewContainer.css";
import Badge from "../Badge/Badge";
import { StarFill } from "react-bootstrap-icons";

export default function ReviewContainer({ review }) {
  return (
    <>
      <div className="review-container-2">
        <Badge className="bg-green">
          <span>
            <StarFill /> {review.rating}
          </span>
        </Badge>
        <label className="reviewer-name">{review.reviewer_name}</label>
      </div>
      <div>
        <span>{review.description}</span>
      </div>
    </>
  );
}
