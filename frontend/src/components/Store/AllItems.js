import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./AllItems.css";
import { BackendUrl } from "../../utils/BackendUrl";
import Inventory from "../Seller/Inventory";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

export default function AllItems() {
  const [itemsData, setItemsData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      setIsLoading(true);
      // dispatch({
      //   type: "START_LOADING",
      // });
      const { data } = await axios.get(`${BackendUrl}/get-store-items`, {
        withCredentials: true,
      });
      // console.log(data.items);
      setItemsData(data.items);
      setIsLoading(false);
      // dispatch({
      //   type: "STOP_LOADING",
      // });
    };
    getItems();
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Inventory itemsData={itemsData} edit={false} />
      )}
    </div>
  );
}
