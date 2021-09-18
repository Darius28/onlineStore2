import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Item.css";
import axios from "axios";
import { BackendUrl } from "../../utils/BackendUrl";
import Badge from "../UI/Badge/Badge";
import { Button } from "react-bootstrap";
import { ArrowReturnLeft, StarFill } from "react-bootstrap-icons";
import ReviewModal from "../Form/ReviewModal";
import ReviewContainer from "../UI/ReviewContainer/ReviewContainer";
import { Context } from "../../context/index";
import { nanoid } from "nanoid";

export default function Item() {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();
  const [itemData, setItemData] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [prevHoverImg, setPrevHoverImg] = useState();
  const [hoverImg, setHoverImg] = useState();
  const [reviewModal, setReviewModal] = useState(false);
  const [amtRatings, setAmtRatings] = useState();
  const [cartItemExists, setCartItemExists] = useState();

  useEffect(() => {
    const getItemData = async () => {
      const { data } = await axios.get(
        `${BackendUrl}${history.location.pathname}`
      );
      console.log("itemData", data.item);
      setItemData(data.item);
      let amtReviews = data.item.reviews.length;
      if (amtReviews === 0) {
        setAmtRatings("Nil");
      } else {
        let score = 0;
        for (let i in data.item.reviews) {
          score += data.item.reviews[i].rating;
        }
        setAmtRatings(score / amtReviews);
      }

      setSelectedImage(data.item.pictures[0].Location);
      const firstImg = document.getElementById(
        `${data.item.pictures[0].Location}`
      );
      firstImg.classList.add("image-border");
      setPrevHoverImg(() => {
        return firstImg;
      });
      console.log(history);
      const {
        data: { cartItem },
      } = await axios.post(
        `${BackendUrl}/is-cart-item-added`,
        { itemId: data.item._id },
        {
          withCredentials: true,
        }
      );
      setCartItemExists(cartItem);
    };
    getItemData();
  }, [history]);

  useEffect(() => {
    if (state) {
      // console.log("state: ", state.user);
    }
  }, [state]);

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

  const addToCartHandler = async () => {
    try {
      if (!cartItemExists) {
        // console.log(itemData);
        // return;
        const { data } = await axios.post(
          `${BackendUrl}/add-new-cart-item`,
          {
            updatedCartItem: {
              item_id: itemData._id,
              qty: 1,
              price: itemData.price,
              name: itemData.name,
            },
          },
          { withCredentials: true }
        );
        const {
          data: { cartLength },
        } = await axios.get(`${BackendUrl}/get-cart-length`, {
          withCredentials: true,
        });
        dispatch({
          type: "SET_CART_LENGTH",
          payload: cartLength,
        });
      }
      history.push("/cart");
    } catch (err) {
      console.log(err);
    }
  };

  const buyNowHandler = () => {
    console.log(state);
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
        <div className="item-image-container-1">
          <div className="item-image-container-2">
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
          <div className="item-image-container-3">
            <Button variant="info" size="lg" onClick={addToCartHandler}>
              {cartItemExists ? "Go to Cart" : "Add to Cart"}
            </Button>
            <Button variant="success" size="lg" onClick={buyNowHandler}>
              Buy Now
            </Button>
          </div>
          <div className="add-to-wishlist-container">
            <StarFill color="#878787" />
          </div>
        </div>
        <div className="item-data-container">
          <h4 className="item-heading">{itemData ? itemData.name : null}</h4>
          <div className="item-rating-container">
            <Badge className="bg-green">{amtRatings ? amtRatings : null}</Badge>
            <p>{itemData ? itemData.reviews.length : null} ratings</p>
          </div>
          <div>
            <span className="item-seller-name">
              Seller: {itemData ? itemData.shop_name : null}
            </span>
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
                {amtRatings ? amtRatings : null} <StarFill />
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
