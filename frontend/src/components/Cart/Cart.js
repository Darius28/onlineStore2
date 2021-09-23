import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Context } from "../../context";
import "./Cart.css";
import axios from "axios";
import { BackendUrl } from "../../utils/BackendUrl";
import { Card, Button } from "react-bootstrap";

const loadRazorpayScript = async (src) => {
  try {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default function Cart() {
  const history = useHistory();
  const { state, dispatch } = useContext(Context);
  console.log("strate: ", state);
  // console.log(state.user.total_cart_items);
  const [cartItems, setCartItems] = useState();
  const [totalAmt, setTotalAmt] = useState(0);

  const calculateTotalAmount = (init, price, added, removedItem, qty) => {
    console.log(cartItems);
    if (init === true) {
      setTotalAmt(0);
      cartItems.map((item) => {
        console.log("init === true");
        setTotalAmt((prevAmt) => {
          const totalAmt = item.qty * item.cartItem.price;
          return prevAmt + totalAmt;
        });
      });
    }
    if (init === false) {
      console.log("init === false");
      if (removedItem === true) {
        console.log("removedItem === true");
        setTotalAmt((prevAmt) => {
          const removeQty = price * qty;
          console.log(prevAmt, removeQty, prevAmt - removeQty);
          return prevAmt - removeQty;
        });
      }
      if (removedItem === false) {
        console.log("removedItem === false");
        if (added === true) {
          console.log("added === true");
          setTotalAmt((prevAmt) => {
            return prevAmt + price;
          });
        }
        if (added === false) {
          console.log("added === false");
          setTotalAmt((prevAmt) => {
            return prevAmt - price;
          });
        }
      }
    }
  };

  const getCartItems = async () => {
    const { data } = await axios.post(
      `${BackendUrl}/get-checkout-cart-items`,
      {},
      { withCredentials: true }
    );
    console.log("totalCartItems: ", data.totalCartItems);
    console.log(data.totalCartItems.length);
    setCartItems(data.totalCartItems);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  useEffect(() => {
    if (cartItems) {
      calculateTotalAmount(true, null, null, null, null);
    }
  }, [cartItems]);

  // console.log("cart items : ", cartItems);
  // console.log("state", state.user);

  const addCartItemHandler = async (item) => {
    try {
      // console.log("item: ", item);
      // return;
      const { data } = await axios.post(
        `${BackendUrl}/add-cart-item`,
        {
          addedItemId: item.cartItem._id,
          qty: item.qty,
          price: item.cartItem.price,
          name: item.cartItem.name,
        },
        { withCredentials: true }
      );
      // console.log("datadatadata: ", data);
      let newCartItems = cartItems;
      const cartItemIndex = cartItems.findIndex(
        (item2) => item2.cartItem._id === item.cartItem._id
      );
      newCartItems[cartItemIndex].cartItem = data.updatedCart;
      newCartItems[cartItemIndex].qty = data.updatedCartQty;
      setCartItems(() => newCartItems);
      calculateTotalAmount(false, item.cartItem.price, true, false, null);
    } catch (err) {
      console.log(err);
    }
  };

  const removeCartItemHandler = async (item) => {
    try {
      // console.log("item: ", item);
      // return;
      const { data } = await axios.post(
        `${BackendUrl}/remove-cart-item`,
        {
          removedItemId: item.cartItem._id,
          qty: item.qty,
          price: item.cartItem.price,
          name: item.cartItem.name,
        },
        { withCredentials: true }
      );
      // console.log("datadatadata: ", data);
      let newCartItems = cartItems;
      const cartItemIndex = cartItems.findIndex(
        (item2) => item2.cartItem._id === item.cartItem._id
      );
      newCartItems[cartItemIndex].cartItem = data.updatedCart;
      newCartItems[cartItemIndex].qty = data.updatedCartQty;
      setCartItems(() => newCartItems);
      calculateTotalAmount(false, item.cartItem.price, false, false, null);
    } catch (err) {
      console.log(err);
    }
  };

  const removeItemHandler = async (itemId, itemQty, itemPrice) => {
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
      const {
        data: { cartLength },
      } = await axios.post(`${BackendUrl}/get-cart-length`, {
        userId: state.user._id,
      });
      dispatch({
        type: "SET_CART_LENGTH",
        payload: cartLength,
      });
      // console.log("remove full item data: ", data.updateTotalItems.cart);
      // calculateTotalAmount(false, itemPrice, null, true, itemQty);
    } catch (err) {
      console.log(err);
    }
  };

  const placeOrderHandler = async () => {
    try {
      const response = await loadRazorpayScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!response) {
        console.log("something is wrong");
        return;
      }

      const { data } = await axios.post(
        `${BackendUrl}/get-order-id`,
        { amount: totalAmt, currency: "INR" },
        { withCredentials: true }
      );

      console.log(data);
      const orderId = data.id;

      var options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Online Store",
        description: "Order your Items Now!",
        image: "https://example.com/your_logo",
        order_id: data.id,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;
          const { data } = await axios.post(
            `${BackendUrl}/verify-signature`,
            {
              paymentId: razorpay_payment_id,
              rzpOrderId: razorpay_order_id,
              signature: razorpay_signature,
              orderId,
            },
            { withCredentials: true }
          );
          if (data.ok) {
            console.log("payment verified successfully!");
          } else {
            console.log("payment verification failed!");
          }

          await axios.post(
            `${BackendUrl}/update-orders`,
            { email: state.user.email, total: totalAmt },
            { withCredentials: true }
          );
          dispatch({
            type: "SET_CART_LENGTH",
            payload: null,
          });
          history.push("/order-success");
        },
        // callback_url: "http://localhost:3000/payment-callback",
        prefill: {
          name: state.user.name,
          email: "gaurav.kumar@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-3">
      <h1 className="center">
        Your Cart ({cartItems ? cartItems.length : null})
      </h1>
      {cartItems && cartItems.length > 0 ? (
        <div className="cart-container">
          <div className="cart-container__items">
            {cartItems
              ? cartItems.map((item) => {
                  return (
                    <>
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
                                Seller: {item.shopName}
                              </Card.Subtitle>
                              <Card.Text>
                                <h4>
                                  &#x20B9; {item.cartItem.price * item.qty}
                                </h4>
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
                                  item.qty,
                                  item.cartItem.price
                                )}
                              >
                                REMOVE ITEM
                              </span>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </>
                  );
                })
              : null}
          </div>
          <div className="cart-container__total">
            <Card>
              <Card.Body>
                <h6 className="cart-price-header">PRICE DETAILS: </h6>
                <hr />
                <div className="cart-price-container">
                  <span>
                    Price ({cartItems ? cartItems.length : null}{" "}
                    {cartItems
                      ? cartItems.length === 1
                        ? "item"
                        : "items"
                      : null}
                    ){" "}
                  </span>
                  <span>&#x20B9; {totalAmt ? totalAmt : "0"}</span>
                </div>
                <div className="cart-price-container">
                  <span>Discount </span>
                  <span>- &#x20B9; 0</span>
                </div>
                <div className="cart-price-container">
                  <span>Delivery Charges </span>
                  <span>&#x20B9; 0</span>
                </div>
                <hr />
                <div className="cart-price-container">
                  <h4>Total Amount</h4>
                  <h4>&#x20B9; {totalAmt ? totalAmt : "0"}</h4>
                </div>
                <hr />
                <div className="cart-price-container green">
                  <h6>Total Savings</h6>
                  <h6>&#x20B9; 0</h6>
                </div>
              </Card.Body>
            </Card>
            <div className="center mt-3">
              <Button variant="primary" size="lg" onClick={placeOrderHandler}>
                Place Order and Pay
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container center empty-container">
          <h1 className="mb-3">Your cart is empty.</h1>
          <h5 className="mb-3">
            Go to the homepage to start building your cart
          </h5>
          <Link className="mb-3" to="/">
            <Button variant="primary">See Items</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
