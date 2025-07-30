import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../api/products";
import ProductCard from "../ProductCard/ProductCard";
import './AllProducts.scss';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        const formattedProducts = data.map((product) => ({
          id: product.id,
          title: product.title,
          image: `https://exam-server-5c4e.onrender.com${product.image}`,
          price: Number(product.discont_price || product.price),
          oldPrice: product.discont_price ? Number(product.price) : null,
          description: product.description
        }));
        setProducts(formattedProducts);
      } catch (err) {
        console.error("Error loading products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="all-products-container">
      <h1 className="page-title">All Products</h1>
      
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}