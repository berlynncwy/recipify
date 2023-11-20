import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const ProductItem = ({ _id, name, unitDetails, price, image }) => {
    return (
        <>
            <Card style={{ width: "15rem", height: "24rem" }}>
                <Link to={`/products/${_id}`}>
                    <Card.Img
                        variant="top"
                        src={image}
                        className="product-image p-1"
                    />
                    <Card.Body>
                        <Card.Title as="div" className="product-title">
                            {name}
                        </Card.Title>
                        <Card.Text className="details-text">
                            {unitDetails}
                        </Card.Text>
                        <Card.Text as="div" className="">
                            ${price.toFixed(2)}
                        </Card.Text>
                    </Card.Body>
                </Link>
            </Card>
        </>
    );
};

export default ProductItem;
