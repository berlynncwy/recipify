import { AuthContext } from "../context/AuthContext.jsx";
import { createContext, useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error("useAuthContext can only be used inside an AuthContextProvider");
    }
    return context;
};
