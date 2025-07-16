import React, { useState } from "react";
import { useCart } from "./CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity(q => q + 1);
  const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const discountPercent = product.oldPrice
    ? Math.round(100 - (product.price / product.oldPrice) * 100)
    : null;

  return (
    <div style={{
      border: "1px solid #eee",
      borderRadius: 12,
      padding: 20,
      maxWidth: 420,
      background: "#fafaf4"
    }}>
      <img src={product.image} alt={product.name} style={{ width: 220, marginBottom: 10 }} />
      <h2>{product.name}</h2>
      <div style={{ fontSize: 22 }}>
        <span style={{ fontWeight: 600 }}>${product.price}</span>
        {product.oldPrice && (
          <span style={{ textDecoration: "line-through", color: "#bbb", marginLeft: 10 }}>${product.oldPrice}</span>
        )}
        {discountPercent && (
          <span style={{ color: "green", marginLeft: 10 }}>-{discountPercent}%</span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", margin: "16px 0" }}>
        <button onClick={decrease} style={{ width: 30, height: 30 }}>-</button>
        <span style={{ margin: "0 10px" }}>{quantity}</span>
        <button onClick={increase} style={{ width: 30, height: 30 }}>+</button>
      </div>
      <button
        onClick={handleAddToCart}
        style={{ padding: "10px 30px", background: "#7e9156", color: "#fff", border: "none", borderRadius: 7, fontSize: 17, cursor: "pointer" }}
      >
        Add to cart
      </button>
      <div style={{ marginTop: 16 }}>
        <b>Description</b>
        <div>{product.description || "No description provided."}</div>
      </div>
    </div>
  );
};

export default ProductCard;
