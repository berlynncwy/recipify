import bodyParser from "body-parser";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const { dispatch } = useAuthContext();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    let navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();

        if (email == "" || password == "") {
            setErrorMsg("** All fields must be filled.");
        } else {
            fetch("api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })
                .then((res) => {
                    if (res.ok) {
                        res.json().then((json) => {
                            console.log(json);
                            localStorage.setItem("user", JSON.stringify(json));
                            dispatch({ type: "login", payload: json });
                            // clear input
                            setEmail("");
                            setPassword("");
                            navigate("/recipes");
                        });
                    } else {
                        res.json().then((msg) => setErrorMsg(msg.error));
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    };
    return (
        <>
            <div>
                <p className="error-msg pt-4">{errorMsg}</p>
            </div>
            <form
                onSubmit={submitHandler}
                className="mx-auto mb-0 mt-8 max-w-md space-y-4"
            >
                <div>
                    <label htmlFor="email" className="sr-only">
                        Email
                    </label>

                    <div className="relative">
                        <input
                            type="email"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>

                    <div className="relative">
                        <input
                            type="password"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Do not have an account?
                        <Link to="/signup" className="ml-1 underline">
                            Sign up here!
                        </Link>
                    </p>

                    <button
                        type="submit"
                        onClick={submitHandler}
                        className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-600"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </>
    );
}

export default Login;
