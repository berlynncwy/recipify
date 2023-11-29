import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import ImageUploader from "./ImageUploader";
import IngredientComponent from "./IngredientComponent";
import TagComponent from "./TagComponent";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const RecipeForm = ({ recipe, onSubmit }) => {
    const [recipeDetails, setRecipeDetails] = useState(
        recipe
            ? recipe
            : {
                  title: "",
                  description: "",
                  instructions: "",
                  cookTime: "",
                  servings: "",
                  author: "",
              }
    );
    const [recipeTag, setRecipeTag] = useState(recipe ? recipe.tag : []);
    const [nutritionFact, setNutritionFact] = useState(
        recipe
            ? recipe.nutritionFact
            : {
                  calories: 0,
                  carbohydrates: 0,
                  fats: 0,
                  protein: 0,
              }
    );
    const [ingredients, setIngredients] = useState(
        recipe ? recipe.ingredients : [{ name: "", quantity: "" }]
    );
    const [imageData, setImageData] = useState(recipe ? recipe.image : null);
    const [errorMsg, setErrorMsg] = useState("");
    const [recipeCreationError, setRecipeCreationError] = useState(false);

    const submitHandler = (event) => {
        console.log(recipeDetails, recipeTag, ingredients, imageData);
        event.preventDefault();

        const validateRecipeDetails = (
            recipeDetails,
            recipeTag,
            ingredients,
            imageData
        ) => {
            setErrorMsg(false);

            // check if all fields are filled
            if (
                recipeDetails.title == "" ||
                recipeDetails.description == "" ||
                recipeDetails.instructions == "" ||
                recipeDetails.cookTime == "" ||
                recipeDetails.servings == "" ||
                recipeTag.length == 0 ||
                imageData == null
            ) {
                setErrorMsg("** All fields must be filled.");

                console.warn("** All fields must be filled.");
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

        const ok = validateRecipeDetails(
            recipeDetails,
            recipeTag,
            ingredients,
            imageData
        );
        if (ok) {
            const newRecipe = {
                ...recipeDetails,
                image: imageData,
                ingredients,
                tag: recipeTag,
                nutritionFact,
            };

            onSubmit && onSubmit(newRecipe);
            setRecipeCreationError(false);
        } else {
            setRecipeCreationError(true);
        }
    };

    // input handlers
    const titleInputHandler = (event) => {
        setRecipeDetails((prev) => {
            return { ...prev, title: event.target.value };
        });
        console.log(recipeDetails);
    };
    const descriptionInputHandler = (event) => {
        setRecipeDetails((prev) => {
            return { ...prev, description: event.target.value };
        });
        console.log(recipeDetails);
    };
    const instructionInputHandler = (event) => {
        setRecipeDetails((prev) => {
            return { ...prev, instructions: event.target.value };
        });
        console.log(recipeDetails);
    };
    const cookingTimeInputHandler = (event) => {
        setRecipeDetails((prev) => {
            return { ...prev, cookTime: event.target.value };
        });
        console.log(recipeDetails);
    };
    const servingInputHandler = (event) => {
        setRecipeDetails((prev) => {
            return { ...prev, servings: event.target.value };
        });
        console.log(recipeDetails);
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
    const navigate = useNavigate();

    const cancelHandler = () => {
        if (confirm("Are you sure you want to cancel?")) navigate("/myrecipes");
    };

    return (
        <div className="min-h-screen max-h-full ">
            <div>
                {{ recipeCreationError } && (
                    <p className="text-danger">{errorMsg}</p>
                )}
            </div>
            <form className="mt-8 grid grid-cols-2 gap-6">
                <div className="col-span-6 sm:col-span-1">
                    <label className="block">Title</label>
                    <input
                        className="p-2 border-1 mt-1 mb-3 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        type="text"
                        required
                        value={recipeDetails.title}
                        onChange={titleInputHandler}
                    ></input>
                    <label>Description</label>
                    <input
                        className="p-2 border-1 mt-1 mb-3 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        type="text"
                        required
                        value={recipeDetails.description}
                        onChange={descriptionInputHandler}
                    ></input>
                    <label className="mb-1">Tag(s)</label>
                    <TagComponent
                        tags={recipeTag}
                        onTagsChange={handleTagsChange}
                    />
                    <label>Instructions</label>
                    <textarea
                        className="p-2 border-1 mt-1 mb-3 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        type="textarea"
                        required
                        rows="10"
                        value={recipeDetails.instructions}
                        onChange={instructionInputHandler}
                    ></textarea>

                    <ImageUploader
                        image={imageData}
                        onImageUpload={handleImageUpload}
                    />
                </div>

                <div className="col-span-6 sm:col-span-1">
                    <h3>Ingredients</h3>

                    <IngredientComponent
                        ingredients={ingredients}
                        onChange={(ingredients) => setIngredients(ingredients)}
                    />

                    <div className="flex justify-evenly">
                        <div className="mr-8">
                            <label className="block">
                                Cooking Time (minutes)
                            </label>
                            <input
                                className="p-2 border-1 mt-1 mb-3 w-80% rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                type="number"
                                required
                                value={recipeDetails.cookTime}
                                onChange={cookingTimeInputHandler}
                            ></input>
                        </div>
                        <div>
                            <label className="block">Serving Size</label>
                            <input
                                className="p-2 border-1 mt-1 mb-3 w-80% rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                type="number"
                                required
                                value={recipeDetails.servings}
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
                                    value={nutritionFact.calories}
                                    onChange={caloriesInputHandler}
                                ></input>
                            </Col>
                            <Col>
                                <label>Carbohydrates</label>
                                <input
                                    className="p-2 border-1 mt-1 mb-3 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    type="number"
                                    required
                                    value={nutritionFact.carbohydrates}
                                    onChange={carbsInputHandler}
                                ></input>
                            </Col>
                            <Col>
                                <label>Proteins</label>
                                <input
                                    className="p-2 border-1 mt-1 mb-3 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    type="number"
                                    required
                                    value={nutritionFact.protein}
                                    onChange={proteinInputHandler}
                                ></input>
                            </Col>
                            <Col>
                                <label>Fats</label>
                                <input
                                    className="p-2 border-1 mt-1 mb-3 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    type="number"
                                    required
                                    value={nutritionFact.fats}
                                    onChange={fatsInputHandler}
                                ></input>
                            </Col>
                        </Row>
                    </div>
                </div>
            </form>
            <div className="flex justify-center mb-5 mt-2">
                <div className="flex ">
                    <Button
                        className="btn-sm m-1"
                        variant="outline-dark"
                        onClick={cancelHandler}
                    >
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
