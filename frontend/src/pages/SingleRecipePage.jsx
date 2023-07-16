import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";

const SingleRecipePage = () => {
  const [recipe, setRecipe] = useState({ ingredients: [] });
  const [author, setAuthor] = useState({});
  const [createdDate, setCreatedDate] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const { id } = useParams();
  const url = window.location.origin + "/api/recipes/" + id;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setRecipe(res.recipe);
        setAuthor(res.author);

        let createdate = new Date(res.author.createdAt);
        createdate = createdate.toLocaleDateString();
        setCreatedDate(createdate);

        let updatedate = new Date(res.author.updatedAt);
        updatedate = updatedate.toLocaleDateString();
        setUpdatedDate(updatedate);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // set review/reviews
  let review = "reviews";
  if (recipe.numReviews <= 1) {
    review = "review";
  }

  return (
    <>
      <div>
        <Row>
          <Col>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <div className="m-3 flex ">
              <Rating
                rating={recipe.rating}
                noOfReviews={`${recipe.numReviews} ${review}`}
              ></Rating>
              <Button className="btn-sm ml-2 btn-outline-dark">
                Add a review
              </Button>
              <Button className="btn-sm ml-2 btn-outline-danger">♡</Button>
              <p className="author">
                Author: {author.firstName + " " + author.lastName}
                <br></br>
                Created: {createdDate}
                <br></br>
                Updated: {updatedDate}
              </p>
            </div>
            <div>
              <img src={recipe.image} alt={recipe.name} className="mt-4 mb-4" />
              <p></p>
            </div>
          </Col>
          <Col>
            <div className="bg-gray-100 mt-5 p-3">
              <h3 className="center">Ingredients needed</h3>
              <ul className="ingredient-list">
                {recipe.ingredients.map((ingredient) => {
                  return (
                    <li>
                      {ingredient.name} {ingredient.quantity} {ingredient.unit}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SingleRecipePage;
