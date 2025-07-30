import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';
import { useLiked } from '../Liked/LikedContext';
import './ProductCard.scss';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleLiked, isLiked } = useLiked();

  const { 
    id, 
    title, 
    image, 
    price, 
    oldPrice,
  } = product;

  const discount = oldPrice 
    ? Math.round(((oldPrice - price) / oldPrice) * 100) 
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id,
      name: title,
      image,
      price,
      oldPrice,
      quantity: 1
    });
  };

  const handleToggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLiked({
      id,
      title,
      image,
      price,
      oldPrice
    });
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <Link to={`/product/${id}`}>
          <img 
            src={image} 
            alt={title} 
            className="product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder-image.jpg';
            }}
          />
        </Link>
        {discount > 0 && (
          <div className="discount-badge">-{discount}%</div>
        )}
      </div>
      
      <div className="product-info">
        <Link to={`/product/${id}`} className="product-title">{title}</Link>
        
        <div className="product-prices">
          <span className="current-price">${price.toFixed(2)}</span>
          {oldPrice && (
            <span className="old-price">${oldPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
      
      <div className="product-actions">
        <button
          className={`like-btn ${isLiked(id) ? 'liked' : ''}`}
          onClick={handleToggleLike}
          title={isLiked(id) ? "Remove from favorites" : "Add to favorites"}
        >
          <img
            src={isLiked(id) ? "/liked.png" : "/notliked.png"}
            alt="Like"
            className="heart-icon"
          />
        </button>
        
        <button
          className="cart-btn"
          onClick={handleAddToCart}
          title="Add to cart"
        >
          <img src="/basket.png" alt="Cart" className="cart-icon" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;