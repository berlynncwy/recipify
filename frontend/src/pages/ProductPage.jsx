import { Row, Col, Container } from "react-bootstrap";
import { useEffect, useState } from "react";

import ProductItem from "../components/ProductItem";

const ProductPage = () => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch("api/products")
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log("======success=======");
                console.log(res);
                setProduct(res);
            })
            .catch((err) => {
                console.log("======failure=======");
                console.log(err);
            });
    }, []);

    return (
        <>
            <h1>Products</h1>
            <Container className="mb-5">
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
