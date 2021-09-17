import React from "react";
import "./OrderSuccess.css";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";

export default function OrderSuccess() {
  const history = useHistory();
  const homeHandler = () => {
    history.push("/");
  };
  return (
    <div className="success-div">
      <h1 className="center">Your order has been placed Successfully!</h1>
      <h3>Check your email for order summary!</h3>
      <Button variant="primary" size="lg" onClick={homeHandler}>
        Continue Shopping
      </Button>
    </div>
  );
}
