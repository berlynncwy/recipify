import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Navigate,
} from "react-router-dom";

import App from "./App.jsx";
import ErrorPage from "./pages/ErrorPage";
import CartPage from "./pages/CartPage";
import MyAccount from "./pages/MyAccount";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProductPage from "./pages/ProductPage";
import SingleProductPage from "./pages/SingleProductPage";
import SingleRecipePage from "./pages/SingleRecipePage";
import { AuthContextProvider } from "./context/AuthContext";
import OrderPage from "./pages/OrderPage";
import FavouritePage from "./pages/FavouritePage";
import NewRecipePage from "./pages/NewRecipePage";
import MyRecipePage from "./pages/MyRecipePage";
import EditRecipePage from "./pages/EditRecipePage.jsx";
import SingleOrderPage from "./pages/SingleOrderPage.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<HomePage />} />
            <Route path="/recipes/:id" element={<SingleRecipePage />} />
            <Route path="/recipes" element={<RecipePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:id" element={<SingleProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/favourites" element={<FavouritePage />} />
            <Route path="/account" element={<MyAccount />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/newrecipe" element={<NewRecipePage />} />
            <Route path="/myrecipes" element={<MyRecipePage />} />
            <Route path="/recipes/edit/:id" element={<EditRecipePage />} />
            <Route path="/orders/:id" element={<SingleOrderPage />} />
            <Route path="/*" element={<Navigate to="/error" replace />} />
            <Route path="/error" element={<ErrorPage />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    </React.StrictMode>
);
