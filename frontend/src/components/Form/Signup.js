import React, { useContext, useRef, useState } from "react";
import { Context } from "../../context";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
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
  const [validated, setValidated] = useState(false);
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
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    try {
      let gender;
      if (document.getElementById("male-radio").checked) {
        gender = "male";
      } else {
        gender = "female";
      }
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const cpassword = cpasswordRef.current.value;
      const dob = dobRef.current.value;
      if (password !== cpassword) {
        toast.error("Passwords don't match.");
        return;
      }
      const { data } = await axios.post(`${BackendUrl}/signup`, {
        name,
        email,
        password,
        dob,
        gender,
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
    <Form noValidate validated={validated} onSubmit={signupHandler}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoFocus
            required
            ref={nameRef}
            type="text"
            placeholder="Name"
          />
          <Form.Control.Feedback type="invalid">
            Please enter your name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            ref={emailRef}
            type="email"
            placeholder="Email"
          />
          <Form.Control.Feedback type="invalid">
            Please enter your email.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            ref={passwordRef}
            placeholder="Password"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            ref={cpasswordRef}
            type="password"
            placeholder="Confirm Password"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please confirm password.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom05">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control ref={dobRef} type="date" required />
          <Form.Control.Feedback type="invalid">
            Please provide your date of birth.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md="6"
          controlId="validationCustom06"
          key={`inline-radio`}
        >
          <Form.Label>Gender </Form.Label>
          <br />
          <Form.Check
            inline
            label="Male"
            name="gender"
            type="radio"
            value="male"
            id="male-radio"
            required
          />
          <Form.Check
            required
            inline
            label="Female"
            name="gender"
            type="radio"
            value="female"
            id="female-radio"
          />
          <Form.Control.Feedback type="invalid">
            Please enter your gender.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <div className="center mb-3">
        <Button type="submit">Sign Up</Button>
      </div>
      <div className="center">
        <p>
          Already a registered user?{" "}
          <span className="navigation-link" onClick={navToLoginHandler}>
            Login
          </span>
        </p>
      </div>
    </Form>
  );
}
