import React from "react";

const CartItem = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
  formatPrice,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-md shadow-sm">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-24 h-24 object-cover rounded-md"
      />
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold">{item.product.name}</h3>
        <p className="text-gray-600">{formatPrice(item.product.price)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          className="px-3 py-1 border rounded-md hover:bg-gray-200"
          onClick={onDecrement}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          type="button"
          className="px-3 py-1 border rounded-md hover:bg-gray-200"
          onClick={onIncrement}
        >
          +
        </button>
        <button
          type="button"
          className="ml-4 text-red-600 hover:text-red-800 font-semibold"
          onClick={onRemove}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartItem;
