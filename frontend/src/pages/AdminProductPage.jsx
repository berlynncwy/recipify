import React, { useState, useEffect } from "react";
import ProductForm from "../components/ProductForm";
import { Tab, Tabs, Row, Col } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";

const AdminProductPage = () => {
    const { user } = useAuthContext();
    const [keyword, setKeyword] = useState("");
    const [product, setProduct] = useState([]);

    const refresh = () => {
        fetch(window.location.origin + "/api/admin/products")
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log("======success=======");
                console.log(res);
                setProduct(res.products);
                setKeyword("");
            })
            .catch((err) => {
                console.log("======failure=======");
                console.log(err);
            });
    };
    useEffect(refresh, []);

    const keywordHandler = (event) => {
        const search = event.target.value;
        setKeyword(search);
    };

    const searchHandler = () => {
        if (keyword != null) {
            fetch(
                window.location.origin +
                    "/api/products/getproduct/?keyword=" +
                    keyword
            )
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    console.log("======success=======");
                    console.log(res);
                    setProduct(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    return (
        <div className="min-h-screen">
            <h1>Product Management </h1>
            <Tabs
                defaultActiveKey="add"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
            >
                <Tab
                    eventKey="add"
                    title="Add products"
                    className="p-3 justify-center"
                >
                    <ProductForm
                        onSubmit={(newProduct) => {
                            const body = JSON.stringify(newProduct);
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
                                window.location.origin +
                                    "/api/admin/add-product",
                                requestOptions
                            )
                                .then((res) => {
                                    console.log(res);
                                    if (res.ok) {
                                        alert("Product created.");
                                    } else {
                                    }
                                })
                                .catch((err) => {
                                    console.log("=====error=====");
                                    console.log(err);
                                });
                        }}
                    />
                </Tab>
                <Tab eventKey="search" title="Search products" className="p-3">
                    <div>
                        <Row className="justify-start mb-4 items-center">
                            Search product:
                            <input
                                type="text"
                                value={keyword}
                                className="border-1 rounded w-1/4 ml-2 border-gray-400 p-1 font-light"
                                onChange={keywordHandler}
                            ></input>
                            <button
                                className="button rounded-lg w-auto h-auto ml-2"
                                onClick={() => {
                                    searchHandler();
                                }}
                            >
                                Search
                            </button>
                            <button
                                className="button rounded-lg w-auto h-auto ml-2"
                                onClick={refresh}
                            >
                                Reset
                            </button>
                        </Row>
                    </div>
                </Tab>
                <Tab eventKey="edit" title="Edit products" className="p-3">
                    Tab content for Contact
                </Tab>
                <Tab
                    eventKey="remove"
                    title="Remove products"
                    className="p-3"
                ></Tab>
            </Tabs>
        </div>
    );
};

export default AdminProductPage;
