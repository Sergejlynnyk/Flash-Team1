import React, { useState } from "react";
import CartItem from "./CartItem";
import CartForm from "./CartForm";
import CartPopup from "./CartPopup/CartPopup";
import "./Cart.scss";
import { useCart } from "./CartContext";

const Cart = () => {
  const { cart, removeFromCart, changeQuantity, clearCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = (formData) => {
    setShowPopup(true);
    // clearCart();
  };

  return (
    <div className="cart-page">
      {showPopup && (
  <CartPopup
    onClose={() => {
      setShowPopup(false);
      clearCart(); // ← теперь корзина очистится после закрытия попапа
    }}
  />
)}
      <div className="cart-list">
        <h2>Shopping cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
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
