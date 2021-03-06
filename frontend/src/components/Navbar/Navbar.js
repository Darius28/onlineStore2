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
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";
import UserModal from "../UI/UserModal/UserModal";
import { Context } from "../../context";
import { toast } from "react-toastify";
import axios from "axios";
import { BackendUrl } from "../../utils/BackendUrl";
import { Cart3 } from "react-bootstrap-icons";

const HeaderBar = () => {
  const { state, dispatch } = useContext(Context);
  const { user, showModal, cartLength } = state;
  const history = useHistory();

  console.log(cartLength);

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
      const LS = JSON.parse(localStorage.getItem("user"));
      const userId = LS._id;
      dispatch({
        type: "LOGOUT",
      });
      localStorage.removeItem("user");
      const { data } = await axios.post(
        `${BackendUrl}/logout`,
        {
          userId,
        },
        { withCredentials: true }
      );
      history.replace("/");
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
            <Link className="navbar-link-2" to="/">
              <Navbar.Brand href="#home">Online Store</Navbar.Brand>
            </Link>
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
              {user ? (
                <Nav.Link className="navbar-cart-posn">
                  <Link to="/cart" className="text-decoration-none navbar-cart">
                    <Cart3 size={24} /> Cart
                    {cartLength ? (
                      <div className="navbar-cart-items-amt">
                        <span style={{ color: "white" }}>{cartLength}</span>
                      </div>
                    ) : null}
                  </Link>
                </Nav.Link>
              ) : null}

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
                      {user.seller === false ? (
                        <Link to="/become-seller" className="navbar-link">
                          Become a Seller
                        </Link>
                      ) : (
                        <Link to="/add-items" className="navbar-link">
                          Your Items
                        </Link>
                      )}
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link className="navbar-link" to="/orders">Orders</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link className="navbar-link" to="/wishlist">Wishlist</Link>
                    </NavDropdown.Item>
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showModal && <UserModal />}
    </div>
  );
};

export default HeaderBar;
