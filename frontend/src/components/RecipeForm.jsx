import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

import ImageUploader from "./ImageUploader";
import IngredientComponent from "./IngredientComponent";
import TagComponent from "./TagComponent";
import { useAuthContext } from "../hooks/useAuthContext";

const RecipeForm = () => {
  const { user } = useAuthContext();
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    instructions: "",
    cookTime: "",
    servings: "",
    author: "",
  });
  const [recipeTag, setRecipeTag] = useState([]);
  const [nutritionFact, setNutritionFact] = useState({
    calories: 0,
    carbohydrates: 0,
    fats: 0,
    protein: 0,
  });
  const [ingredients, setIngredients] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [recipeCreationError, setRecipeCreationError] = useState(false);

  const submitHandler = (event) => {
    console.log(recipe, recipeTag, ingredients, imageData);
    event.preventDefault();

    const validateRecipeDetails = (
      recipe,
      recipeTag,
      ingredients,
      imageData
    ) => {
      setErrorMsg(false);

      // check if all fields are filled
      if (
        recipe.title == "" ||
        recipe.description == "" ||
        recipe.instructions == "" ||
        recipe.cookTime == "" ||
        recipe.servings == "" ||
        recipeTag.length == 0 ||
        imageData == null
      ) {
        setErrorMsg("** All fields must be filled..");

        console.warn("** All fields must be filled..");
        return false;
      }

      for (const { name, quantity } of ingredients) {
        if (name == "" || quantity == "") {
          setErrorMsg("** All fields must be filled");
          console.warn("** All fields must be filled");
          return false;
        }
      }
      return true;
    };

    const ok = validateRecipeDetails(recipe, recipeTag, ingredients, imageData);
    if (ok) {
      setRecipeCreationError(false);

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          ...recipe,
          image: imageData,
          ingredients,
          tag: recipeTag,
          nutritionFact,
        }),
      };
      fetch("api/recipes/newrecipe", requestOptions)
        .then((res) => {
          if (res.ok) {
            alert("Recipe created.");
          } else {
          }
        })
        .catch((err) => {
          console.log("=====error=====");
          console.log(err);
        });
    } else {
      setRecipeCreationError(true);
    }
  };

  // input handlers
  const titleInputHandler = (event) => {
    setRecipe((prev) => {
      return { ...prev, title: event.target.value };
    });
    console.log(recipe);
  };
  const descriptionInputHandler = (event) => {
    setRecipe((prev) => {
      return { ...prev, description: event.target.value };
    });
    console.log(recipe);
  };
  const instructionInputHandler = (event) => {
    setRecipe((prev) => {
      return { ...prev, instructions: event.target.value };
    });
    console.log(recipe);
  };
  const cookingTimeInputHandler = (event) => {
    setRecipe((prev) => {
      return { ...prev, cookTime: event.target.value };
    });
    console.log(recipe);
  };
  const servingInputHandler = (event) => {
    setRecipe((prev) => {
      return { ...prev, servings: event.target.value };
    });
    console.log(recipe);
  };
  const caloriesInputHandler = (event) => {
    setNutritionFact((prev) => {
      return { ...prev, calories: +event.target.value };
    });
    console.log(nutritionFact);
  };
  const carbsInputHandler = (event) => {
    setNutritionFact((prev) => {
      return { ...prev, carbohydrates: +event.target.value };
    });
    console.log(nutritionFact);
  };
  const fatsInputHandler = (event) => {
    setNutritionFact((prev) => {
      return { ...prev, fats: +event.target.value };
    });
    console.log(nutritionFact);
  };
  const proteinInputHandler = (event) => {
    setNutritionFact((prev) => {
      return { ...prev, protein: +event.target.value };
    });
    console.log(nutritionFact);
  };

  const handleImageUpload = (imageData) => {
    setImageData(imageData);
  };

  const handleTagsChange = (tags) => {
    setRecipeTag(tags);
    console.log(recipeTag);
  };

  return (
    <div className="min-h-screen max-h-full ">
      <h1>Add a new recipe</h1>
      <div>
        {{ recipeCreationError } && <p className="text-danger">{errorMsg}</p>}
      </div>
      <form className="mt-8 grid grid-cols-2 gap-6">
        <div className="col-span-6 sm:col-span-1">
          <label className="block">Title</label>
          <input
            className="p-2 border-1 mt-1 mb-3 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            type="text"
            required
            value={recipe.title}
            onChange={titleInputHandler}
          ></input>
          <label>Description</label>
          <input
            className="p-2 border-1 mt-1 mb-3 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            type="text"
            required
            value={recipe.description}
            onChange={descriptionInputHandler}
          ></input>
          <label>Tag(s)</label>
          <TagComponent onTagsChange={handleTagsChange} />
          <label>Instructions</label>
          <textarea
            className="p-2 border-1 mt-1 mb-3 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            type="textarea"
            required
            rows="10"
            value={recipe.instructions}
            onChange={instructionInputHandler}
          ></textarea>

          <ImageUploader onImageUpload={handleImageUpload} />
        </div>

        <div className="col-span-6 sm:col-span-1">
          <h3>Ingredients</h3>

          <IngredientComponent
            onChange={(ingredients) => setIngredients(ingredients)}
          />

          <div className="flex justify-evenly">
            <div className="mr-8">
              <label className="block">Cooking Time (minutes)</label>
              <input
                className="p-2 border-1 mt-1 mb-3 w-80% rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                type="number"
                required
                value={recipe.cookTime}
                onChange={cookingTimeInputHandler}
              ></input>
            </div>
            <div>
              <label className="block">Serving Size</label>
              <input
                className="p-2 border-1 mt-1 mb-3 w-80% rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                type="number"
                required
                value={recipe.servings}
                onChange={servingInputHandler}
              ></input>
            </div>
          </div>
          <div className="">
            <h3>Nutrition Facts</h3>
            <Row className="flex">
              <Col>
                <label>Calories</label>
                <input
                  className="p-2 border-1 mt-1 mb-3 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  type="number"
                  required
                  value={recipe.calories}
                  onChange={caloriesInputHandler}
                ></input>
              </Col>
              <Col>
                <label>Carbohydrates</label>
                <input
                  className="p-2 border-1 mt-1 mb-3 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  type="number"
                  required
                  value={recipe.carbohydrates}
                  onChange={carbsInputHandler}
                ></input>
              </Col>
              <Col>
                <label>Proteins</label>
                <input
                  className="p-2 border-1 mt-1 mb-3 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  type="number"
                  required
                  value={recipe.protein}
                  onChange={proteinInputHandler}
                ></input>
              </Col>
              <Col>
                <label>Fats</label>
                <input
                  className="p-2 border-1 mt-1 mb-3 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  type="number"
                  required
                  value={recipe.fats}
                  onChange={fatsInputHandler}
                ></input>
              </Col>
            </Row>
          </div>
        </div>
      </form>
      <div className="flex justify-center mb-5 mt-2">
        <div className="flex ">
          <Button className="btn-sm m-1" variant="outline-dark">
            Cancel
          </Button>
          <Button
            className="btn-sm m-1"
            variant="outline-dark"
            type="submit"
            onClick={submitHandler}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
