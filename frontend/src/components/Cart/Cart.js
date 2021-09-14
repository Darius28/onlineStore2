import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context";
import "./Cart.css";
import axios from "axios";
import { BackendUrl } from "../../utils/BackendUrl";
import { Card, Button } from "react-bootstrap";
import Badge from "../UI/Badge/Badge";

export default function Cart() {
  const { state, dispatch } = useContext(Context);
  console.log("strate: ", state);
  console.log(state.user.total_cart_items);
  const [cartItems, setCartItems] = useState();
  const [disableRemoveItem, setDisableRemoveItem] = useState(false);

  const getCartItems = async () => {
    const { data } = await axios.post(
      `${BackendUrl}/get-checkout-cart-items`,
      {},
      { withCredentials: true }
    );
    console.log("totalCartItems: ", data.totalCartItems);
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
      const { data } = await axios.post(
        `${BackendUrl}/add-cart-item`,
        {
          addedItemId: item.cartItem._id,
          qty: item.qty,
          totalCartItems: state.user.total_cart_items,
        },
        { withCredentials: true }
      );
      console.log("datadatadata: ", data);
      let newCartItems = cartItems;
      const cartItemIndex = cartItems.findIndex(
        (item2) => item2.cartItem._id === item.cartItem._id
      );
      newCartItems[cartItemIndex].cartItem = data.updatedCart;
      newCartItems[cartItemIndex].qty = data.updatedCartQty;
      setCartItems(() => newCartItems);
      const oldLS = JSON.parse(localStorage.getItem("user"));
      console.log(oldLS);
      const newLS = {
        ...oldLS,
        total_cart_items: data.newTotalCartItems,
      };
      localStorage.setItem("user", JSON.stringify(newLS));
      dispatch({
        type: "NEW_CART_ITEM_TOTAL",
        payload: data.newTotalCartItems,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeCartItemHandler = async (item) => {
    try {
      console.log("item: ", item);
      const { data } = await axios.post(
        `${BackendUrl}/remove-cart-item`,
        {
          removedItemId: item.cartItem._id,
          qty: item.qty,
          totalCartItems: state.user.total_cart_items,
        },
        { withCredentials: true }
      );
      console.log("datadatadata: ", data);
      let newCartItems = cartItems;
      const cartItemIndex = cartItems.findIndex(
        (item2) => item2.cartItem._id === item.cartItem._id
      );
      newCartItems[cartItemIndex].cartItem = data.updatedCart;
      newCartItems[cartItemIndex].qty = data.updatedCartQty;
      setCartItems(() => newCartItems);
      const oldLS = JSON.parse(localStorage.getItem("user"));
      console.log(oldLS);
      const newLS = {
        ...oldLS,
        total_cart_items: data.newTotalCartItems,
      };
      localStorage.setItem("user", JSON.stringify(newLS));
      dispatch({
        type: "NEW_CART_ITEM_TOTAL",
        payload: data.newTotalCartItems,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeItemHandler = async (itemId, itemQty) => {
    try {
      console.log(itemId, itemQty);
      const totalItems = state.user.total_cart_items;
      const { data } = await axios.post(
        `${BackendUrl}/remove-entire-cart-item`,
        { itemId, itemQty, totalItems },
        { withCredentials: true }
      );
      const filteredCartItems = cartItems.filter((item) => {
        return item.cartItem._id !== itemId;
      });
      setCartItems(() => filteredCartItems);
      const oldLS = JSON.parse(localStorage.getItem("user"));
      const newLS = {
        ...oldLS,
        total_cart_items: totalItems - itemQty,
      };
      localStorage.setItem("user", JSON.stringify(newLS));
      dispatch({
        type: "NEW_CART_ITEM_TOTAL",
        payload: totalItems - itemQty,
      });
      console.log("remove full item data: ", data.updateTotalItems.cart);
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
                      </div>
                      <div className="cart-body-container-3">
                        <div className="cart-qty-container">
                          <button
                            disabled={item.qty === 1}
                            className={`test ${
                              item.qty === 1 ? "test-no-cursor" : null
                            }`}
                            onClick={removeCartItemHandler.bind(null, item)}
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
                        <div className="cart-remove-item-container">
                          <span
                            onClick={removeItemHandler.bind(
                              null,
                              item.cartItem._id,
                              item.qty
                            )}
                          >
                            REMOVE ITEM
                          </span>
                        </div>
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
