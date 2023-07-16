import React, { useState } from "react";

const RecipeForm = () => {
  //   const [title, setTitle] = useState("");
  //   const [description, setDescription] = useState("");

  return (
    <>
      <h1>Add a new recipe</h1>
      <form>
        <label className="block">Title</label>
        <input type="text" required></input>
        <label>Description</label>
        <input type="text" required></input>
        <label>Cooking Time</label>
        <input type="number" required></input>
        <label>Servings</label>
        <input type="number" required></input>

        <div>
          <label>Ingredients</label>
          <input type="text"></input>
        </div>

        <div>
          <label>Instructions</label>
          <input type="text"></input>
        </div>

        <div className="">
          <h3>Nutrition Facts</h3>
          <label>Calories</label>
          <input type="number" required></input>
          <label>Carbohydrates</label>
          <input type="number" required></input>
          <label>Proteins</label>
          <input type="number" required></input>
          <label>Fats</label>
          <input type="number" required></input>
        </div>
      </form>
    </>
  );
};

export default RecipeForm;
