import React, { useContext, useEffect, useState, useRef } from "react";
import "./BecomeSeller.css";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { Context } from "../../context";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { BackendUrl } from "../../utils/BackendUrl";

export default function BecomeSeller() {
  const { state, dispatch } = useContext(Context);
  const [details, setDetails] = useState();
  const [userAge, setUserAge] = useState();
  const { user } = state;
  const history = useHistory();
  const shopNameRef = useRef();

  useEffect(() => {
    if (user) {
      setDetails(user);
      if (user.gender === "male") {
        document.getElementById("male-radio").checked = true;
      } else {
        document.getElementById("female-radio").checked = true;
      }
      const today = new Date();
      const date = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const dobUser = user.dob.split("-", 3);
      const dobYear = +dobUser[0];
      const dobMonth = +dobUser[1];
      const dobDate = +dobUser[2].split("T", 1)[0];

      let age = year - dobYear;
      if (age !== 0) {
        if (dobMonth === month) {
          if (date < dobDate) {
            age = age - 1;
          }
        }
        if (dobMonth > month) {
          age = age - 1;
        }
      }
      setUserAge(age);
    }
  }, [user, userAge]);

  const becomeSellerHandler = async () => {
    try {
      const shop = shopNameRef.current.value;
      const { data } = await axios.post(
        `${BackendUrl}/become-seller`,
        {
          email: user.email,
          shop,
        },
        {
          withCredentials: true,
        }
      );
      const oldLSData = JSON.parse(localStorage.getItem("user"));
      const newLSData = { ...oldLSData, seller: true };
      console.log(state);
      localStorage.setItem("user", JSON.stringify(newLSData));
      dispatch({
        type: "BECOME_SELLER",
      });
      history.replace("/add-items");
      toast.success("Congrats! You can start adding items to sell now.");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };
  return (
    <div className="seller-container">
      <div className="seller-header">
        <h1 className="center">Become a Seller</h1>
        <div className="become-seller-form">
          <Form>
            <Row>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  autoFocus
                  placeholder="Name"
                  value={details ? details.name : null}
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Age: </Form.Label>
                <Form.Control
                  type="number"
                  value={userAge !== undefined ? userAge : null}
                  disabled
                ></Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Gender: </Form.Label>
                <div className="seller-gender-radio">
                  <Form.Check
                    type="radio"
                    id="male-radio"
                    name="gender"
                    label="Male"
                    value="male"
                    disabled
                  />
                  <Form.Check
                    disabled
                    type="radio"
                    id="female-radio"
                    name="gender"
                    label="Female"
                    value="female"
                  />
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Email: </Form.Label>
                <Form.Control
                  type="email"
                  value={details ? details.email : null}
                  disabled
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Shop Name: </Form.Label>
                <Form.Control
                  ref={shopNameRef}
                  required
                  type="text"
                ></Form.Control>
              </Form.Group>
            </Row>
          </Form>
        </div>
        <div className="center mb-3">
          <Button variant="success" onClick={becomeSellerHandler}>
            Become a Seller
          </Button>
        </div>
        <h2 className="center">Why become a seller? </h2>
      </div>
      <div className="seller-cards">
        <div>
          <Card className="card-bod">
            <Card.Header as="h5">Online is the future.</Card.Header>
            <Card.Body>
              <Card.Title>
                More people are shopping online than ever!
              </Card.Title>
              <Card.Text>
                Start selling as soon as you register as a seller.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card className="card-bod">
            <Card.Header as="h5">PAN India Orders</Card.Header>
            <Card.Body>
              <Card.Title>
                Anyone all over India can order your products.
              </Card.Title>
              <Card.Text>
                Use our cutting edge data analytics to optimise and maximise
                sales.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card className="card-bod">
            <Card.Header as="h5">Packaging Support</Card.Header>
            <Card.Body>
              <Card.Title>
                We provide world class packaging and shipping solutions.
              </Card.Title>
              <Card.Text>
                Leeave it to our logistics partners to deliver products on time,
                without damages.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card className="card-bod">
            <Card.Header as="h5">No cap on earning!</Card.Header>
            <Card.Body>
              <Card.Title>The more you sell, the more you make!</Card.Title>
              <Card.Text>
                We also provide all the latest and hassle free payment options
                for your peace of mind!
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
