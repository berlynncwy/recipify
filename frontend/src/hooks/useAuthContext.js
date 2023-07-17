import { AuthContext } from "../context/AuthContext";
import { createContext, useContext } from "react";

const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error("useAuthContext can only be used inside an AuthContextProvider");
    }
    return context;
};

export default useAuthContext;