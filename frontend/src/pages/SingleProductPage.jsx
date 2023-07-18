import React, { useEffect, useState } from "react";
import { Row, Col, Button, Dropdown } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import QuantityButton from "../components/QuantityButton";

const SingleProductPage = () => {
  const { user } = useAuthContext();
  const [product, setProduct] = useState({});
  const [productState, setProductState] = useState({});
  const [quantity, setQuantity] = useState(0);

  const { id } = useParams();

  const url = window.location.origin + "/api/products/" + id;
  const cartUrl = window.location.origin + "/api/user/cart";
  //   console.log(window.location);

  useEffect(() => {
    fetch(url)
      //   .then((res) => console.log(res))
      .then((res) => res.json())
      .then((res) => {
        setProduct(res);

        if (res.stock <= 0) {
          productState.stockStatus = "Out of Stock";
          productState.colour = "#bd6868";
        } else if (res.stock < 10) {
          productState.stockStatus = "Low in stock";
          productState.colour = "#c58060";
        } else {
          productState.stockStatus = "Available";
          productState.colour = "#68bd83";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submitHandler = () => {
    console.log(quantity);
    console.log(product._id);
    // pass data inito cart
    // to do !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    fetch(cartUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...product, quantity, user }),
    });
  };

  let cssDetail = productState.colour;

  return (
    <>
      <div className=" flex justify-center">
        <Row className="place-content-center">
          <Col className=" flex flex-col justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
          </Col>
          <Col
            as="div"
            className="product-detail max-w-full flex flex-col justify-center"
          >
            <h2>{product.name}</h2>
            {/* <div className="text-"> */}
            <Row>
              <Col className="">
                <p className="product-l">Brand :</p>
                <p className="product-l">Unit :</p>
                <p className="product-l">Price :</p>
                <p className="product-l">Stock status :</p>
                <p className="product-l">Quantity :</p>
              </Col>

              <Col className="">
                <p className="product-r">{product.brand}</p>
                <p className="product-r">{product.unitDetails}</p>
                <p className="product-r">${product.price}</p>
                <p
                  style={{ background: cssDetail }}
                  className="product-status inline-block "
                >
                  {productState.stockStatus}
                </p>
                <QuantityButton
                  value={quantity}
                  setValue={setQuantity}
                  min={0}
                  max={10}
                />
                <Button
                  type="submit"
                  onClick={submitHandler}
                  className="mt-2 btn-outline-secondary btn-sm"
                  disabled={quantity === 0 || product.stock <= 0}
                >
                  Add to Cart
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SingleProductPage;
