import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFav } from "../hooks/useFav";

const SingleRecipePage = () => {
  const [recipe, setRecipe] = useState({
    ingredients: [],
  });
  const { user } = useAuthContext();
  const [author, setAuthor] = useState({});
  const [createdDate, setCreatedDate] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const { id } = useParams();
  const url = window.location.origin + "/api/recipes/" + id;

  const { isFav, onFavToggle } = useFav();

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setRecipe(res.recipe);
        setAuthor(res.author);

        // format createdAt date
        let createdate = new Date(res.author.createdAt);
        createdate = createdate.toLocaleDateString();
        setCreatedDate(createdate);

        // format updatedAr date
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
            <h1 className="tracking-wide">{recipe.title}</h1>
            <p>{recipe.description}</p>
            <div className="m-3 flex">
              <div className="flex flex-1">
                <Rating
                  rating={recipe.rating}
                  noOfReviews={`${recipe.numReviews} ${review}`}
                ></Rating>
                {user && (
                  <>
                    <Button className="btn-sm ml-2 btn-outline-dark">
                      Add a review
                    </Button>
                    <Button
                      className="btn-sm ml-2 btn-outline-danger"
                      onClick={() => {
                        console.log("object");
                        onFavToggle(id);
                      }}
                    >
                      {isFav(id) ? "♥" : "♡"}
                    </Button>
                  </>
                )}
              </div>

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
              <div className="flex justify-center">
                <p className="pl-2">Cook Time: {recipe.cookTime} minutes</p>
                <p className="pl-2">Servings: {recipe.servings}</p>
              </div>
              <h3 className="tracking-wide text-left">Instructions</h3>
              <p className="p-2 pb-4 whitespace-pre-line recipe-instructions">
                {recipe.instructions}
                {/* {recipe.instructions.map((instruction, index) => {
                  return (
                    <ol>
                      {index + 1}. {instruction}
                    </ol>
                  );
                })} */}
              </p>
            </div>
            <div className="pb-3">
              <h3 className="tracking-wide text-left">Nutrition Facts</h3>
              <ul className="flex justify-between">
                {recipe.nutritionFact != null && (
                  <>
                    <li className="pl-2">
                      Calories: {recipe.nutritionFact.calories}
                    </li>
                    <li className="pl-2">
                      Carbohydrates: {recipe.nutritionFact.carbohydrates}
                    </li>
                    <li className="pl-2">Fat: {recipe.nutritionFact.fat}</li>
                    <li className="pl-2">
                      Protein: {recipe.nutritionFact.protein}
                    </li>
                  </>
                )}
              </ul>
            </div>
          </Col>

          <Col>
            <div className="bg-gray-100 mt-5 p-3">
              <h3 className="center tracking-wide">Ingredients needed</h3>
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
            <div className="bg-gray-100 mt-3 p-3">
              <h3 className="center tracking-wide">Add to Cart</h3>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SingleRecipePage;
