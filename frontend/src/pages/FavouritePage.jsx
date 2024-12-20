import React, { useEffect, useState } from "react";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import RecipeItem from "../components/RecipeItem";
import { useFav } from "../hooks/useFav";
import { useAuthContext } from "../hooks/useAuthContext";

const FavouritePage = () => {
    const [fav, setFav] = useState([]);
    const { user } = useAuthContext();
    const { isFav, onFavToggle } = useFav();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user == null) return;
        const requestOption = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        };
        setLoading(true);
        fetch(
            window.location.origin + "/api/recipes/favourites/recipes",
            requestOption
        )
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                if (json.favouriteRecipes) {
                    console.log(json);
                    setFav(json.favouriteRecipes);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setLoading(false));
    }, [user]);
    return (
        <>
            <h1>Favourites ♥︎</h1>
            <Container>
                <div className="flex justify-center">
                    {loading ? (
                        <Spinner />
                    ) : (
                        fav.length == 0 && (
                            <p className="italic">No favourites.</p>
                        )
                    )}
                </div>
                <Row className="gap-5 justify-start mb-5 min-h-screen">
                    {fav.map(
                        ({
                            _id,
                            title,
                            description,
                            rating,
                            numReviews,
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

export default FavouritePage;
