import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllItems.css";
import { BackendUrl } from "../../utils/BackendUrl";
import Inventory from "../Seller/Inventory";

export default function AllItems() {
  const [itemsData, setItemsData] = useState();

  useEffect(() => {
    const getItems = async () => {
      const { data } = await axios.get(`${BackendUrl}/get-store-items`, {
        withCredentials: true,
      }
      );
      // console.log(data.items);
      setItemsData(data.items);
    };
    getItems();
  }, []);

  return (
    <div>
      <Inventory itemsData={itemsData} edit={false} />
    </div>
  );
}
