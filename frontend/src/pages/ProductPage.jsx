import { Row, Col, Container, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";

import ProductItem from "../components/ProductItem";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);

    const refresh = () => {
        setLoading(true);
        fetch("api/products")
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log("======success=======");
                console.log(res);
                setProducts(res);
                setKeyword("");
            })
            .catch((err) => {
                console.log("======failure=======");
                console.log(err);
            })
            .finally(() => setLoading(false));
    };

    useEffect(refresh, []);

    const keywordHandler = (event) => {
        const search = event.target.value;
        setKeyword(search);
    };

    const searchHandler = () => {
        if (keyword != null) {
            setLoading(true);
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
                })
                .finally(() => setLoading(false));
        }
    };
    return (
        <>
            <h1>Products</h1>
            <Container className="mb-5 min-h-screen">
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
                <div className="flex justify-center">
                    {loading ? (
                        <Spinner />
                    ) : (
                        products.length == 0 && (
                            <p className="italic">No product found.</p>
                        )
                    )}
                </div>
                <Row className="gap-y-11 justify-start ">
                    {products.map(
                        ({ _id, name, unitDetails, price, image }) => (
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
                        )
                    )}
                </Row>
            </Container>
        </>
    );
};

export default ProductPage;
