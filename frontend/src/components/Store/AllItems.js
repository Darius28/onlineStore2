import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./AllItems.css";
import { BackendUrl } from "../../utils/BackendUrl";
import Inventory from "../Seller/Inventory";
import LoadingScreen from "../UI/LoadingScreen/LoadingScreen";
import { Context } from "../../context";

export default function AllItems() {
  const [itemsData, setItemsData] = useState();
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    const getItems = async () => {
      dispatch({
        type: "START_LOADING",
      });
      const { data } = await axios.get(`${BackendUrl}/get-store-items`, {
        withCredentials: true,
      });
      // console.log(data.items);
      setItemsData(data.items);
      dispatch({
        type: "STOP_LOADING",
      });
    };
    getItems();
  }, []);

  return (
    <div>
      <Inventory itemsData={itemsData} edit={false} />
    </div>
  );
}
