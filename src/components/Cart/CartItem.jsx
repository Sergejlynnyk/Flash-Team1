import React from "react";
import { BASE_BACKEND_URL } from "../../utils/env";

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const imageUrl = item.image?.startsWith("http")
    ? item.image
    : `${BASE_BACKEND_URL}${item.image}`;

  return (
    <div className="cart-item">
      <img src={imageUrl} alt={item.name} className="cart-item__img" />
      <div className="cart-item__info">
        <div className="cart-item__name">{item.name}</div>
        <div className="cart-item__qty-controls">
          <button
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            −
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>
            +
          </button>
        </div>
      </div>
      <div className="cart-item__price">
        <span className="current">€{item.price}</span>
        {item.oldPrice && <span className="old">€{item.oldPrice}</span>}
      </div>
      <button className="cart-item__remove" onClick={() => onRemove(item.id)}>
        ×
      </button>
    </div>
  );
};

export default CartItem;
