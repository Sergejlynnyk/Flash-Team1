import React from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import CartForm from "./CartForm";
import "./Cart.scss";
import { useCart } from "./CartContext";

const Cart = () => {
  const { cart, removeFromCart, changeQuantity, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = (formData) => {
    alert(`Congratulations! Your order has been successfully placed on the website.
A manager will contact you shortly to confirm your order.`);
    clearCart();
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1 className="cart-title">Shopping cart</h1>
        <div className="header-line">
          <div className="line"></div>
          <Link to="/" className="back-to-store-btn">Back to the store</Link>
        </div>
      </div>

      <div className="cart-content">
        <div className="cart-list">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
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

        <div className="order-form">
          <div className="order-details">
            <h3 className="order-title">Order details</h3>
            <div className="order-info">
              <div className="items-count">{itemCount} items</div>
              <div className="total-price">
                <span>Total</span>
                <span className="price">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <CartForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Cart;