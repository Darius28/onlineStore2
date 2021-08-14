import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  NavDropdown,
  Button,
  Image,
} from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./Navbar.css";
import UserModal from "../UI/UserModal/UserModal";
import { Context } from "../../context";
import { toast } from "react-toastify";
import axios from "axios";
import { BackendUrl } from "../../utils/BackendUrl";

const HeaderBar = () => {
  const { state, dispatch } = useContext(Context);
  const { user, showModal } = state;

  const showLoginModalHandler = () => {
    dispatch({
      type: "MODAL_STATUS",
      payload: "login",
    });
  };

  const showSignupModalHandler = () => {
    dispatch({
      type: "MODAL_STATUS",
      payload: "signup",
    });
  };

  const logoutHandler = async () => {
    try {
      dispatch({
        type: "LOGOUT",
      });
      localStorage.removeItem("user");
      const { data } = await axios.post(`${BackendUrl}/logout`);
      toast.success("Logout Successful.");
    } catch (err) {
      console.log(err);
      toast(err.response.data);
    }
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container className="justify-content-space-between">
          <div className="d-flex">
            <Navbar.Brand href="#home">Online Store</Navbar.Brand>
          </div>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="What are you looking for today?"
              className="mr-2 navbar-search"
              aria-label="Search"
            />
            <Button variant="outline-primary">Search</Button>
          </Form>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center flex-grow-0"
          >
            <Nav className="d-flex navbar-right-nav-container">
              <Link to="/" className="text-decoration-none">
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Nav.Link>Link</Nav.Link>
              <NavDropdown
                title={<PersonCircle size={32} />}
                id="basic-nav-dropdown"
              >
                {user ? (
                  <>
                    <NavDropdown.Item>
                      <Link to="/user/profile" className="navbar-link">
                        My Profile
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Button variant="danger" onClick={logoutHandler}>
                        Logout
                      </Button>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/become-seller" className="navbar-link">
                        Become a Seller
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                    <NavDropdown.Item>Wishlist</NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item onClick={showLoginModalHandler}>
                      Login
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={showSignupModalHandler}>
                      Signup
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
              {/* <Image
                src={randomImg1}
                className="navbar-profile-image"
                roundedCircle
              /> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showModal && <UserModal />}
    </div>
  );
};

export default HeaderBar;
