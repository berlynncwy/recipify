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
    const { id: recipeId } = useParams();
    const { isFav, onFavToggle } = useFav();
    const [keyword, setKeyword] = useState("");

    const refresh = () => {
        fetch("api/recipes/")
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                setRecipe(json);
                setKeyword("");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(refresh, [recipeId]);

    const keywordHandler = (event) => {
        const search = event.target.value;
        setKeyword(search);
    };

    const searchHandler = () => {
        if (keyword != null) {
            fetch(
                window.location.origin +
                    "/api/recipes/getrecipe/?keyword=" +
                    keyword
            )
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    console.log("======success=======");
                    console.log(res);
                    setRecipe(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    return (
        <>
            <h1>Recipes</h1>
            <Container>
                <Row className="gap-y-11 justify-center mb-5">
                    <Row className="justify-center mb-4 items-center">
                        Search recipe:
                        <input
                            type="text"
                            value={keyword}
                            className="border-1 rounded w-1/4 ml-2 border-gray-400 p-1 font-light"
                            onChange={keywordHandler}
                        ></input>
                        <button
                            className="button rounded-lg w-auto h-auto ml-2"
                            onClick={() => {
                                searchHandler();
                            }}
                        >
                            Search
                        </button>
                        <button
                            className="button rounded-lg w-auto h-auto ml-2"
                            onClick={refresh}
                        >
                            Reset
                        </button>
                    </Row>
                    {recipe.map(
                        ({
                            _id,
                            title,
                            description,
                            rating,
                            review,
                            noOfReviews,
                            image,
                        }) => {
                            const favourite = isFav(_id);
                            const avgRating = (() => {
                                let avgRating = 0;
                                if (review != null) {
                                    let totalRating = review
                                        .map((review) => review.rating)
                                        .reduce(
                                            (sum, rating) => sum + rating,
                                            0
                                        );

                                    if (review.length > 0 && totalRating > 0) {
                                        avgRating = totalRating / review.length;
                                    }
                                }
                                return avgRating;
                            })();
                            return (
                                <Col
                                    key={_id}
                                    sm={12}
                                    md={6}
                                    lg={4}
                                    xl={3}
                                    className="gap-0"
                                >
                                    <RecipeItem
                                        title={title}
                                        _id={_id}
                                        description={description}
                                        rating={avgRating}
                                        noOfReviews={review.length}
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
