import React, { useState, useRef, useContext } from "react";
import ReactDOM from "react-dom";
import "./ReviewModal.css";
import Card from "../UI/Card/Card";
import ReactStars from "react-rating-stars-component";
import { Form, Col, Button } from "react-bootstrap";
import axios from "axios";
import { BackendUrl } from "../../utils/BackendUrl";
import { Context } from "../../context";

const Backdrop = (props) => {
  return (
    <div
      className="backdrop"
      onClick={props.onCloseModal.bind(null, false)}
    ></div>
  );
};

const Modal = (props) => {
  const [rating, setRating] = useState();
  const reviewRef = useRef();
  const { state } = useContext(Context);

  const ratingHandler = (newRating) => {
    setRating(newRating);
  };

  const submitRatingHandler = async (e) => {
    e.preventDefault();
    try {
      const review = reviewRef.current.value;
      const userName = state.user.name;
      const { data } = await axios.post(
        `${BackendUrl}/item/${props.itemId}/review-item`,
        {
          review,
          rating,
          name: userName,
        },
        { withCredentials: true }
      );
      console.log("rev posting done");
      props.onCloseModal(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="modal card-sm">
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
        <Modal
          name={props.name}
          itemId={props.itemId}
          onCloseModal={props.onCloseModal}
        />,
        document.getElementById("modal-root")
      )}
    </>
  );
}
