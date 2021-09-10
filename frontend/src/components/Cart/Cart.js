import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context";
import "./Cart.css";
import axios from "axios";
import { BackendUrl } from "../../utils/BackendUrl";
import { Card, Button } from "react-bootstrap";
import Badge from "../UI/Badge/Badge";

export default function Cart() {
  const { state, dispatch } = useContext(Context);
  const [cartItems, setCartItems] = useState();

  const getCartItems = async () => {
    const { data } = await axios.post(
      `${BackendUrl}/get-checkout-cart-items`,
      { cart: state.user.cart },
      { withCredentials: true }
    );
    console.log(data.totalCartItems);
    setCartItems(data.totalCartItems);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  console.log("cart items : ", cartItems);
  console.log("state", state.user);

  const addCartItemHandler = async (item) => {
    try {
      

      console.log("item: ", item);
      // return;
      const { data } = await axios.post(
        `${BackendUrl}/${item.cartItem._id}/add-cart-item`,
        {
          totalCartItems: state.user.total_cart_items,
          itemQty: item.qty,
        },
        { withCredentials: true }
      );
      console.log("dataaaaaaaa", data);
      setCartItems(data.totalCartItems);
      const oldLS = JSON.parse(localStorage.getItem("user"));
      const totalItems = oldLS.total_cart_items;
      const cartItemExists = state.user.cart.findIndex(
        (item_a) => item_a.item_id === item.cartItem._id
      );
      const addedCartItem = oldLS.cart[cartItemExists];
      const updatedCartItem = {
        ...addedCartItem,
        qty: +addedCartItem.qty + 1,
      };
      const updatedCartItems = [...oldLS.cart];
      updatedCartItems[cartItemExists] = updatedCartItem;
      const newLS = {
        ...oldLS,
        total_cart_items: totalItems + 1,
        cart: [...updatedCartItems],
      };
      console.log("newLS: ", newLS);
      localStorage.setItem("user", JSON.stringify(newLS));
      dispatch({
        type: "ADD_CART_ITEM",
        payload: newLS,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeCartItemHandler = async () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-3">
      <h1 className="center">
        Your Cart ({cartItems ? cartItems.length : null})
      </h1>
      <div className="cart-container">
        <div className="cart-container__items">
          {cartItems
            ? cartItems.map((item) => {
                return (
                  <Card>
                    <Card.Body className="cart-body-container">
                      <div className="cart-body-container-2">
                        <div>
                          <img
                            src={item.cartItem.pictures[0].Location}
                            width={216}
                            height={108}
                          />
                        </div>
                        <div className="cart-qty-container">
                          <button
                            className="test"
                            onClick={removeCartItemHandler}
                          >
                            -
                          </button>
                          <div className="cart-qty-container-2">
                            <input
                              type="text"
                              disabled
                              className="cart-qty-input"
                              value={item.qty}
                            />
                          </div>
                          <button
                            className="test"
                            onClick={addCartItemHandler.bind(null, item)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <Card.Title>{item.cartItem.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          Seller:
                        </Card.Subtitle>
                        <Card.Text>
                          Price:{" "}
                          <span className="green">
                            &#x20B9; {item.cartItem.price}
                          </span>
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })
            : null}
        </div>
        <div className="cart-container__total">
          <h1>hi</h1>
        </div>
      </div>
    </div>
  );
}
