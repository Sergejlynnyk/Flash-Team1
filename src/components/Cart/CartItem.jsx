import React from "react";
import { BASE_BACKEND_URL } from "../../utils/env";
import { Link } from "react-router-dom";

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const imageUrl = item.image?.startsWith("http")
    ? item.image
    : `${BASE_BACKEND_URL}${item.image}`;

  return (
    <div className="cart-item">
      <Link to={`/product/${item.id}`}>
        <img src={imageUrl} alt={item.name} className="cart-item__img" />
      </Link>{" "}
      <div className="cart-item__info">
        <div className="cart-item__header">
          <Link to={`/product/${item.id}`} className="cart-item__name-link">
            <div className="cart-item__name">{item.name}</div>
          </Link>{" "}
          <button
            className="cart-item__remove"
            onClick={() => onRemove(item.id)}
          >
            ×
          </button>
        </div>
        <div className="cart-item__price-row">
          <div className="cart-item__qty-controls">
            <button
              onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>
          <div className="cart-item__price">
            <span className="current">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            {item.oldPrice && (
              <span className="old">
                ${(item.oldPrice * item.quantity).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
