import React from "react";

const CartItem = ({ item, onQuantityChange, onRemove }) => (
  <div className="cart-item">
    <img src={item.image} alt={item.name} className="cart-item__img" />
    <div className="cart-item__info">
      <div className="cart-item__name">{item.name}</div>
      <div className="cart-item__qty-controls">
        <button onClick={() => onQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
        <span>{item.quantity}</span>
        <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>+</button>
      </div>
    </div>
    <div className="cart-item__price">
      <span className="current">€{item.price}</span>
      {item.oldPrice && (
        <span className="old">€{item.oldPrice}</span>
      )}
    </div>
    <button className="cart-item__remove" onClick={() => onRemove(item.id)}>×</button>
  </div>
);

export default CartItem;
