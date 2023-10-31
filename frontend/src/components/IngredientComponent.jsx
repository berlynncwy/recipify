import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

const IngredientComponent = ({ onChange }) => {
  const [ingredientList, setIngredientList] = useState([
    { name: "", quantity: "" },
  ]);

  const onIngredientChange = (event, index) => {
    const { name, value } = event.target;
    const newIngredients = [...ingredientList];
    newIngredients[index][name] = value;
    setIngredientList(newIngredients);
    console.log(newIngredients);
  };

  const handleAdd = () => {
    setIngredientList([...ingredientList, { name: "", quantity: "" }]);
    console.log(ingredientList);
  };

  const handleDelete = (index) => {
    const deleteIngredient = [...ingredientList];
    deleteIngredient.splice(index, 1);
    setIngredientList(deleteIngredient);
  };

  useEffect(() => {
    onChange && onChange(ingredientList);
  }, [ingredientList]);

  return (
    <>
      <div className="flex justify-around ">
        <Row>
          <Col className="p-0 mb-2">
            <label className="w-44 pl-3">Name</label>
          </Col>
          <Col className="p-0 mb-2">
            <label className="w-44 pl-3">Quantity</label>
          </Col>
          <Col className="p-0">
            <label className="w-44"></label>
          </Col>
        </Row>
      </div>

      {ingredientList.map((ingredient, index) => (
        <div className="flex justify-around" key={index}>
          <Row>
            <Col>
              <input
                className="p-2 border-1 mt-1 mb-3 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                placeholder="Carrot"
                type="text"
                name="name"
                value={ingredient.name}
                onChange={(event) => onIngredientChange(event, index)}
              ></input>
            </Col>
            <Col>
              <input
                className="p-2 border-1 mt-1 mb-3 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                placeholder="100g"
                type="text"
                name="quantity"
                value={ingredient.quantity}
                onChange={(event) => onIngredientChange(event, index)}
              ></input>
            </Col>

            <Col className="flex justify-center">
              <Button
                className="btn-sm m-2 mb-4"
                variant="outline-danger"
                onClick={() => handleDelete(index)}
                disabled={ingredientList.length == 1}
              >
                Remove
              </Button>
            </Col>
            <div></div>
          </Row>
        </div>
      ))}
      <div className="flex justify-center">
        <Button
          className="btn-sm m-1 mb-4"
          variant="outline-dark"
          onClick={(event) => handleAdd(event)}
        >
          Add more ingredient
        </Button>
      </div>
    </>
  );
};

export default IngredientComponent;
