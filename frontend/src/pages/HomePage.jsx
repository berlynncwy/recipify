import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

import RecipeItem from "../components/RecipeItem";

const HomePage = () => {
  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    fetch("api/recipes")
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        console.log("======success=======");
        console.log(json);
        setRecipe(json);
      })
      .catch((err) => {
        console.log("======failure=======");
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>Popular Recipes</h1>
      <Row>
        {recipe.map(
          ({ title, _id, description, rating, numReviews, image }) => (
            <Col key={_id} sm={12} md={6} lg={4} xl={3}>
              <RecipeItem
                title={title}
                id={_id}
                description={description}
                rating={rating}
                noOfReviews={numReviews}
                image={image}
              />
            </Col>
          )
        )}
      </Row>
    </>
  );
};

export default HomePage;
