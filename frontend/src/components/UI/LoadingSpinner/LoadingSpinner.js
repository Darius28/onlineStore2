import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoadingSpinner() {
  return (
    <div className="center">
      <Spinner animation="border" className="spinner-lg" variant="primary" />
    </div>
  );
}
