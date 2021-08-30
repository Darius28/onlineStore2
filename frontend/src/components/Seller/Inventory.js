import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Inventory.css";
import { BackendUrl } from "../../utils/BackendUrl";
import ItemPreview from "../UI/ItemPreview/ItemPreview";
import { Link } from "react-router-dom";

export default function Inventory() {
  const [itemsData, setItemsData] = useState();

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${BackendUrl}/get-seller-items`, {
        withCredentials: true,
      });
      setItemsData(data.items.items);
    };
    getData();
  }, []);

  return (
    <div>
      <h1 className="center mb-3 mt-3">Your Inventory: </h1>
      <div className="items-container">
        {itemsData
          ? itemsData.map((item) => {
              return (
                <div className="item-div">
                  <ItemPreview data={item} />
                  <div className="item-link-edit">
                    <span>Edit</span>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
