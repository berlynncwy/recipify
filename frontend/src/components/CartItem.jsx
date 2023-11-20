import { Button } from "react-bootstrap";
import QuantityButton from "./QuantityButton";
import { FaTrashAlt } from "react-icons/fa";

const CartItem = ({
    id,
    name,
    image,
    quantity,
    price,
    onDelete,
    onQuantityChange,
}) => {
    const handleClick = (event) => {
        if (onDelete != null) {
            onDelete(event);
        }
    };

    return (
        <>
            <div className="flex justify-center">
                <div className="flex items-center gap-4">
                    <div className="">
                        <ul className="space-y-4">
                            <li className="flex items-center gap-4" key={id}>
                                <img
                                    src={image[0]}
                                    alt={name}
                                    className="h-28 w-28 rounded object-cover my-2"
                                />

                                <div className="">
                                    <h4 className="text-sm font-semibold text-gray-900 text-left">
                                        {name}
                                    </h4>
                                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                        <div>
                                            <dt className="inline">Price: </dt>
                                            <dd className="inline">
                                                ${price.toFixed(2)}
                                            </dd>
                                        </div>
                                    </dl>
                                    <QuantityButton
                                        key={id + "quantityButton"}
                                        id={id}
                                        value={quantity}
                                        min={0}
                                        setValue={onQuantityChange}
                                    />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* delete button */}
                <div>
                    <FaTrashAlt type="button" id={id} onClick={handleClick} />
                </div>
            </div>
        </>
    );
};

export default CartItem;
