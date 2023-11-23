import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Image, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const MyRecipePage = () => {
    const { user } = useAuthContext();
    const [recipes, setRecipes] = useState([]);
    const myRecipeUrl = window.location.origin + "/api/recipes/my/recipes";

    useEffect(() => {
        if (user == null) return;
        const requestOption = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        };
        fetch(myRecipeUrl, requestOption)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                console.log(json.recipes);
                setRecipes(json.recipes);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [user]);

    let navigate = useNavigate();
    const editHandler = (recipe) => {
        navigate("/recipes/edit/" + recipe._id);
    };

    const deleteRecipeById = async (id) => {
        await fetch(window.location.origin + "/api/recipes/" + id, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        setRecipes((old) => {
            return old.filter((oldRecipe) => oldRecipe._id != id);
        });
    };

    const deleteHandler = (recipe) => {
        if (confirm("Are you sure you want to delete this recipe?")) {
            const id = recipe._id;
            console.log(id);
            deleteRecipeById(id).catch((e) => console.warn(e));
        } else {
            return;
        }
    };

    return (
        <div className="flex-col justify-center flex min-h-screen">
            <div className="flex-col flex">
                <h1>My Recipe Page</h1>
                <Button
                    as={Link}
                    to="/newrecipe"
                    className="button create-recipe align-self-center w-50 pt-1 mb-3 bg-white text-lg font-bold tracking-wider"
                >
                    Create a new recipe
                </Button>
            </div>
            <div className="h-fullscreen flex flex-wrap justify-start max-w-[1000px] m-auto">
                {recipes.map((recipe) => {
                    let updatedate = new Date(recipe.updatedAt);
                    updatedate = updatedate.toLocaleDateString();
                    return (
                        <div className="flex mb-3 p-2" key={recipe._id}>
                            <div>
                                <Image
                                    src={recipe.image[0]}
                                    rounded
                                    className="border-1 object-fit h-20 w-20 mr-3"
                                />
                            </div>

                            <div className="ml-1 mr-10 pt-2 font-medium">
                                Title: {recipe.title}
                                <br></br>
                                Updated on: {updatedate}
                            </div>

                            <div className="mr-1">
                                <button
                                    className="button btn-sm m-2"
                                    onClick={() => editHandler(recipe)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="button delete-btn btn-sm m-2 bg-red"
                                    onClick={() => deleteHandler(recipe)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyRecipePage;
