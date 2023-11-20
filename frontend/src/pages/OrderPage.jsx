import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderPage = () => {
    const url = window.location.origin + "/api/payment/orders";
    const { user } = useAuthContext();
    const [objects, setObjects] = useState([]);

    const refresh = () => {
        if (user == null) return;
        const requestOption = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
        };
        fetch(url, requestOption)
            .then((res) => res.json())
            .then((json) => setObjects(json))
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(refresh, [user]);

    const cancelHandler = (session) => {
        const requestOption = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                session,
            }),
        };
        fetch(
            window.location.origin + "/api/payment/cancel-order",
            requestOption
        ).then(refresh);
    };
    return (
        <div>
            <h1>Order History</h1>
            <div className="justify-center min-h-screen">
                <Row className="justify-center font-medium">
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
                    const { order, session } = object;
                    let updatedate = new Date(order.updatedAt);
                    updatedate = updatedate.toLocaleDateString();
                    return (
                        <Row
                            key={order._id}
                            className="flex justify-center h-8"
                        >
                            <Col md={3} className="border-b border-l">
                                <div className="flex items-center h-full">
                                    <Link to={"/orders/" + order._id}>
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
                                    $ {(session.amount_total / 100).toFixed(2)}
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

                                    {session.status == "open" &&
                                        session.payment_status == "unpaid" && (
                                            <div className="flex ml-5">
                                                <Col>
                                                    <button
                                                        className="payment-status-btn mr-2"
                                                        onClick={() =>
                                                            window.open(
                                                                session.url,
                                                                "_blank"
                                                            )
                                                        }
                                                    >
                                                        Pay
                                                    </button>
                                                </Col>
                                                <Col>
                                                    <button
                                                        className="payment-status-btn"
                                                        onClick={() => {
                                                            cancelHandler(
                                                                session
                                                            );
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </Col>
                                            </div>
                                        )}
                                </div>
                            </Col>
                        </Row>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderPage;
