import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Order.css";
import { BackendUrl } from "../../utils/BackendUrl";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

export default function Order() {
  const [totalOrders, setTotalOrders] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getOrdersData = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`${BackendUrl}/get-orders-data`, {
      withCredentials: true,
    });
    console.log("data: ", data);
    setTotalOrders(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getOrdersData();
  }, []);
  return (
    <div className="container">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className="center mt-4 mb-4">Your Orders</h1>
          {totalOrders && totalOrders.length > 0 ? (
            totalOrders.map((eachOrder) => {
              return (
                <>
                  <Card className="order-container">
                    <h4>Ordered On: {eachOrder.orderDate}</h4>
                    {eachOrder.itemsArray.map((order) => {
                      return (
                        <>
                          <div className="order-container-2">
                            <div>
                              <Link to={`/item/${order.item._id}`}>
                                <div className="order-img-container">
                                  <img
                                    src={order.item.pictures[0].Location}
                                    className="order-img"
                                  />
                                </div>
                              </Link>
                            </div>
                            <div>
                              <Card.Title>{order.item.name}</Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">
                                Seller: {order.item.shop_name}
                              </Card.Subtitle>
                              <Card.Text>
                                <h4>
                                  &#x20B9; {order.price} X {order.qty}
                                </h4>
                              </Card.Text>
                            </div>
                          </div>
                          <hr />
                        </>
                      );
                    })}
                  </Card>
                  <br />
                </>
              );
            })
          ) : (
            <div className="container center empty-container">
              <h1 className="mb-3">You haven't ordered anything.</h1>
              <h5 className="mb-3">Order your favourite items now!</h5>
              <Link className="mb-3" to="/">
                <Button variant="primary">Go to homepage.</Button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
