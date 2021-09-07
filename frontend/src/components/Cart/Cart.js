import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context";
import "./Cart.css";
import axios from "axios";
import { BackendUrl } from "../../utils/BackendUrl";

export default function Cart() {
  const { state, dispatch } = useContext(Context);

  const getCartItems = async () => {
    const { data } = await axios.post(
      `${BackendUrl}/get-cart-items`,
      { cart: state.user.cart },
      { withCredentials: true }
    );
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return <div></div>;
}
