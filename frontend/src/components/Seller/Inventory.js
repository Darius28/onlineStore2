import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Inventory.css";
import { BackendUrl } from "../../utils/BackendUrl";
import ItemPreview from "../UI/ItemPreview/ItemPreview";
import { Link } from "react-router-dom";

export default function Inventory({ itemsData, edit }) {
  // console.log(itemsData);
  return (
    <div>
      <div className="items-container">
        {itemsData
          ? itemsData.map((item) => {
              return (
                <div className="item-div">
                  <ItemPreview data={item} />
                  {edit ? (
                    <div className="item-link-edit">
                      <span>Edit</span>
                    </div>
                  ) : null}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
