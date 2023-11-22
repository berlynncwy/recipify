import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Stars = ({
    rating,
    onPointerEnter = (num) => console.log(num),
    onPointerLeave = (num) => console.log(num),
    onClick = (rating) => {
        console.log(rating);
    },
}) => {
    return (
        <div
            className="rating w-auto flex items-center"
            onPointerLeave={onPointerLeave}
            onClick={() => onClick(rating)}
        >
            <span onPointerEnter={() => onPointerEnter(1)}>
                {rating >= 1 ? (
                    <FaStar />
                ) : rating >= 0.5 ? (
                    <FaStarHalfAlt />
                ) : (
                    <FaRegStar />
                )}
            </span>
            <span onPointerEnter={() => onPointerEnter(2)}>
                {rating >= 2 ? (
                    <FaStar />
                ) : rating >= 1.5 ? (
                    <FaStarHalfAlt />
                ) : (
                    <FaRegStar />
                )}
            </span>
            <span onPointerEnter={() => onPointerEnter(3)}>
                {rating >= 3 ? (
                    <FaStar />
                ) : rating >= 2.5 ? (
                    <FaStarHalfAlt />
                ) : (
                    <FaRegStar />
                )}
            </span>
            <span onPointerEnter={() => onPointerEnter(4)}>
                {rating >= 4 ? (
                    <FaStar />
                ) : rating >= 3.5 ? (
                    <FaStarHalfAlt />
                ) : (
                    <FaRegStar />
                )}
            </span>
            <span onPointerEnter={() => onPointerEnter(5)}>
                {rating >= 5 ? (
                    <FaStar />
                ) : rating >= 4.5 ? (
                    <FaStarHalfAlt />
                ) : (
                    <FaRegStar />
                )}
            </span>
        </div>
    );
};

export default Stars;
