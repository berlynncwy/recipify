import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Dropdown from "react-dropdown";

import ImageUploader from "./ImageUploader";
import IngredientComponent from "./IngredientComponent";
const RecipeForm = () => {
  //   const [title, setTitle] = useState("");
  //   const [description, setDescription] = useState("");

  // }

  return (
    <div className="min-h-screen max-h-full ">
      <h1>Add a new recipe</h1>

      <form className="mt-8 grid grid-cols-2 gap-6">
        <div className="col-span-6 sm:col-span-1">
          <label className="block">Title</label>
          <input
            className="p-2 border-1 mt-1 mb-3 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            type="text"
            required
          ></input>
          <label>Description</label>
          <input
            className="p-2 border-1 mt-1 mb-3 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            type="text"
            required
          ></input>
          <label>Instructions</label>
          <textarea
            className="p-2 border-1 mt-1 mb-3 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            type="textarea"
            rows="5"
          ></textarea>
          <ImageUploader />
        </div>

        <div className="col-span-6 sm:col-span-1">
          <h3>Ingredients</h3>

          <IngredientComponent />

          <div className="flex justify-evenly">
            <div className="mr-8">
              <label className="block">Cooking Time (minutes)</label>
              <input
                className="p-2 border-1 mt-1 mb-3 w-80% rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                type="number"
                required
              ></input>
            </div>
            <div>
              <label className="block">Serving Size</label>
              <input
                className="p-2 border-1 mt-1 mb-3 w-80% rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                type="number"
                required
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
                ></input>
              </Col>
              <Col>
                <label>Carbohydrates</label>
                <input
                  className="p-2 border-1 mt-1 mb-3 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  type="number"
                  required
                ></input>
              </Col>
              <Col>
                <label>Proteins</label>
                <input
                  className="p-2 border-1 mt-1 mb-3 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  type="number"
                  required
                ></input>
              </Col>
              <Col>
                <label>Fats</label>
                <input
                  className="p-2 border-1 mt-1 mb-3 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  type="number"
                  required
                ></input>
              </Col>
            </Row>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
