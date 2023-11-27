import React, { useState, useEffect } from "react";
import { Tab, Tabs, Row, Col, Modal, ModalBody } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
import { IoIosClose } from "react-icons/io";
import SupplierForm from "../components/SupplierForm";

const AdminSupplierPage = () => {
    const { user } = useAuthContext();
    const [keyword, setKeyword] = useState("");
    const [suppliers, setSuppliers] = useState([]);
    const [modalSupplier, setModalSupplier] = useState("");
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleShow = () => setOpen(true);

    const refresh = () => {
        fetch(window.location.origin + "/api/admin/suppliers")
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log(res);
                setSuppliers(res.suppliers);
                setKeyword("");
            })
            .catch((err) => {
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
                    "/api/admin/getsupplier/?keyword=" +
                    keyword
            )
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    console.log(res);
                    setSuppliers(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const editHandler = (supplier) => {
        console.log(supplier);
        setModalSupplier(supplier);
        handleShow();
    };

    const removeHandler = (supplier) => {
        if (confirm("Are you sure you want to delete this supplier?")) {
            const id = supplier._id;
            console.log(id);
            deleteSupplierbyId(id).catch((err) => console.warn(err));
        } else {
            return;
        }
    };

    const deleteSupplierbyId = async (id) => {
        await fetch(window.location.origin + "/api/admin/supplier/" + id, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        setSuppliers((old) => {
            return old.filter((oldSupplier) => oldSupplier._id != id);
        });
    };
    return (
        <div className="min-h-screen">
            <h1>Supplier Management</h1>
            <Tabs defaultActiveKey="add" transition={false} className="mb-3">
                <Tab
                    eventKey="add"
                    title="Add suppliers"
                    className="p-3 justify-center"
                >
                    <SupplierForm
                        onSubmit={(newSupplier) => {
                            const body = JSON.stringify(newSupplier);
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
                                    "/api/admin/add-supplier",
                                requestOptions
                            )
                                .then((res) => {
                                    console.log(res);
                                    if (res.ok) {
                                        alert("Supplier created.");
                                        refresh();
                                    } else {
                                    }
                                })
                                .catch((err) => {
                                    console.log("=======error========");
                                    console.log(err);
                                });
                        }}
                    />
                </Tab>
                <Tab
                    eventKey="edit/remove"
                    title="Edit / Remove Suppliers"
                    className="p-3 justify-center"
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
                                <SupplierForm
                                    supplier={modalSupplier}
                                    onSubmit={(newSupplier) => {
                                        fetch(
                                            window.location.origin +
                                                "/api/admin/edit-supplier/" +
                                                modalSupplier._id,
                                            {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type":
                                                        "application/json",
                                                    Authorization: `Bearer ${user.token}`,
                                                },
                                                body: JSON.stringify(
                                                    newSupplier
                                                ),
                                            }
                                        )
                                            .then((res) => {
                                                if (res.ok) {
                                                    alert("Supplier updated.");
                                                    handleClose();
                                                    refresh();
                                                } else {
                                                }
                                            })
                                            .catch((err) => {
                                                console.log(
                                                    "======error======"
                                                );
                                                console.warn(err);
                                            });
                                    }}
                                />
                            </ModalBody>
                        </Modal>
                        Search supplier:
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
                    <Row className="font-bold mb-2">
                        <Col xs={2}>Supplier ID</Col>
                        <Col xs={2}>Name</Col>
                        <Col xs={2}>Contact Person</Col>
                        <Col xs={1}>Mobile</Col>
                        <Col xs={2}>Email</Col>
                        <Col xs={2}>Address</Col>
                    </Row>
                    <Row>
                        {suppliers.map((supplier) => {
                            return (
                                <div key={supplier._id} className="mb-3">
                                    <Row className="font-medium text-base">
                                        <Col className="break-all" xs={2}>
                                            {supplier._id}
                                        </Col>
                                        <Col className="break-words" xs={2}>
                                            {supplier.name}
                                        </Col>
                                        <Col className="break-words" xs={2}>
                                            {supplier.contactPerson}
                                        </Col>
                                        <Col xs={1}>{supplier.mobile}</Col>
                                        <Col xs={2}>{supplier.email}</Col>
                                        <Col xs={2}>
                                            {supplier.address.street}{" "}
                                            {supplier.address.unitNo}{" "}
                                            {supplier.address.postalCode}
                                        </Col>

                                        <Col className="items-center">
                                            <button
                                                className="border-1 border-gray-300 rounded-xl p-1 m-1 w-20 bg-gray-200 hover:bg-gray-300"
                                                onClick={() =>
                                                    editHandler(supplier)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="border-1 border-rose-300 rounded-xl p-1 ml-1 mr-1 w-20 bg-rose-200 hover:bg-rose-300"
                                                onClick={() =>
                                                    removeHandler(supplier)
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

export default AdminSupplierPage;
