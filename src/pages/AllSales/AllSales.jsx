import React, { useEffect, useState } from 'react';
import { getDiscountedProducts } from '../../api/products';
import ProductCard from "../../components/ProductCard/ProductCard";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import './AllSales.scss';

const AllSales = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const discountedProducts = await getDiscountedProducts();
        const formattedProducts = discountedProducts.map(product => ({
          id: product.id,
          title: product.title,
          image: `https://exam-server-5c4e.onrender.com${product.image}`,
          price: Number(product.discont_price),
          oldPrice: Number(product.price),
          discountPercentage: Math.round((1 - product.discont_price / product.price) * 100)
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
    
    if (priceRange.min !== '') {
      result = result.filter(product => product.price >= Number(priceRange.min));
    }
    if (priceRange.max !== '') {
      result = result.filter(product => product.price <= Number(priceRange.max));
    }

    switch (sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'discount-high':
        result.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [priceRange, sortOption, products]);

  const handlePriceChange = (e, type) => {
    const value = e.target.value;
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const breadcrumbItems = [
    { label: "Main Page", href: "/" },
    { label: "Sales", href: null }
  ];

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="all-sales-container">
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="page-title">Discounted Items</h1>
      
      <div className="filter-bar">
        <div className="price-filter">
          <span className="filter-label">Price</span>
          <input
            type="number"
            className="filter-input"
            placeholder="from"
            value={priceRange.min}
            onChange={(e) => handlePriceChange(e, 'min')}
          />
          <input
            type="number"
            className="filter-input"
            placeholder="to"
            value={priceRange.max}
            onChange={(e) => handlePriceChange(e, 'max')}
          />
        </div>
        
        <div className="sort-filter">
          <span className="filter-label">Sorted</span>
          <select 
            className="filter-select"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="default">by default</option>
            <option value="price-low-high">price: low to high</option>
            <option value="price-high-low">price: high to low</option>
            <option value="discount-high">biggest discount</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllSales;