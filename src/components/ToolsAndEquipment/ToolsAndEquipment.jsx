import React, { useState, useEffect } from "react";
import "./ToolsAndEquipment.scss";
import FilterBar from "../FilterBar/FilterBar";
import ProductCard from "../ProductCard/ProductCard"; 
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { getProductsByCategory } from "../../api/products";
import { useLiked } from "../Liked/LikedContext";  
import { useCart } from "../Cart/CartContext";      
import { Link } from "react-router-dom";

export default function ToolsAndEquipment() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleLiked, isLiked } = useLiked();
  const { addToCart } = useCart();

  // ID категории "Tools and equipment" = 4
  const TOOLS_CATEGORY_ID = 4;

  const breadcrumbItems = [
    { label: 'Main page', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: 'Tools & Equipment' }
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getProductsByCategory(TOOLS_CATEGORY_ID);
        
        const formattedProducts = data.map(product => ({
          id: product.id,
          name: product.title,
          title: product.title,
          image: `https://exam-server-5c4e.onrender.com${product.image}`,
          price: Number(product.discont_price || product.price),
          oldPrice: product.discont_price ? Number(product.price) : null,
          discount: product.discont_price ? 
            Math.round(((Number(product.price) - Number(product.discont_price)) / Number(product.price)) * 100) : 
            null
        }));

        setProducts(formattedProducts);
      } catch (err) {
        console.error('Error loading tools products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.title,
      image: product.image,
      price: product.price,
      oldPrice: product.oldPrice,
      quantity: 1
    });
    
    alert(`${product.title} added to cart!`);
  };

  const handleToggleLike = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleLiked({
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      oldPrice: product.oldPrice
    });
  };

  if (loading) {
    return (
      <div className="tools-and-equipment-container">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tools-and-equipment-container">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="tools-and-equipment-container">
      <Breadcrumbs items={breadcrumbItems} /> 
      <h2 className="section-title">Tools & Equipment</h2>

      <FilterBar />

      <div className="items-container">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <Link to={`/product/${product.id}`} className="product-link">
              <div className="product-card">
                {product.discount && (
                  <div className="discount-badge">-{product.discount}%</div>
                )}

                <div className="icon-bar">
                  <button
                    className="icon-btn"
                    onClick={(e) => handleAddToCart(product, e)}
                    title="Add to cart"
                  >
                    <img src="/basket=empty.svg" alt="Cart" className="icon" />
                  </button>
                  <button
                    className={`icon-btn like-btn ${isLiked(product.id) ? 'liked' : ''}`}
                    onClick={(e) => handleToggleLike(product, e)}
                    title={isLiked(product.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <img 
                      src={isLiked(product.id) ? "/basket=heart filled.svg" : "/basket=heart empty.svg"} 
                      alt="Like" 
                      className="icon" 
                    />
                  </button>
                </div>

                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="item-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
                
                <div className="item-text">{product.title}</div>
                
                <div className="item-prices">
                  <span className="new-price">${product.price}</span>
                  {product.oldPrice && (
                    <span className="old-price">${product.oldPrice}</span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}