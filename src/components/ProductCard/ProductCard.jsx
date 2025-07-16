import React, { useState, useEffect } from "react";
import { useCart } from "../Cart/CartContext";
import "./ProductCard.scss";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    id,
    name,
    image,
    price,
    oldPrice,
    discount,
    alt = name || "Product",
  } = product;

  // Проверяем избранное при загрузке
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(id));
  }, [id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({ ...product, quantity });
    alert(`${name} added to cart!`);
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(id)) {
      const updated = favorites.filter((favId) => favId !== id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push(id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="product-card">
      {discount && <div className="discount-badge">-{discount}%</div>}

      <div className="icon-bar">
        <img
          src="/basket=empty.svg"
          alt="Cart"
          className="icon"
          onClick={handleAddToCart}
        />
        <img
          src={
            isFavorite
              ? "/basket=heart filled.svg"
              : "/basket=heart empty.svg"
          }
          alt="Favorite"
          className="icon"
          onClick={toggleFavorite}
        />
      </div>

      <img src={image} alt={alt} className="item-image" />

      <div className="item-text">{name}</div>

      <div className="item-prices">
        <span className="new-price">${price}</span>
        {oldPrice && <span className="old-price">${oldPrice}</span>}
      </div>

      <div className="quantity-controls">
        <button onClick={decrease}>-</button>
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) =>
            setQuantity(Math.max(1, parseInt(e.target.value) || 1))
          }
        />
        <button onClick={increase}>+</button>
      </div>

      <button className="add-to-cart-button" onClick={handleAddToCart}>
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;