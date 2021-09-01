import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import "./ReviewModal.css";
import Card from "../UI/Card/Card";
import ReactStars from "react-rating-stars-component";
import { Form, Col, Button } from "react-bootstrap";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onCloseModal}></div>;
};

const Modal = (props) => {
  const [rating, setRating] = useState();
  const reviewRef = useRef();

  const ratingHandler = (newRating) => {
    setRating(newRating);
  };

  const submitRatingHandler = (e) => {
    e.preventDefault();
    try {
      const review = reviewRef.current.value;
      console.log(review, rating);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="modal">
      <h3 className="center mt-3 mb-3">Review {props.name}</h3>
      <Form onSubmit={submitRatingHandler} className="form-container">
        <Form.Group as={Col} className="mb-3 rating-star-container">
          <Form.Label>Select your Rating:</Form.Label>
          <div className="rating-star">
            <ReactStars
              count={5}
              onChange={ratingHandler}
              size={36}
              activeColor="#ffd700"
            />
          </div>
        </Form.Group>
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Review :</Form.Label>
          <Form.Control as="textarea" ref={reviewRef} />
        </Form.Group>
        <div className="center mb-3">
          <Button type="submit" variant="success">
            Submit Review
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default function ReviewModal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCloseModal={props.onCloseModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Modal name={props.name} />,
        document.getElementById("modal-root")
      )}
    </>
  );
}
