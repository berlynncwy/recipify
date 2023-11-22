import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

import RecipeItem from "../components/RecipeItem";
import { useFav } from "../hooks/useFav";

const HomePage = () => {
    const [recipe, setRecipe] = useState([]);
    const { isFav, onFavToggle } = useFav();
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
            <Row className="gap-y-11">
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
                                    rating={rating}
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
        </>
    );
};

export default HomePage;
