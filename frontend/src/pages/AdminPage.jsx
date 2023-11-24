import React from "react";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const AdminPage = () => {
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const auth = useAuthContext();
    const [user, setUser] = useState({});
    const [customer, setCustomer] = useState(null);
    const [checked, setChecked] = useState(false);

    const handleEmailInput = (event) => {
        const input = event.target.value;
        setEmail(input);
    };

    const searchHandler = () => {
        setErrorMsg("");
        if (email != null) {
            fetch(
                window.location.origin + "/api/admin/getemail/?email=" + email
            )
                .then((res) => {
                    return res.json();
                })
                .then((json) => {
                    if (json.user == null) {
                        setErrorMsg("Email not found");
                    }

                    setUser(json.user);
                    setChecked(json.user.isAdmin);
                    setCustomer(json.customer);
                    console.log(json.user);
                    console.log(json.customer);
                })
                .catch((err) => console.log(err));
        }
    };

    const handleSubmit = () => {
        console.log("first");
        if (user != null && auth.user != null) {
            const id = user._id;
            const url = window.location.origin + "/api/admin/make-admin";
            fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, isAdmin: checked }),
            })
                .then((res) => {
                    alert("User is now an admin.");
                    setUser("");
                    setCustomer(null);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="min-h-screen">
            <h1>Admin Registration</h1>
            <div>
                <Row className="flex justify-center p-4 items-center">
                    <Col md={1} className="text-right align-baseline ">
                        Email:
                    </Col>
                    <Col md={4}>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailInput}
                            className="border-1 rounded w-3/4 p-2 mr-3"
                        ></input>
                        <button
                            className="button w-auto"
                            onClick={searchHandler}
                        >
                            Search
                        </button>
                    </Col>
                </Row>
            </div>
            {{ errorMsg } && (
                <div className="error-msg flex justify-center">{errorMsg}</div>
            )}
            {customer != null && (
                <div className="flex justify-center p-5">
                    <div className="border-1 w-5/12 rounded-xl p-3">
                        <Row className="mb-1 justify-center flex">
                            <Col className="text-right p-1" md={3}>
                                User ID :{" "}
                            </Col>
                            <Col md={6} className="p-1">
                                {user._id}
                            </Col>
                        </Row>
                        <Row className="mb-1 justify-center flex">
                            <Col className="text-right p-1" md={3}>
                                Name :{" "}
                            </Col>
                            <Col md={6} className="p-1">
                                {customer.firstName} {customer.lastName}
                            </Col>
                        </Row>
                        <Row className="mb-1 justify-center flex">
                            <Col className="text-right" md={3}>
                                Contact No :{" "}
                            </Col>
                            <Col md={6} className="p-1">
                                {customer.mobile}
                            </Col>
                        </Row>
                        <Row className="p-2 justify-center flex">
                            <p className=" text-center">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={checked}
                                    onChange={() => setChecked((old) => !old)}
                                ></input>
                                Make user an administrator
                            </p>
                        </Row>
                        <Row className="flex justify-center p-4">
                            <button
                                className="button w-auto bg-red-40"
                                onClick={handleSubmit}
                            >
                                Confirm
                            </button>
                        </Row>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
