import React from 'react';
import { Link } from 'react-router-dom';
import { useLiked } from '../../components/Liked/LikedContext';
import { useCart } from '../../components/Cart/CartContext';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import './LikedProducts.scss';

const LikedProducts = () => {
  const { likedItems, removeFromLiked, clearLiked } = useLiked();
  const { addToCart } = useCart();

  const breadcrumbItems = [
    { label: 'Main page', href: '/' },
    { label: 'Liked products' }
  ];

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.title || product.name,
      image: product.image,
      price: product.price,
      oldPrice: product.oldPrice,
      quantity: 1
    });
    // Показываем уведомление
    alert(`${product.title || product.name} added to cart!`);
  };

  const handleRemoveFromLiked = (productId, e) => {
    e.preventDefault();
    removeFromLiked(productId);
  };

  const calculateDiscount = (oldPrice, price) => {
    if (!oldPrice || oldPrice <= price) return 0;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  };

  if (likedItems.length === 0) {
    return (
      <div className="liked-products-container">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="page-title">Liked Products</h1>
        <div className="empty-liked">
          <div className="empty-icon">💖</div>
          <h2>Your wishlist is empty</h2>
          <p>Start adding products you love to see them here!</p>
          <Link to="/all-products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="liked-products-container">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="liked-header">
        <h1 className="page-title">Liked Products ({likedItems.length})</h1>
        <button 
          onClick={clearLiked} 
          className="clear-all-btn"
        >
          Clear All
        </button>
      </div>

      <div className="liked-grid">
        {likedItems.map(product => {
          const discount = calculateDiscount(product.oldPrice, product.price);

          return (
            <div key={product.id} className="liked-product-card">
              <Link 
                to={`/product/${product.id}`} 
                className="product-link"
              >
                {discount > 0 && (
                  <div className="discount-badge">-{discount}%</div>
                )}
                <img
                  src={product.image}
                  alt={product.title || product.name}
                  className="product-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
                <div className="product-info">
                  <h3 className="product-name">{product.title || product.name}</h3>
                  <div className="product-prices">
                    <span className="current-price">${product.price}</span>
                    {product.oldPrice && (
                      <span className="old-price">${product.oldPrice}</span>
                    )}
                  </div>
                </div>
              </Link>

              <div className="product-actions">
                <button
                  className="add-to-cart-btn"
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  Add to Cart
                </button>
                <button
                  className="remove-btn"
                  onClick={(e) => handleRemoveFromLiked(product.id, e)}
                  title="Remove from liked"
                >
                  💔
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LikedProducts;
