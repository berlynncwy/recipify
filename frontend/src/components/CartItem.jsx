import { Button } from "react-bootstrap";
import QuantityButton from "./QuantityButton";

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

  const handleSubmit = (event) => {};

  return (
    <>
      <div className="flex justify-center">
        <div className="flex items-center gap-4">
          <div className="mt-8">
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
                      <dd className="inline">${price.toFixed(2)}</dd>
                    </div>
                  </dl>
                  <QuantityButton
                    key={id + "quantityButton"}
                    id={id}
                    value={quantity}
                    min={0}
                    max={10}
                    setValue={onQuantityChange}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* delete button */}
        <div>
          <button
            className="text-gray-600 transition hover:text-red-600 flex content-center"
            key={id + "deleteButton"}
            id={id}
            onClick={handleClick}
          >
            <span className="sr-only">Remove item</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
