import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  Row,
  Col,
  Container,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";

import RecipeItem from "../components/RecipeItem";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFav } from "../hooks/useFav";

const RecipePage = () => {
  const [recipe, setRecipe] = useState([]);
  const { user } = useAuthContext();

  // const [favourites, setFav] = useState([]);

  const { id: recipeId } = useParams();

  const { isFav, onFavToggle } = useFav();

  useEffect(() => {
    fetch("api/recipes/")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setRecipe(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [recipeId]);

  // const recipes = recipe.find((r) => r._id === recipeId);
  // console.log(recipes);
  return (
    <>
      <h1>Recipes</h1>
      <Container>
        <Row className="gap-5 justify-start mb-5">
          {recipe.map(
            ({ _id, title, description, rating, numReviews, image }) => {
              const favourite = isFav(_id);

              return (
                <Col key={_id} sm={12} md={6} lg={4} xl={3} className="gap-0">
                  <RecipeItem
                    title={title}
                    _id={_id}
                    description={description}
                    rating={rating}
                    noOfReviews={numReviews}
                    image={image}
                    favourite={favourite}
                    onFavourite={() => onFavToggle(_id)}
                  />
                </Col>
              );
            }
          )}
        </Row>
      </Container>
    </>
  );
};

export default RecipePage;
