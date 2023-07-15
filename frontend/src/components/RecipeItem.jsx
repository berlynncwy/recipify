import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const RecipeItem = ({
  _id,
  title,
  description,
  rating,
  noOfReviews,
  image,
}) => {
  return (
    <>
      <Card style={{ width: "18rem", height: "auto" }}>
        <Link to={`/recipe/${_id}`}>
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <Card.Title as="div" className="recipe-title">
              {title}
            </Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text as="div">
              <Rating rating={rating} noOfReviews={`${noOfReviews} reviews`} />
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </>
  );
};

export default RecipeItem;
