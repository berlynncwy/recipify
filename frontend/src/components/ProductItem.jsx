import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const ProductItem = ({ _id, name, unitDetails, price, image }) => {
  return (
    <>
      <Card style={{ width: "15rem", height: "24rem" }}>
        <Link to={`/products/${_id}`}>
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <Card.Title as="div" className="product-title">
              {name}
            </Card.Title>
            <Card.Text className="details-text">{unitDetails}</Card.Text>
            <Card.Text as="div" className="">
              ${price}
            </Card.Text>
            <Button variant="outline-dark" size="sm" className="m-1">
              Add to cart
            </Button>
          </Card.Body>
        </Link>
      </Card>
    </>
  );
};

export default ProductItem;
