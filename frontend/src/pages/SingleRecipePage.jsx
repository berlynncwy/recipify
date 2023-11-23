import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFav } from "../hooks/useFav";
import QuantityButton from "../components/QuantityButton";
import { FaShoppingCart } from "react-icons/fa";
import ReviewModal from "../components/ReviewModal";
import Stars from "../components/Stars";

const SingleRecipePage = () => {
    const [recipe, setRecipe] = useState({
        ingredients: [],
        tag: [],
        image: [],
        review: [],
    });
    const { user } = useAuthContext();
    const [author, setAuthor] = useState({});
    const [updatedDate, setUpdatedDate] = useState("");
    const [relevantProducts, setRelevantProducts] = useState([]);
    const { id } = useParams();
    const url = window.location.origin + "/api/recipes/" + id;
    const cartUrl = window.location.origin + "/api/user/cart";
    const relevantUrl = window.location.origin + "/api/products/relevant";
    const [quantity, setQuantity] = useState(1);
    const { isFav, onFavToggle } = useFav();

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setRecipe(res.recipe);
                setAuthor(res.author);

                // format updatedAt date
                let updatedate = new Date(res.author.updatedAt);
                updatedate = updatedate.toLocaleDateString();
                setUpdatedDate(updatedate);
            })
            .catch((error) => {
                console.log(error);
            });

        fetch(relevantUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ recipeId: id }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log("testest");
                console.log(res);
                setRelevantProducts(res.relevantProducts);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const existingReview = useMemo(
        () => recipe.review.find((rev) => rev.user == user._id),
        [recipe, user]
    );
    console.log(existingReview);
    // const totalArray = cart.map((item) => {
    //     return item.quantity * item.price;
    // });
    // const sum = totalArray.reduce((a, b) => a + b, 0);
    const avgRating = useMemo(() => {
        let avgRating = 0;
        if (recipe != null) {
            let totalRating = recipe.review
                .map((review) => review.rating)
                .reduce((sum, rating) => sum + rating, 0);

            if (recipe.review.length > 0 && totalRating > 0) {
                avgRating = totalRating / recipe.review.length;
            }
        }
        return avgRating;
    }, [recipe]);

    const submitHandler = (product) => {
        console.log(quantity);
        console.log(product);

        fetch(cartUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...product, quantity, user }),
        })
            .then((res) => {
                if (res.ok) {
                    res.json().then((res) => console.log(res.message));
                    alert("Product has been added to cart.");
                } else {
                    res.json().then((res) => console.log(res.error));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="min-h-screen">
            <Row>
                <Col>
                    <h1 className="tracking-wide">{recipe.title}</h1>
                    <p>{recipe.description}</p>
                    <div className="m-3 flex">
                        <div className="flex flex-1">
                            <Rating
                                rating={avgRating}
                                noOfReviews={recipe.review.length}
                            ></Rating>
                            {user && (
                                <>
                                    <div className="ml-4 mr-4">
                                        <ReviewModal
                                            review={existingReview}
                                            recipeId={recipe._id}
                                        />
                                    </div>
                                    <Button
                                        className="btn-sm btn-outline-danger"
                                        onClick={() => {
                                            console.log("object");
                                            onFavToggle(id);
                                        }}
                                    >
                                        {isFav(id) ? "♥" : "♡"}
                                    </Button>
                                </>
                            )}
                        </div>

                        <p className="author">
                            Author: {author.firstName + " " + author.lastName}
                            <br></br>
                            Updated: {updatedDate}
                        </p>
                    </div>
                    <div>
                        <Image
                            src={recipe.image}
                            alt={recipe.name}
                            className="mt-4 mb-4 border-1"
                        />
                        <div className="flex justify-center">
                            <p className="pl-2 font-semibold">
                                Cook Time: {recipe.cookTime} minutes
                            </p>
                            <p className="pl-2 font-semibold">
                                Servings: {recipe.servings}
                            </p>
                        </div>
                        <div className="p-2">
                            <p className="font-semibold underline mb-1">
                                Tags{" "}
                            </p>
                            <div className="flex">
                                {recipe.tag.map((tag, i) => {
                                    return (
                                        <div
                                            className="bg-blue-100 mr-2 rounded pl-1 pr-1"
                                            key={i}
                                        >
                                            <p className="flex pl-1 pr-1 tracking-wide">
                                                {tag.toLowerCase()}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <h3 className="tracking-wide text-left">
                            Instructions
                        </h3>
                        <p className="p-2 pb-4 whitespace-pre-line recipe-instructions">
                            {recipe.instructions}
                        </p>
                    </div>
                    <div className="pb-3">
                        <h3 className="tracking-wide text-left">
                            Nutrition Facts
                        </h3>
                        <ul className="flex justify-between">
                            {recipe.nutritionFact != null && (
                                <>
                                    <li className="pl-2 font-semibold">
                                        Calories:{" "}
                                        {recipe.nutritionFact.calories}
                                    </li>
                                    <li className="pl-2 font-semibold">
                                        Carbohydrates:{" "}
                                        {recipe.nutritionFact.carbohydrates}
                                    </li>
                                    <li className="pl-2 font-semibold">
                                        Fat: {recipe.nutritionFact.fats}
                                    </li>
                                    <li className="pl-2 font-semibold">
                                        Protein: {recipe.nutritionFact.protein}
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                    <div>
                        <h3 className="tracking-wide text-left">Reviews</h3>
                        <div className="overflow overflow-scroll h-60">
                            {recipe.review.map((review) => {
                                return (
                                    <div className="border-1 ml-3 rounded-lg mb-2 scroll">
                                        <Row className="pl-2 pr-2 pt-2">
                                            <Col md={2}>Rating</Col>
                                            <Col>
                                                <Stars rating={review.rating} />
                                            </Col>
                                        </Row>
                                        <Row className="pl-2 pr-2 pt-2">
                                            <Col md={2}>Comment</Col>
                                            <Col>{review.comment}</Col>
                                        </Row>
                                        <Row className="p-2 italic">
                                            <Col className="font-extrabold text-xs">
                                                {review.name}
                                            </Col>
                                        </Row>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Col>

                <Col>
                    <div>
                        <h3 className="center tracking-wide bg-gray-100 mt-5 p-3">
                            Ingredients needed
                        </h3>
                        <ul className="ingredient-list tracking-wide">
                            {recipe.ingredients.map((ingredient) => {
                                return (
                                    <li key={ingredient._id}>
                                        {ingredient.name} {ingredient.quantity}{" "}
                                        {ingredient.unit}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="bg-gray-100 mt-3 p-3">
                        <h3 className="center tracking-wide">Add to Cart</h3>
                    </div>

                    <div className="flex-wrap flex">
                        {relevantProducts.filter((product) => {
                            return product.stock > 0;
                        }).length == 0 && (
                            <p className="italic tracking-wide text-center w-full mt-3">
                                No relevant products found for this recipe /
                                products are out of stock ☹︎
                            </p>
                        )}
                        {relevantProducts
                            .filter((product) => {
                                return product.stock > 0;
                            })
                            .map((product) => (
                                <div
                                    className="flex pt-2 pl-1 mr-2"
                                    key={product._id}
                                >
                                    <Image
                                        src={product.image}
                                        rounded
                                        className="w-40 h-40 border-1 mr-3"
                                    />
                                    <div className="flex-col">
                                        <div className="pr-5 recipe-title pt-2">
                                            {product.name}
                                        </div>
                                        <div className="details-text">
                                            {product.unitDetails}
                                        </div>
                                        <div className="details-text">
                                            ${product.price.toFixed(2)}
                                        </div>
                                        <div>
                                            <QuantityButton
                                                value={quantity}
                                                setValue={setQuantity}
                                                min={0}
                                                max={10}
                                            />
                                        </div>
                                        <div>
                                            <button
                                                className="cart-button btn-sm mt-1 flex"
                                                type="submit"
                                                onClick={() =>
                                                    submitHandler(product)
                                                }
                                                disabled={
                                                    quantity === 0 ||
                                                    product.stock <= 0
                                                }
                                            >
                                                <p className="align-self-center pr-1">
                                                    Add to Cart
                                                </p>
                                                <FaShoppingCart className="align-self-center" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default SingleRecipePage;
