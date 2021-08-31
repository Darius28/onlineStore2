import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Item.css";
import axios from "axios";
import { BackendUrl } from "../../utils/BackendUrl";

export default function Item() {
  const history = useHistory();
  const [itemData, setItemData] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [prevHoverImg, setPrevHoverImg] = useState();
  const [hoverImg, setHoverImg] = useState();

  useEffect(() => {
    const getItemData = async () => {
      const { data } = await axios.get(
        `${BackendUrl}${history.location.pathname}`
      );
      // console.log(data.item);
      setItemData(data.item);
      setSelectedImage(data.item.pictures[0].Location);
      const firstImg = document.getElementById(
        `${data.item.pictures[0].Location}`
      );
      console.log(firstImg);
      firstImg.classList.add("image-border");
      setPrevHoverImg(() => {
        return firstImg;
      });
    };
    if (history) {
      getItemData();
    }
  }, [history]);

  const selectedImageHandler = (picture) => {
    setSelectedImage(() => {
      return picture;
    });
    if (prevHoverImg !== undefined) {
      prevHoverImg.classList.remove("image-border");
    }
    const hoveredImg = document.getElementById(`${picture}`);
    hoveredImg.classList.add("image-border");
    setHoverImg(() => {
      return hoveredImg;
    });
  };

  const removeBorderHandler = () => {
    setPrevHoverImg(() => {
      return hoverImg;
    });
  };

  return (
    <div className="item-container">
      <div className="item-image-container">
        <div className="item-preview-container">
          {itemData
            ? itemData.pictures.map((pic) => {
                return (
                  <img
                    id={pic.Location}
                    width={108}
                    height={54}
                    src={pic.Location}
                    onMouseOver={selectedImageHandler.bind(null, pic.Location)}
                    onMouseLeave={removeBorderHandler}
                  />
                );
              })
            : null}
        </div>
        <div className="item-images-container">
          {selectedImage ? (
            <img width={486} height={243} src={selectedImage} />
          ) : null}
        </div>
      </div>
      <div>
        <span>{itemData ? itemData.name : null}</span>
      </div>
    </div>
  );
}
