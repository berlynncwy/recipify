import React from "react";

const QuantityButton = ({ setValue, value, min, max }) => {
  const onIncrement = () => {
    setValue((old) => {
      if (max != null && old >= max) {
        return max;
      }
      return old + 1;
    });
  };
  const onDecrement = () => {
    setValue((old) => {
      if (min != null && old <= min) {
        return min;
      }
      return old - 1;
    });
  };
  const onChange = (event) => {
    setValue((old) => {
      const num = +event.target.value;
      if (min != null && num <= min) {
        return min;
      } else if (max != null && num >= max) {
        return max;
      } else {
        return num;
      }
    });
  };

  return (
    <div className="custom-number-input h-8 w-32">
      <div className="flex flex-row h-8 w-full rounded-lg relative bg-transparent mt-1">
        <button
          data-action="decrement"
          onClick={onDecrement}
          className=" bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
        >
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          type="number"
          className="outline-none focus:outline-none text-center w-full bg-gray-200 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
          name="custom-input-number"
          value={value}
          onChange={onChange}
        ></input>
        <button
          data-action="increment"
          onClick={onIncrement}
          className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  );
};

export default QuantityButton;
