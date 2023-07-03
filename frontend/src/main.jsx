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
import Cart from "./pages/Cart";
import MyAccount from "./pages/MyAccount";
import Product from "./components/Product";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/recipe/:id/" element={<RecipePage />} />
      <Route path="/products" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/account" element={<MyAccount />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/*" element={<Navigate to="/error" replace />} />
      <Route path="/error" element={<ErrorPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
