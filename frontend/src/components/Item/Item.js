import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Item.css";
import axios from "axios";
import { BackendUrl } from "../../utils/BackendUrl";

export default function Item() {
  const history = useHistory();

  useEffect(() => {
    const getItemData = async () => {
      const { data } = await axios.get(
        `${BackendUrl}${history.location.pathname}`
      );
    };
    getItemData();
  }, [history]);

  return (
    <div className="item-container">
      <div></div>
    </div>
  );
}
