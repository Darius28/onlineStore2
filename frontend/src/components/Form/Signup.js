import React, { useContext, useRef } from "react";
import { Context } from "../../context";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { BackendUrl } from "../../utils/BackendUrl";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cpasswordRef = useRef();
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
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          required
          ref={nameRef}
          autoFocus
          type="text"
          placeholder="Name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          required
          ref={emailRef}
          type="email"
          placeholder="Email Address"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          required
          ref={passwordRef}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          required
          ref={cpasswordRef}
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Group>
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
