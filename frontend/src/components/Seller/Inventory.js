import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Inventory.css";
import { BackendUrl } from "../../utils/BackendUrl";

export default function Inventory() {
  const [itemsData, setItemsData] = useState();

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${BackendUrl}/get-seller-items`, {
        withCredentials: true,
      });
      console.log(data.items.items);
      setItemsData(data.items.items);
    };
    getData();
  }, []);

  return (
    <div>
      <h1 className="center mb-3 mt-3">Your Inventory: </h1>
      <div className="items-container">
        <div></div>
      </div>
    </div>
  );
}
