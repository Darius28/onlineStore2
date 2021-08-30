import React from "react";
import "./ItemPreview.css";
import { Card } from "react-bootstrap";
import Badge from "../Badge/Badge";
import { Link } from "react-router-dom";

export default function ItemPreview({ data }) {
  return (
    <Link to={`/item/${data._id}`} className="item-link">
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          width={286}
          height={144}
          src={data.pictures[0].Location}
        />
        <Card.Body>
          <div className="title-container">
            <Card.Title>{data.name}</Card.Title>
          </div>
          <Card.Text className="item-desc">{data.description}</Card.Text>
          <Card.Text>
            {data.category.map((item) => {
              return <Badge className="category">{item}</Badge>;
            })}
          </Card.Text>
          <Card.Text className="center">
            <Badge className="price">&#8377; {data.price}</Badge>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
