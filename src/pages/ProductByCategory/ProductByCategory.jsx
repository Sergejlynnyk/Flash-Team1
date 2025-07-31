import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../../api/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import './ProductByCategory.scss';

const ProductByCategory = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortOption, setSortOption] = useState('default');
  const [showDiscountedOnly, setShowDiscountedOnly] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getProductsByCategory(id);
        setCategoryName(data[0]?.category || "Category");
        const formattedProducts = data.map((product) => ({
          id: product.id,
          title: product.title,
          image: `https://exam-server-5c4e.onrender.com${product.image}`,
          price: Number(product.discont_price || product.price),
          oldPrice: product.discont_price ? Number(product.price) : null,
          description: product.description,
          discountPercentage: product.discont_price 
            ? Math.round((1 - product.discont_price / product.price) * 100)
            : 0,
          isDiscounted: !!product.discont_price
        }));
        setProducts(formattedProducts);
        setFilteredProducts(formattedProducts);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadProducts();
  }, [id]);

  useEffect(() => {
    let result = [...products];
    
    // Filter by price range
    if (priceRange.min !== '') {
      result = result.filter(product => product.price >= Number(priceRange.min));
    }
    if (priceRange.max !== '') {
      result = result.filter(product => product.price <= Number(priceRange.max));
    }

    // Filter by discount
    if (showDiscountedOnly) {
      result = result.filter(product => product.isDiscounted);
    }

    // Sort products
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
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Default sorting (no change)
        break;
    }

    setFilteredProducts(result);
  }, [priceRange, sortOption, showDiscountedOnly, products]);

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

  const handleDiscountedChange = (e) => {
    setShowDiscountedOnly(e.target.checked);
  };

  const breadcrumbItems = [
    { label: "Main Page", href: "/" },
    { label: categoryName, href: null }
  ];

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="category-page">
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="category-title">{categoryName}</h1>
      
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
        
        <div className="discount-filter">
          <label className="filter-label">
            <input
              type="checkbox"
              className="filter-checkbox"
              checked={showDiscountedOnly}
              onChange={handleDiscountedChange}
            />
            Discounted items
          </label>
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
            <option value="name-asc">name: A-Z</option>
            <option value="name-desc">name: Z-A</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductByCategory;