import React, { useEffect, useState } from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import CartItem from "../components/CartItem";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { user } = useAuthContext();
  const [cart, setCart] = useState([]);
  const [noChange, setNoChanges] = useState(true);
  const cartUrl = window.location.origin + "/api/user/update-cart";

  // const url = window.location.origin + "/api/user/cart";
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

  const deleteHandler = (event) => {
    setNoChanges(false);
    const id = event.currentTarget.id;
    setCart((oldCart) => {
      return oldCart.filter((item) => {
        return item._id != id;
      });
    });
  };

  const changeQuantityHandler = (getValue, id) => {
    setNoChanges(false);
    setCart(
      cart.map((item) => {
        if (item._id == id) {
          const oldQuantity = item.quantity;
          const newQuantity = +getValue(oldQuantity);
          item.quantity = newQuantity;
          console.log(newQuantity);
        }
        return item;
      })
    );
  };

  const submitHandler = (event) => {
    setNoChanges(true);
    fetch(cartUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart, user }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((res) => console.log(res.message));
        } else {
          res.json().then((res) => console.log(res.error));
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
        <div className="flex justify-center mt-5">
          <Button
            type="submit"
            variant="outline-dark"
            onClick={submitHandler}
            disabled={noChange === true}
          >
            Save changes
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
