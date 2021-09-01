import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Item.css";
import axios from "axios";
import { BackendUrl } from "../../utils/BackendUrl";
import Badge from "../UI/Badge/Badge";
import { Button } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import ReviewModal from "../Form/ReviewModal";
import ReviewContainer from "../UI/ReviewContainer/ReviewContainer";

export default function Item() {
  const history = useHistory();
  const [itemData, setItemData] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [prevHoverImg, setPrevHoverImg] = useState();
  const [hoverImg, setHoverImg] = useState();
  const [reviewModal, setReviewModal] = useState(false);

  useEffect(() => {
    const getItemData = async () => {
      const { data } = await axios.get(
        `${BackendUrl}${history.location.pathname}`
      );
      console.log("itemData", data.item);
      setItemData(data.item);
      setSelectedImage(data.item.pictures[0].Location);
      const firstImg = document.getElementById(
        `${data.item.pictures[0].Location}`
      );
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

  const showReviewModalHandler = () => {
    setReviewModal(true);
  };

  const closeReviewModalHandler = () => {
    setReviewModal(false);
  };

  return (
    <>
      {reviewModal ? (
        <ReviewModal
          onCloseModal={closeReviewModalHandler}
          name={itemData.name}
          itemId={itemData._id}
        />
      ) : null}
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
                      onMouseOver={selectedImageHandler.bind(
                        null,
                        pic.Location
                      )}
                      onMouseLeave={removeBorderHandler}
                    />
                  );
                })
              : null}
          </div>
          <div className="item-images-container">
            {selectedImage ? (
              <img
                className="item-image"
                width={486}
                height={243}
                src={selectedImage}
              />
            ) : null}
          </div>
        </div>
        <div className="item-data-container">
          <h4 className="item-heading">{itemData ? itemData.name : null}</h4>
          <div className="item-rating-container">
            <Badge className="bg-green">Nil</Badge>
            <p>0 ratings</p>
          </div>
          <h1 className="item-price">
            &#x20B9; {itemData ? itemData.price : null}
          </h1>
          <hr />
          <div className="item-description-container">
            <p className="item-description-heading">Description: </p>
            <p className="item-description">
              {itemData ? itemData.description : null}
            </p>
          </div>
          <hr />
          <div className="item-review-container">
            <div className="item-review-heading">
              <h4>Ratings and Reviews</h4>
              <Button variant="primary" onClick={showReviewModalHandler}>
                Write a Review
              </Button>
            </div>
            <div>
              <h4>
                Nil <StarFill />
              </h4>
            </div>
            <hr />
            <div>
              {itemData
                ? itemData.reviews.length > 0
                  ? itemData.reviews.map((item) => {
                      return <ReviewContainer review={item} />;
                    })
                  : null
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
