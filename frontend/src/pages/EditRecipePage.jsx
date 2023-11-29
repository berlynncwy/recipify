import React, { useEffect, useState } from "react";
import RecipeForm from "../components/RecipeForm";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const EditRecipePage = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [recipe, setRecipe] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(window.location.origin + "/api/recipes/" + id, {
            method: "GET",
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                console.log(json);
                setRecipe(json.recipe);
            });
    }, []);

    if (recipe == null) {
        return <></>;
    }

    if (user == null) {
        return <></>;
        // } else if (user != author )
    }
    return (
        <div>
            <h1>Edit Recipe Page</h1>
            <RecipeForm
                recipe={recipe}
                onSubmit={(newRecipe) => {
                    console.log(newRecipe);
                    fetch(
                        window.location.origin +
                            "/api/recipes/edit/" +
                            recipe._id,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${user.token}`,
                            },
                            body: JSON.stringify(newRecipe),
                        }
                    )
                        .then((res) => {
                            if (res.ok) {
                                alert("Recipe updated.");
                                navigate("/recipes/" + newRecipe._id);
                            } else {
                            }
                        })
                        .catch((err) => {
                            console.log("=====error=====");
                            console.warn(err);
                        });
                }}
            />
        </div>
    );
};

export default EditRecipePage;
