import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";

const SingleOrderPage = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        console.log({ id });
        if (user == null) return;
        const url = window.location.origin + "/api/payment/orders/" + id;
        const requestOption = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        console.log(url);
        fetch(url, requestOption)
            .then((res) => res.json())
            .then((json) => {
                setOrderDetails(json);
            })
            .catch((err) => console.log(err));
    }, [user]);

    if (orderDetails == null) return <></>;
    console.log(orderDetails);
    return (
        <div className="min-h-screen">
            <h1>Single Order Page</h1>
            <div className="flex justify-center ">
                <div className="w-1/2 border-3 rounded-lg pt-3 pb-3 border-emerald-900">
                    {orderDetails.session.payment_status == "paid" && (
                        <Container>
                            <Row>
                                <Col className="l-order">Email: </Col>
                                <Col className="r-order">
                                    {
                                        orderDetails.session.customer_details
                                            .email
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col className="l-order">Name: </Col>
                                <Col className="r-order">
                                    {orderDetails.session.shipping_details.name}
                                </Col>
                            </Row>
                            <Row>
                                <Col className="l-order">
                                    Shipping Address:{" "}
                                </Col>
                                <Col className="r-order">
                                    {
                                        orderDetails.session.shipping_details
                                            .address.line1
                                    }{" "}
                                    {
                                        orderDetails.session.customer_details
                                            .address.line2
                                    }{" "}
                                    {
                                        orderDetails.session.customer_details
                                            .address.postal_code
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col className="l-order">Order Date: </Col>
                                <Col className="r-order">
                                    {new Date(
                                        orderDetails.order.updatedAt
                                    ).toLocaleDateString()}
                                </Col>
                            </Row>
                            <Row>
                                <Col className="l-order">Order Amount: </Col>
                                <Col className="r-order">
                                    $
                                    {(
                                        orderDetails.session.amount_total / 100
                                    ).toFixed(2)}
                                </Col>
                            </Row>
                            <Row>
                                <Col className="l-order">Payment Status: </Col>
                                <Col className="r-order">
                                    {orderDetails.session.payment_status}
                                </Col>
                            </Row>
                        </Container>
                    )}
                    {orderDetails.session.payment_status == "unpaid" && (
                        <Container>
                            <Row>
                                <Col className="l-order">Order Date: </Col>
                                <Col className="r-order">
                                    {new Date(
                                        orderDetails.order.updatedAt
                                    ).toLocaleDateString()}
                                </Col>
                            </Row>
                            <Row>
                                <Col className="l-order">Order Amount: </Col>
                                <Col className="r-order">
                                    $
                                    {(
                                        orderDetails.session.amount_total / 100
                                    ).toFixed(2)}
                                </Col>
                            </Row>
                            <Row>
                                <Col className="l-order">Payment Status: </Col>
                                <Col className="r-order">
                                    {orderDetails.session.status == "expired"
                                        ? "cancelled"
                                        : orderDetails.session.payment_status}
                                    {orderDetails.session.status !=
                                        "expired" && (
                                        <div className="flex">
                                            <button
                                                className="payment-status-btn mr-2"
                                                onClick={() =>
                                                    window.open(
                                                        orderDetails.session
                                                            .url,
                                                        "_blank"
                                                    )
                                                }
                                            >
                                                Pay
                                            </button>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </Container>
                    )}
                </div>
            </div>
            <div className="mt-4">
                <h3 className="font-semibold">Products</h3>
                {orderDetails.order.items.map((item) => {
                    return (
                        <Row className="flex justify-center">
                            <Col md={1} className="font-light self-center">
                                <img
                                    src={item.image[0]}
                                    className="w-20 h-20"
                                ></img>
                            </Col>
                            <Col md={2} className="font-light self-center">
                                {item.name}
                            </Col>
                            <Col md={1} className="font-light self-center">
                                ${item.price.toFixed(2)}
                            </Col>
                            <Col md={1} className="font-light self-center">
                                x {item.quantity}
                            </Col>
                            <Col md={1} className="font-light self-center">
                                $ {(item.quantity * item.price).toFixed(2)}
                            </Col>
                        </Row>
                    );
                })}
            </div>
        </div>
    );
};

export default SingleOrderPage;
