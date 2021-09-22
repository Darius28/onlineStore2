import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Order.css";
import { BackendUrl } from "../../utils/BackendUrl";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Order() {
  const [totalOrders, setTotalOrders] = useState();

  const getOrdersData = async () => {
    const { data } = await axios.get(`${BackendUrl}/get-orders-data`, {
      withCredentials: true,
    });
    console.log("data: ", data);
    setTotalOrders(data);
  };

  useEffect(() => {
    getOrdersData();
  }, []);
  return (
    <div className="container">
      <h1 className="center mt-4 mb-4">Your Orders</h1>
      {totalOrders
        ? totalOrders.map((eachOrder) => {
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
                              <img
                                src={order.item.pictures[0].Location}
                                width={216}
                                height={108}
                              />
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
        : null}
    </div>
  );
}
