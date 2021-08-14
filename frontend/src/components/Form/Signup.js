import React, { useContext, useRef } from "react";
import { Context } from "../../context";
import { Form, Button, Row, Col } from "react-bootstrap";
import FloatingLabel from "react-bootstrap-floating-label";
import axios from "axios";
import { toast } from "react-toastify";
import { BackendUrl } from "../../utils/BackendUrl";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cpasswordRef = useRef();
  const dobRef = useRef();
  const genderRef = useRef();
  const { dispatch } = useContext(Context);
  const navToLoginHandler = () => {
    dispatch({
      type: "MODAL_STATUS",
    });
    dispatch({
      type: "MODAL_STATUS",
      payload: "login",
    });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const cpassword = cpasswordRef.current.value;
      if (password !== cpassword) {
        toast.error("Passwords don't match.");
        return;
      }
      const { data } = await axios.post(`${BackendUrl}/signup`, {
        name,
        email,
        password,
      });
      if (data.ok) {
        toast.success("Signup successful. Login to proceed");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  return (
    <Form>
      <Row>
        <Col>
          <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-3"
          >
            <Form.Control type="text" ref={nameRef} required />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3"
          >
            <Form.Control required ref={emailRef} type="email" />
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingLabel
            controlId="floatingInput"
            label="Password"
            className="mb-3"
          >
            <Form.Control required ref={passwordRef} type="password" />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel
            controlId="floatingInput"
            label="Confirm Password"
            className="mb-3"
          >
            <Form.Control required="true" ref={cpasswordRef} type="password" />
          </FloatingLabel>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Date of Birth: </Form.Label>
            <Form.Control
              required
              ref={dobRef}
              type="date"
              placeholder="Date of Birth"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Gender: </Form.Label>
            <div className="seller-gender-radio">
              <Form.Check
                required
                type="radio"
                id="default-radio"
                name="gender"
                label="Male"
                value="male"
                ref={genderRef}
              />
              <Form.Check
                required
                type="radio"
                id="default-radio"
                name="gender"
                label="Female"
                value="female"
                ref={genderRef}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>

      <div className="center">
        <p>
          Already a registered user?{" "}
          <span className="navigation-link" onClick={navToLoginHandler}>
            Login
          </span>
        </p>
      </div>
      <div className="center">
        <Button variant="primary" type="submit" onClick={signupHandler}>
          Sign Up
        </Button>
      </div>
    </Form>
  );
}
