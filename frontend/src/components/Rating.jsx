import Stars from "./Stars";

const Rating = ({ rating, noOfReviews }) => {
    return (
        <div className="rating flex items-center">
            <Stars rating={rating} />

            <span className="rating-text">
                {noOfReviews} {noOfReviews == 1 ? "review" : "reviews"}
            </span>
        </div>
    );
};

export default Rating;
