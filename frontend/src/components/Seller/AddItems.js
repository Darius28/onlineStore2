import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import "./AddItems.css"

export default function AddItems() {
  const [addItem, setAddItem] = useState(true);
  const showAddItemHandler = () => {
    setAddItem((prevState) => !prevState);
  };
  return (
    <div>
      <h1 className="center mt-3 mb-3">Your Inventory</h1>
      <div className="center">
        <Button variant="success" className="mb-3" onClick={showAddItemHandler}>
          Click to add Items
        </Button>
      </div>
      {addItem ? (
        <div className="add-items-form">
          <Form>
            <Row>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Name: </Form.Label>
                <Form.Control type="text" required autoFocus />
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3">
              <Form.Label>Price: </Form.Label>
                <Form.Control type="number" required />
              </Form.Group>
            </Row>
          </Form>
        </div>
      ) : null}
    </div>
  );
}
