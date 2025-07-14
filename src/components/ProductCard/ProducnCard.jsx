import React, { useState } from "react";
import { useCart } from "../Cart/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity(q => q + 1);
  const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} width={150} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>

      <div className="quantity-controls">
        <button onClick={decrease}>-</button>
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
        />
        <button onClick={increase}>+</button>
      </div>

      <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
};

export default ProductCard;
