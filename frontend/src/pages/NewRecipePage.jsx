import React from "react";
import RecipeForm from "../components/RecipeForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const NewRecipePage = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    return (
        <div>
            <h1>Add a new recipe</h1>
            <RecipeForm
                onSubmit={(newRecipe) => {
                    const body = JSON.stringify(newRecipe);
                    const requestOptions = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${user.token}`,
                        },
                        body: body,
                    };
                    console.log(body);

                    fetch(
                        window.location.origin + "/api/recipes/newrecipe",
                        requestOptions
                    )
                        .then((res) => {
                            if (res.ok) {
                                alert("Recipe created.");
                                navigate("/myrecipes");
                            } else {
                            }
                        })
                        .catch((err) => {
                            console.log("=====error=====");
                            console.log(err);
                        });
                }}
            />
        </div>
    );
};

export default NewRecipePage;
