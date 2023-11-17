import { AuthContext } from "../context/AuthContext.jsx";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuthContext } from "./useAuthContext.js";

export const useFav = () => {
    const { user } = useAuthContext();

    const [favourites, setFav] = useState([]);

    useEffect(() => {
        if (user == null) return;

        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        fetch(window.location.origin + "/api/recipes/favourites/ids", requestOptions)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                if (json.favourites != null) {
                    setFav(json.favourites);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [user]);


    const onFavourite = useCallback((id) => {
        if (user == null) return;
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                recipeID: id,
            }),
        };
        fetch(window.location.origin + "/api/recipes/favourites", requestOptions)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                if (json.favourites != null) {
                    setFav(json.favourites);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [user]);


    const favSet = useMemo(() => {
        const set = new Set();
        console.log(favourites);
        for (const id of favourites) {
            set.add(id);
        }
        return set;
    }, [favourites]);

    const isFav = useCallback((id) => {
        const isFavourite = user ? favSet.has(id) : undefined;
        return isFavourite;
    }, [user, favSet]);


    return { fav: favourites, isFav, favSet, onFavToggle: onFavourite };
};
