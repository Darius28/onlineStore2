import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Order.css";
import { BackendUrl } from "../../utils/BackendUrl";

export default function Order() {
  const getOrdersData = async () => {
    const { data } = await axios.get(`${BackendUrl}/get-orders-data`, {
      withCredentials: true,
    });
    console.log(data)
  };

  useEffect(() => {
    getOrdersData();
  }, []);
  return (
    <div>
      <h1>Orders</h1>
    </div>
  );
}
