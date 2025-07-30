import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from "../../components/Cart/CartContext";
import { useLiked } from "../../components/Liked/LikedContext"; 
import './AllSales.scss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { getDiscountedProducts } from '../../api/products';

const AllSales = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    sortBy: '', 
  });

  const { addToCart } = useCart();
  const { toggleLiked, isLiked } = useLiked(); 

  const breadcrumbItems = [
    { label: 'Main page', href: '/' },
    { label: 'All sales' }
  ];

  const calculateDiscount = (oldPrice, price) => {
    if (!oldPrice || !price || oldPrice <= price) return 0;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const discountedProducts = await getDiscountedProducts();
        
        const formattedProducts = discountedProducts.map(product => ({
          id: product.id,
          name: product.title,
          image: `https://exam-server-5c4e.onrender.com${product.image}`,
          price: Number(product.discont_price),
          oldPrice: Number(product.price),
        }));

        setProducts(formattedProducts);
        setFilteredProducts(formattedProducts);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    // 🔍 Фильтрация
    if (filters.minPrice) {
      result = result.filter(p => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(p => p.price <= Number(filters.maxPrice));
    }

    switch (filters.sortBy) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        result.sort((a, b) => {
          const d1 = calculateDiscount(a.oldPrice, a.price);
          const d2 = calculateDiscount(b.oldPrice, b.price);
          return d2 - d1;
        });
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [filters, products]);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  const handleToggleLike = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const productForLiked = {
      id: product.id,
      title: product.name,
      image: product.image,
      price: product.price,
      oldPrice: product.oldPrice
    };
    
    toggleLiked(productForLiked);
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="all-sales-container">
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className="page-title">Discounted Items</h1>

      <div className="filters">
        <div className="filter-group">
          <label>Price:</label>
          <input
            type="number"
            placeholder="From"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          />
          <input
            type="number"
            placeholder="To"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          />
        </div>

        <div className="filter-group">
          <label>Sort by:</label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          >
            <option value="">-- Select --</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map(product => {
            const discount = calculateDiscount(product.oldPrice, product.price);

            return (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`} className="product-link">
                  <div className="discount-badge">-{discount}%</div>
                  
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                  />
                  
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="prices">
                      <span className="current-price">{product.price} €</span>
                      <span className="old-price">{product.oldPrice} €</span>
                    </div>
                  </div>
                </Link>

                <div className="icon-bar">
                  <button
                    className={`icon-btn like-btn ${isLiked(product.id) ? 'liked' : ''}`}
                    onClick={(e) => handleToggleLike(product, e)}
                    title={isLiked(product.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <img
                      src={isLiked(product.id) ? "/liked.png" : "/notliked.png"}
                      alt="Like"
                      className="icon"
                    />
                  </button>
                  <button
                    className="icon-btn cart-btn"
                    onClick={(e) => handleAddToCart(product, e)}
                    title="Add to cart"
                  >
                    <img src="/basket.png" alt="Cart" className="icon" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-products">
          <p>No products match your filters</p>
          <button
            className="reset-filters"
            onClick={() => setFilters({ minPrice: '', maxPrice: '', sortBy: '' })}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AllSales;