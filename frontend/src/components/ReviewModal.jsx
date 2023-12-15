import React, { useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { IoIosClose } from "react-icons/io";
import { FaStar, FaRegStar } from "react-icons/fa";
import Stars from "./Stars";
import { useAuthContext } from "../hooks/useAuthContext";

const ReviewModal = ({ review, recipeId }) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleShow = () => setOpen(true);
    const [rating, setRating] = useState(review ? review.rating : 0);
    const [hoverRating, setHoverRating] = useState(rating);
    const [comment, setComment] = useState(review ? review.comment : "");
    const { user } = useAuthContext();

    const reviewHandler = (event) => {
        setComment(event.target.value);
    };
    const submitHandler = () => {
        console.log(rating);
        console.log(comment);
        if (comment != "" && rating != 0) {
            alert("Review has been submitted. Thank you!");
            handleClose();
            if (user == null) return;
            const requestOption = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ rating, comment: comment, recipeId }),
            };
            const url = window.location.origin + "/api/recipes/add-review";
            fetch(url, requestOption);
        } else {
            alert("Please leave a comment and rating. Minimum rating is 1.");
        }
    };

    return (
        <>
            <button disabled={review} className="button" onClick={handleShow}>
                {review ? "Already reviewed" : "Add a review"}
            </button>
            <Modal
                show={open}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <IoIosClose
                    type="button"
                    onClick={handleClose}
                    className="w-8 h-8 mt-3 ml-3 mr-3"
                ></IoIosClose>
                <Modal.Body>
                    <h3>Leave a review</h3>
                    <Row className="flex justify-center">
                        <Stars
                            rating={hoverRating}
                            onPointerEnter={setHoverRating}
                            onPointerLeave={() => setHoverRating(rating)}
                            onClick={setRating}
                        />
                    </Row>
                    <Row className="flex justify-center">
                        <Col md={8} className="justify-center">
                            <p className="ml-1 mt-3">Comment:</p>
                            <textarea
                                value={comment}
                                className="border-1 w-15 mt-1 resize-none rounded-lg p-2"
                                rows="5"
                                cols="32"
                                onChange={(event) => reviewHandler(event)}
                            ></textarea>
                        </Col>
                    </Row>
                    <div className=" justify-center"></div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="button" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="button" onClick={submitHandler}>
                        Post
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ReviewModal;
