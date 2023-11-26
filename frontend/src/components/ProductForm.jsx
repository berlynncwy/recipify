import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import TagComponent from "./TagComponent";
import { useAuthContext } from "../hooks/useAuthContext";
import DropdownMenu from "./DropdownMenu";

const ProductForm = ({ product, onSubmit }) => {
    const { user } = useAuthContext();
    const [suppliers, setSuppliers] = useState([]);
    const [error, setError] = useState("");
    const [productCreationError, setProductCreationError] = useState(false);
    const [productDetails, setProductDetails] = useState(
        product
            ? product
            : {
                  supplier: "",
                  name: "",
                  brand: "",
                  unitDetails: "",
                  price: 0.0,
                  stock: 0,
                  image: "",
                  category: "",
                  createdBy: "",
              }
    );
    const [productTag, setProductTag] = useState(
        product ? product.category : []
    );

    //get suppliers
    const getSupplier = () => {
        fetch(window.location.origin + "/api/admin/suppliers")
            .then((res) => res.json())
            .then((json) => setSuppliers(json.suppliers))
            .catch((err) => console.log(err));
    };
    useEffect(getSupplier, []);

    const supplierInputHandler = (supplierId) => {
        setProductDetails((prev) => {
            return { ...prev, supplier: supplierId };
        });
    };

    const nameInputHandler = (event) => {
        setProductDetails((prev) => {
            return { ...prev, name: event.target.value };
        });
    };
    const brandInputHandler = (event) => {
        setProductDetails((prev) => {
            return { ...prev, brand: event.target.value };
        });
    };
    const unitDetailInputHandler = (event) => {
        setProductDetails((prev) => {
            return { ...prev, unitDetails: event.target.value };
        });
    };
    const priceInputHandler = (event) => {
        setProductDetails((prev) => {
            return { ...prev, price: event.target.value };
        });
    };
    const stockInputHandler = (event) => {
        setProductDetails((prev) => {
            return { ...prev, stock: event.target.value };
        });
    };

    const imageInputHandler = (event) => {
        setProductDetails((prev) => {
            return { ...prev, image: event.target.value };
        });
    };

    const handleTagsChange = (tags) => {
        setProductTag(tags);
        console.log(productTag);
    };

    const submitHandler = (event) => {
        console.log(productDetails, productTag);
        event.preventDefault();

        const validateProductDetails = (productDetails, productTag) => {
            setError(false);
            console.log(productDetails);
            console.log(productTag);
            if (
                productDetails.name == "" ||
                productDetails.brand == "" ||
                productDetails.unitDetails == "" ||
                productDetails.price == 0 ||
                productDetails.image == "" ||
                productTag.length == 0
            ) {
                setError("** All fields must be filled.");
                return false;
            }
            return true;
        };

        const ok = validateProductDetails(productDetails, productTag);
        if (ok) {
            const newProduct = { ...productDetails, category: productTag };
            console.log(onSubmit);
            onSubmit && onSubmit(newProduct);
            setProductCreationError(false);
        } else {
            setProductCreationError(true);
        }
    };
    return (
        <div className="min-h-screen">
            <div>
                {{ productCreationError } && (
                    <p className="text-danger">{error}</p>
                )}
            </div>
            <Row className="mb-4 items-baseline">
                <Col xs={2}>Supplier ID:</Col>
                <Col xs={6}>
                    <DropdownMenu
                        options={suppliers.map((supplier) => ({
                            value: supplier._id,
                            label: supplier.name,
                        }))}
                        value={productDetails.supplier}
                        onSelect={supplierInputHandler}
                    />
                </Col>
            </Row>
            <Row className="mb-4 items-baseline">
                <Col xs={2}>Name: </Col>
                <Col xs={6}>
                    <input
                        type="text"
                        className="border-1 rounded-lg p-2 w-100"
                        value={productDetails.name}
                        onChange={nameInputHandler}
                        required
                    ></input>
                </Col>
            </Row>
            <Row className="mb-4 items-baseline">
                <Col xs={2}>Brand: </Col>
                <Col xs={6}>
                    <input
                        type="text"
                        className="border-1 rounded-lg p-2 w-100"
                        value={productDetails.brand}
                        onChange={brandInputHandler}
                        required
                    ></input>
                </Col>
            </Row>
            <Row className="mb-4 items-baseline">
                <Col xs={2}>Unit Details: </Col>
                <Col xs={6}>
                    <input
                        type="text"
                        className="border-1 rounded-lg p-2 w-100"
                        value={productDetails.unitDetails}
                        onChange={unitDetailInputHandler}
                        required
                    ></input>
                </Col>
            </Row>
            <Row className="mb-4 items-baseline">
                <Col xs={2}>Price: </Col>
                <Col xs={6}>
                    <input
                        type="number"
                        className="border-1 rounded-lg p-2 w-100"
                        value={productDetails.price}
                        onChange={priceInputHandler}
                        required
                    ></input>
                </Col>
            </Row>
            <Row className="mb-4 items-baseline">
                <Col xs={2}>Stock: </Col>
                <Col xs={6}>
                    <input
                        type="number"
                        className="border-1 rounded-lg p-2 w-100"
                        value={productDetails.stock}
                        onChange={stockInputHandler}
                        required
                    ></input>
                </Col>
            </Row>
            <Row className="mb-4 items-baseline">
                <Col xs={2}>Image URL: </Col>
                <Col xs={6}>
                    <input
                        type="text"
                        className="border-1 rounded-lg p-2 w-100"
                        value={productDetails.image}
                        onChange={imageInputHandler}
                        required
                    ></input>
                </Col>
            </Row>
            <Row className="mb-4 items-baseline">
                <Col xs={2}>Tag(s): </Col>
                <Col xs={6}>
                    <TagComponent
                        tags={productTag}
                        onTagsChange={handleTagsChange}
                    />
                </Col>
            </Row>
            <button
                className="button w-40 ml-5 mb-5"
                type="submit"
                onClick={submitHandler}
            >
                Submit product
            </button>
        </div>
    );
};
export default ProductForm;
