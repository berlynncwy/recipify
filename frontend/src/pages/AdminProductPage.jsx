import React, { useState, useEffect } from "react";
import ProductForm from "../components/ProductForm";
import { Tab, Tabs, Row, Col, Modal, ModalBody } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
import { IoIosClose } from "react-icons/io";

const AdminProductPage = () => {
    const { user } = useAuthContext();
    const [keyword, setKeyword] = useState("");
    const [products, setProducts] = useState([]);
    const [modalProduct, setModalProduct] = useState("");

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleShow = () => setOpen(true);

    const refresh = () => {
        fetch(window.location.origin + "/api/admin/products")
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log("======success=======");
                console.log(res);
                setProducts(res.products);
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
                    setProducts(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const editHandler = (product) => {
        console.log(product);
        setModalProduct(product);
        handleShow();
    };

    const removeHandler = (product) => {
        if (confirm("Are you sure you want to delete this recipe?")) {
            const id = product._id;
            console.log(id);
            deleteProductById(id).catch((e) => console.warn(e));
        } else {
            return;
        }
    };

    const deleteProductById = async (id) => {
        await fetch(window.location.origin + "/api/admin/" + id, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        setProducts((old) => {
            return old.filter((oldProduct) => oldProduct._id != id);
        });
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
                                        refresh();
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
                        <div className="justify-start mb-4 items-center">
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
                        </div>
                        <div className="flex flex-wrap ">
                            {products.map((product) => {
                                return (
                                    <div
                                        className="w-[400px] flex gap-x-3 gap-y-2"
                                        key={product._id}
                                    >
                                        <img
                                            src={product.image}
                                            className="w-20 h-20"
                                        ></img>
                                        <div className="w-full self-center">
                                            <Row>
                                                <Col
                                                    className="text-left text-sm"
                                                    xs={3}
                                                >
                                                    Name:
                                                </Col>
                                                <Col
                                                    className="text-left text-sm"
                                                    xs={8}
                                                >
                                                    {product.name}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col
                                                    className="text-left text-sm"
                                                    xs={3}
                                                >
                                                    Price:{" "}
                                                </Col>
                                                <Col
                                                    className="text-left text-sm"
                                                    xs={8}
                                                >
                                                    ${product.price.toFixed(2)}
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col
                                                    className="text-left text-sm"
                                                    xs={3}
                                                >
                                                    Stock:
                                                </Col>
                                                <Col
                                                    className="text-left text-sm"
                                                    xs={8}
                                                >
                                                    {product.stock}{" "}
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Tab>
                <Tab
                    eventKey="edit"
                    title="Edit / remove products"
                    className="p-3"
                >
                    <div className="justify-start mb-4 items-center">
                        <Modal
                            show={open}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            <IoIosClose
                                type="button"
                                onClick={handleClose}
                                className="w-8 h-8 mt-3 ml-3 mr-3"
                            ></IoIosClose>
                            <ModalBody className="pl-12 pt-4">
                                <ProductForm
                                    product={modalProduct}
                                    onSubmit={(newProduct) => {
                                        fetch(
                                            window.location.origin +
                                                "/api/admin/edit-product/" +
                                                modalProduct._id,
                                            {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type":
                                                        "application/json",
                                                    Authorization: `Bearer ${user.token}`,
                                                },
                                                body: JSON.stringify(
                                                    newProduct
                                                ),
                                            }
                                        )
                                            .then((res) => {
                                                if (res.ok) {
                                                    alert("Product updated.");
                                                    setOpen(false);
                                                    refresh();
                                                } else {
                                                }
                                            })
                                            .catch((err) => {
                                                console.log("=====error=====");
                                                console.warn(err);
                                            });
                                    }}
                                />
                            </ModalBody>
                        </Modal>
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
                    </div>
                    <Row className="font-bold">
                        <Col xs={1}>Image</Col>
                        <Col xs={2}>Supplier ID</Col>
                        <Col xs={2}>Name</Col>
                        <Col xs={2}>Brand</Col>
                        <Col xs={1}>Unit Details</Col>
                        <Col xs={1}>Price</Col>
                        <Col xs={1}>Stock</Col>
                    </Row>
                    <Row>
                        {products.map((product) => {
                            return (
                                <div key={product._id}>
                                    <Row className="font-medium text-base">
                                        <Col xs={1}>
                                            <img
                                                src={product.image}
                                                className="w-20 h-20"
                                            ></img>
                                        </Col>
                                        <Col className="break-all" xs={2}>
                                            {product.supplier}
                                        </Col>
                                        <Col className="break-words" xs={2}>
                                            {product.name}
                                        </Col>
                                        <Col className="break-words" xs={2}>
                                            {product.brand}
                                        </Col>
                                        <Col xs={1}>{product.unitDetails}</Col>
                                        <Col xs={1}>{product.price}</Col>
                                        <Col xs={1}>{product.stock}</Col>
                                        <Col className="items-center">
                                            <button
                                                className="border-1 border-gray-300 rounded-xl p-1 m-1 w-20 bg-gray-200 hover:bg-gray-300"
                                                onClick={() =>
                                                    editHandler(product)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="border-1 border-rose-300 rounded-xl p-1 ml-1 mr-1 w-20 bg-rose-200 hover:bg-rose-300"
                                                onClick={() =>
                                                    removeHandler(product)
                                                }
                                            >
                                                Remove
                                            </button>
                                        </Col>
                                    </Row>
                                </div>
                            );
                        })}
                    </Row>
                </Tab>
            </Tabs>
        </div>
    );
};

export default AdminProductPage;
