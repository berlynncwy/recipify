import { Row, Col, Container } from "react-bootstrap";
import { useEffect, useState } from "react";

import ProductItem from "../components/ProductItem";

const ProductPage = () => {
    const [product, setProduct] = useState([]);
    const [keyword, setKeyword] = useState("");

    const refresh = () => {
        fetch("api/products")
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log("======success=======");
                console.log(res);
                setProduct(res);
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
        <>
            <h1>Products</h1>
            <Container className="mb-5">
                <Row className="justify-center mb-4 items-center">
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
                <Row className="gap-y-11 justify-start ">
                    {product.map(({ _id, name, unitDetails, price, image }) => (
                        <Col
                            key={_id}
                            sm={12}
                            md={6}
                            lg={4}
                            xl={3}
                            className="gap-0"
                        >
                            <ProductItem
                                _id={_id}
                                name={name}
                                unitDetails={unitDetails}
                                price={price}
                                image={image}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default ProductPage;
