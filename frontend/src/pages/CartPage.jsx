import React, { useEffect, useState } from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { Spinner } from "react-bootstrap";

const CartPage = () => {
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext();
    const [cart, setCart] = useState([]);
    const cartUrl = window.location.origin + "/api/user/update-cart";

    const totalArray = cart.map((item) => {
        return item.quantity * item.price;
    });
    const sum = totalArray.reduce((a, b) => a + b, 0);

    useEffect(() => {
        if (user != null) {
            console.log(user);
            setLoading(true);
            fetch("api/user/getemail/?email=" + user.email, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
                .then((res) => res.json())
                .then((json) => {
                    console.log(json.cart);
                    setCart(json.cart);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => setLoading(false));
        }
    }, [user]);

    const submitCart = async (newCart) => {
        const res = await fetch(cartUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cart: newCart, user }),
        });

        const json = await res.json();
        setCart(newCart);
        return json;
    };

    const deleteHandler = (event) => {
        const id = event.currentTarget.id;
        const newCart = cart.filter((item) => {
            return item._id != id;
        });

        submitCart(newCart);
    };

    const changeQuantityHandler = (value, id) => {
        if (value == 0) {
            const newCart = cart.filter((item) => {
                return item._id != id;
            });
            submitCart(newCart);
        } else {
            const newCart = cart.map((item) => {
                if (item._id == id) {
                    item.quantity = value;
                    console.log(value);
                }
                return item;
            });
            submitCart(newCart);
        }
    };

    let navigate = useNavigate();

    const handleCheckout = (cart) => {
        const paymentUrl =
            window.location.origin + "/api/payment/create-checkout-session";
        console.log(cart);
        const requestOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cart,
            }),
        };
        fetch(paymentUrl, requestOptions)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                console.log(json.url);
                window.open(json.url, "_blank");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div className="min-h-screen">
                <header className="text-center">
                    <h1 className="mb-4">Your Cart</h1>
                </header>
                {cart.map((item) => {
                    return (
                        <CartItem
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            quantity={item.quantity}
                            price={item.price}
                            image={item.image}
                            onDelete={deleteHandler}
                            onQuantityChange={changeQuantityHandler}
                        />
                    );
                })}

                {cart.length > 0 && (
                    <div>
                        <div>
                            <h3 className="font-light text-lg">
                                Total: ${sum.toFixed(2)}
                            </h3>
                        </div>
                        <div className="flex justify-center m-5">
                            <button
                                className="button checkout flex "
                                onClick={() => handleCheckout(cart)}
                            >
                                <FaShoppingBag className="mt-1 mr-1" />
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
                <div className="h-4/6 flex flex-col justify-center items-center">
                    {loading ? (
                        <Spinner />
                    ) : (
                        cart.length == 0 && (
                            <>
                                <h3 className="font-light">Cart is empty..</h3>
                                <button
                                    className="button "
                                    onClick={() => navigate("/products")}
                                >
                                    Click here to shop now
                                </button>
                            </>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default CartPage;
