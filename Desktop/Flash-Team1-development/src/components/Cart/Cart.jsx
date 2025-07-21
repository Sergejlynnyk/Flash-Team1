import React from "react";
import CartItem from "./CartItem";
import CartForm from "./CartForm";
import "./Cart.scss";

import { useCart } from "./CartContext";

const Cart = () => {
  const { cart, removeFromCart, changeQuantity, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = (formData) => {
    alert(`Thank you for your order, ${formData.name}! We will contact you at: ${formData.phone}`);
    clearCart();
  };

  return (
    <div className="cart-page">
      <div className="cart-list">
        <h2>Shopping cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={(id, qty) => changeQuantity(id, qty)}
              onRemove={removeFromCart}
            />
          ))
        )}
      </div>
      <div className="cart-summary">
        <h3>Order details</h3>
        <div>{itemCount} items</div>
        <div>
          <b>Total: ${total.toLocaleString("en-US")}</b>
        </div>
        <CartForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Cart;
