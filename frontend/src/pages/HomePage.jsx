import { Row, Col } from "react-bootstrap";
import { useEffect, useState, useMemo } from "react";

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
                        const avgRating = (() => {
                            let avgRating = 0;
                            if (review != null) {
                                let totalRating = review
                                    .map((review) => review.rating)
                                    .reduce((sum, rating) => sum + rating, 0);

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
        </>
    );
};

export default HomePage;
