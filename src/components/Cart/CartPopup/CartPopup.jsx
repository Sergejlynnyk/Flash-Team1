import React, { useEffect } from "react";
import "./CartPopup.scss";

const CartPopup = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 10000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="cart-popup">
      <div className="popup-content">
        <h2>Congratulations!</h2>
        <p>
          Your order has been successfully placed on the website. <br />A
          manager will contact you shortly to confirm your order.
        </p>
      </div>
      <button className="popup-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default CartPopup;
