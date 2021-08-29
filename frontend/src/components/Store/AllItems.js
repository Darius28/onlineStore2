import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllItems.css";
import { BackendUrl } from "../../utils/BackendUrl";

export default function AllItems() {
  useEffect(() => {
    const getItems = async () => {
      const { data } = await axios.get(`${BackendUrl}/get-store-items`, {
        withCredentials: true,
      });
    };
    getItems();
  }, []);

  return <div></div>;
}
