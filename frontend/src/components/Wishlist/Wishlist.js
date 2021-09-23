import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BackendUrl } from "../../utils/BackendUrl";
import "./Wishlist.css";
import { Button, Card } from "react-bootstrap";
import Badge from "../UI/Badge/Badge";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState();
  const getWishlistData = async () => {
    const { data } = await axios.get(`${BackendUrl}/get-wishlist-data`, {
      withCredentials: true,
    });
    console.log("data.wishlist: ", data.wishlist);
    setWishlist(data.wishlist);
  };

  useEffect(() => {
    getWishlistData();
  }, []);

  const buyNowHandler = async () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromWishlistHandler = async (itemId) => {
    try {
      const { data } = await axios.post(
        `${BackendUrl}/remove-item-from-wishlist`,
        { itemId },
        { withCredentials: true }
      );
      await getWishlistData();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="center mt-4 mb-4">Your Wishlist</h1>
      <div className="container">
        {wishlist && wishlist.length > 0 ? (
          wishlist.map((item) => (
            <>
              <Link className="wishlist-link-container">
                <Card className="wishlist-container">
                  <div className="wishlist-container-2">
                    <div>
                      <img
                        src={item.pictures[0].Location}
                        width={216}
                        height={108}
                      />
                    </div>
                    <div>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Seller: {item.shop_name}
                      </Card.Subtitle>
                      <Card.Text>
                        <h4>&#x20B9; {item.price}</h4>
                      </Card.Text>
                    </div>
                    <div className="category-container">
                      <Card.Title>Category </Card.Title>
                      {item.category.map((cat) => (
                        <Badge className="category">{cat}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="wishlist-container-3">
                    <div className="wishlist-gap-container"></div>
                    <div className="out">
                      <Button onClick={buyNowHandler} variant="success">
                        Buy Now
                      </Button>
                    </div>
                    <div className="out">
                      <Button
                        onClick={removeFromWishlistHandler.bind(null, item._id)}
                        variant="outline-danger"
                      >
                        Remove from Wishlist
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
              <br />
            </>
          ))
        ) : (
          <div className="container center empty-container">
            <h1 className="mb-3">Your wishlist is empty.</h1>
            <h5 className="mb-3">
              Go to the homepage to start adding items to your wishlist!
            </h5>
            <Link className="mb-3" to="/">
              <Button variant="primary">See Items</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
