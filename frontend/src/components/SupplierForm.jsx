import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import validator from "validator";

const SupplierForm = ({ supplier, onSubmit }) => {
    const [supplierName, setSupplierName] = useState(
        supplier ? supplier.name : ""
    );
    const [contactPerson, setContactPerson] = useState(
        supplier ? supplier.contactPerson : ""
    );
    const [mobile, setMobile] = useState(supplier ? supplier.mobile : "");
    const [email, setEmail] = useState(supplier ? supplier.email : "");
    const [address, setAddress] = useState(
        supplier
            ? supplier.address
            : {
                  street: "",
                  unitNo: "",
                  postalCode: "",
              }
    );
    const [error, setError] = useState("");
    const [supplierCreationError, setSupplierCreationError] = useState(false);

    const supplierNameInputHandler = (event) => {
        setSupplierName(event.target.value);
    };

    const contactPersonInputHandler = (event) => {
        setContactPerson(event.target.value);
    };

    const mobileInputHandler = (event) => {
        setMobile(event.target.value);
    };

    const emailInputHandler = (event) => {
        setEmail(event.target.value);
    };

    const streetInputHandler = (event) => {
        setAddress((prev) => {
            return { ...prev, street: event.target.value };
        });
    };

    const unitNoInputHandler = (event) => {
        setAddress((prev) => {
            return { ...prev, unitNo: event.target.value };
        });
    };

    const postalInputHandler = (event) => {
        setAddress((prev) => {
            return { ...prev, postalCode: event.target.value };
        });
    };
    const submitHandler = (event) => {
        event.preventDefault();

        const validateSupplierDetails = (
            supplierName,
            contactPerson,
            mobile,
            email,
            address
        ) => {
            setError(false);
            if (
                supplierName == "" ||
                contactPerson == "" ||
                mobile == "" ||
                email == "" ||
                address.street == "" ||
                address.unitNo == "" ||
                address.postalCode == ""
            ) {
                setError("**All fields must be filled");
                return false;
            }
            if (!validator.isEmail(email)) {
                setError("**Email is invalid");
                return false;
            }
            if (!validator.isMobilePhone(mobile)) {
                setError("** Mobile number is invalid");
                return false;
            }
            return true;
        };

        const ok = validateSupplierDetails(
            supplierName,
            contactPerson,
            mobile,
            email,
            address
        );
        if (ok) {
            const newSupplier = {
                _id: supplier ? supplier._id : undefined,
                name: supplierName,
                contactPerson: contactPerson,
                mobile: mobile,
                email: email,
                address: address,
            };
            onSubmit && onSubmit(newSupplier);
            setSupplierCreationError(false);
        } else {
            setSupplierCreationError(true);
        }
    };
    return (
        <div className="">
            <div>
                {{ supplierCreationError } && (
                    <p className="text-danger">{error}</p>
                )}
            </div>
            <Row className="mb-4 items-baseline">
                <Col xs={2}>Supplier Name: </Col>
                <Col xs={6}>
                    <input
                        type="text"
                        required
                        value={supplierName}
                        className="border-1 rounded-lg p-2"
                        onChange={supplierNameInputHandler}
                    ></input>
                </Col>
            </Row>
            <Row className="mb-4 items-baseline">
                <Col xs={2}>Contact Person: </Col>
                <Col xs={6}>
                    <input
                        type="text"
                        required
                        value={contactPerson}
                        className="border-1 rounded-lg p-2"
                        onChange={contactPersonInputHandler}
                    ></input>
                </Col>
            </Row>
            <Row className="mb-4 items-baseline">
                <Col xs={2}>Mobile: </Col>
                <Col xs={6}>
                    <input
                        type="text"
                        required
                        value={mobile}
                        className="border-1 rounded-lg p-2"
                        onChange={mobileInputHandler}
                    ></input>
                </Col>
            </Row>
            <Row className="mb-4 items-baseline">
                <Col xs={2}>Email: </Col>
                <Col xs={6}>
                    <input
                        type="email"
                        required
                        value={email}
                        className="border-1 rounded-lg p-2 "
                        onChange={emailInputHandler}
                    ></input>
                </Col>
            </Row>
            <Row className="mb-4 items-baseline">
                <Col xs={2}>Address: </Col>
                <Col xs={6}>
                    <input
                        type="text"
                        required
                        value={address.street}
                        placeholder="Street name"
                        className="border-1 rounded-lg p-2 mr-2"
                        onChange={streetInputHandler}
                    ></input>
                    <input
                        type="text"
                        required
                        value={address.unitNo}
                        placeholder="Unit No."
                        className="border-1 rounded-lg p-2 mr-2"
                        onChange={unitNoInputHandler}
                    ></input>
                    <input
                        type="text"
                        required
                        value={address.postalCode}
                        placeholder="Postal Code"
                        className="border-1 rounded-lg p-2"
                        onChange={postalInputHandler}
                    ></input>
                </Col>
            </Row>
            <button
                className="button mt-4 ml-5 w-40"
                type="submit"
                onClick={submitHandler}
            >
                Submit Supplier
            </button>
        </div>
    );
};

export default SupplierForm;
