import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";

const RecipeItem = ({
  _id,
  title,
  description,
  rating,
  noOfReviews,
  image,
  favourite,
  onFavourite,
}) => {
  return (
    <>
      <div className="flex">
        <Card style={{ width: "18rem", height: "auto" }}>
          <Link to={`/recipes/${_id}`}>
            <Card.Img variant="top" src={image} className="recipe-image" />
            <Card.Body>
              <Card.Title as="div" className="recipe-title">
                {title}
              </Card.Title>
              <Card.Text className="mb-2 min-h-[120px] h-[120px]">
                <p className="line-clamp-5">{description}</p>
              </Card.Text>
              <Card.Text as="div" className="flex justify-items-center w-full">
                <div className="flex flex-1">
                  <Rating
                    rating={rating}
                    noOfReviews={`${noOfReviews} reviews`}
                  />
                </div>
                {favourite != null && (
                  <div className="">
                    <Button
                      className="btn-sm "
                      variant="outline-danger"
                      onClick={(event) => {
                        event.preventDefault();
                        onFavourite();
                      }}
                    >
                      {favourite ? "♥" : "♡"}
                    </Button>
                  </div>
                )}
              </Card.Text>
            </Card.Body>
          </Link>
        </Card>
      </div>
    </>
  );
};

export default RecipeItem;
