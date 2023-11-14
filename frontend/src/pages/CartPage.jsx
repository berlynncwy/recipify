import React, { useEffect, useState } from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import CartItem from "../components/CartItem";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { user } = useAuthContext();
  const [cart, setCart] = useState([]);
  const cartUrl = window.location.origin + "/api/user/update-cart";

  useEffect(() => {
    if (user != null) {
      console.log(user);
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
        });
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

  const changeQuantityHandler = (getValue, id) => {
    const newCart = cart.map((item) => {
      if (item._id == id) {
        const oldQuantity = item.quantity;
        const newQuantity = +getValue(oldQuantity);
        item.quantity = newQuantity;
        console.log(newQuantity);
      }
      return item;
    });
    submitCart(newCart);
  };

  return (
    <>
      <div className="min-h-screen">
        <header className="text-center">
          <h1 className="">Your Cart</h1>
        </header>
        {cart.map((item) => {
          return (
            <>
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
            </>
          );
        })}
      </div>
    </>
  );
};

export default CartPage;
