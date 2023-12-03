import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminOrderPage = () => {
    const { user } = useAuthContext();
    const [keyword, setKeyword] = useState("");
    const [objects, setObjects] = useState([]);
    const [orders, setOrders] = useState([]);

    const refresh = () => {
        if (user != null) {
            fetch(window.location.origin + "/api/admin/orders", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((json) => setObjects(json))
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    useEffect(refresh, [user]);

    const keywordHandler = (event) => {
        const search = event.target.value;
        setKeyword(search);
    };

    const searchHandler = () => {
        if (keyword != null) {
            fetch(
                window.location.origin +
                    "/api/admin/getorder/?keyword=" +
                    keyword
            )
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    console.log("======success=======");
                    console.log(res);
                    setOrders(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    return (
        <div className="min-h-screen">
            <h1>Orders</h1>
            <Tabs>
                <Tab eventKey="view" title="Order history" className="p-3">
                    <div className="justify-center min-h-screen">
                        <Row className="justify-center font-medium">
                            <Col
                                md={3}
                                className="border-t border-b border-l pt-1 pb-1"
                            >
                                Name
                            </Col>
                            <Col
                                md={3}
                                className="border-t border-b border-l pt-1 pb-1"
                            >
                                Order No.
                            </Col>
                            <Col
                                md={1}
                                className="border-t border-b border-l pt-1 pb-1"
                            >
                                Order Date
                            </Col>
                            <Col
                                md={2}
                                className="border-t border-b border-l pt-1 pb-1"
                            >
                                Total Amount
                            </Col>
                            <Col
                                md={2}
                                className="border-t border-b border-l border-r pt-1 pb-1"
                            >
                                Payment Status
                            </Col>
                        </Row>
                        {objects.map((object) => {
                            const { order, session, customer } = object;
                            let updatedate = new Date(order.updatedAt);
                            updatedate = updatedate.toLocaleDateString();
                            console.log(object);
                            return (
                                <Row
                                    key={order._id}
                                    className="flex justify-center h-8"
                                >
                                    <Col md={3} className="border-b border-l">
                                        <div className="flex items-center h-full">
                                            <p>
                                                {customer.firstName}{" "}
                                                {customer.lastName}
                                            </p>
                                        </div>
                                    </Col>
                                    <Col md={3} className="border-b border-l">
                                        <div className="flex items-center h-full">
                                            <Link
                                                className="order-link underline"
                                                to={"/orders/" + order._id}
                                            >
                                                {order._id}
                                            </Link>
                                        </div>
                                    </Col>
                                    <Col md={1} className="border-b border-l">
                                        <div className="flex items-center h-full">
                                            {updatedate}
                                        </div>
                                    </Col>
                                    <Col md={2} className="border-b border-l">
                                        <div className="flex items-center h-full">
                                            ${" "}
                                            {(
                                                session.amount_total / 100
                                            ).toFixed(2)}
                                        </div>
                                    </Col>
                                    <Col
                                        md={2}
                                        className="border-b border-l border-r flex gap-x-5"
                                    >
                                        <div className="flex items-center h-full">
                                            {session.status == "expired"
                                                ? "cancelled"
                                                : session.payment_status}
                                        </div>
                                    </Col>
                                </Row>
                            );
                        })}
                    </div>
                </Tab>
                <Tab eventKey="search" title="Search orders" className="p-3">
                    <div className="justify-start mb-4 items-center">
                        Search order:
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
                    <div className="justify-center min-h-screen">
                        <Row className="justify-center font-medium">
                            <Col
                                md={3}
                                className="border-t border-b border-l pt-1 pb-1"
                            >
                                Name
                            </Col>
                            <Col
                                md={3}
                                className="border-t border-b border-l pt-1 pb-1"
                            >
                                Order No.
                            </Col>
                            <Col
                                md={1}
                                className="border-t border-b border-l pt-1 pb-1"
                            >
                                Order Date
                            </Col>
                            <Col
                                md={2}
                                className="border-t border-b border-l pt-1 pb-1"
                            >
                                Total Amount
                            </Col>
                            <Col
                                md={2}
                                className="border-t border-b border-l border-r pt-1 pb-1"
                            >
                                Payment Status
                            </Col>
                        </Row>

                        {orders.map((object) => {
                            const { order, session, customer } = object;
                            let updatedate = new Date(order.updatedAt);
                            updatedate = updatedate.toLocaleDateString();
                            console.log(object);
                            return (
                                <Row
                                    key={order._id}
                                    className="flex justify-center h-8"
                                >
                                    <Col md={3} className="border-b border-l">
                                        <div className="flex items-center h-full">
                                            <p>
                                                {customer.firstName}{" "}
                                                {customer.lastName}
                                            </p>
                                        </div>
                                    </Col>
                                    <Col md={3} className="border-b border-l">
                                        <div className="flex items-center h-full">
                                            <Link
                                                className="order-link underline"
                                                to={"/orders/" + order._id}
                                            >
                                                {order._id}
                                            </Link>
                                        </div>
                                    </Col>
                                    <Col md={1} className="border-b border-l">
                                        <div className="flex items-center h-full">
                                            {updatedate}
                                        </div>
                                    </Col>
                                    <Col md={2} className="border-b border-l">
                                        <div className="flex items-center h-full">
                                            ${" "}
                                            {(
                                                session.amount_total / 100
                                            ).toFixed(2)}
                                        </div>
                                    </Col>
                                    <Col
                                        md={2}
                                        className="border-b border-l border-r flex gap-x-5"
                                    >
                                        <div className="flex items-center h-full">
                                            {session.status == "expired"
                                                ? "cancelled"
                                                : session.payment_status}
                                        </div>
                                    </Col>
                                </Row>
                            );
                        })}
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
};

export default AdminOrderPage;
