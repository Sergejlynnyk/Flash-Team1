import React, { useEffect, useState } from 'react';
import { getDiscountedProducts } from '../../api/products';
import ProductCard from "../../components/ProductCard/ProductCard";
import './AllSales.scss';

const AllSales = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        }));
        setProducts(formattedProducts);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="all-sales-container">
      <h1 className="page-title">Discounted Items</h1>

      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllSales;