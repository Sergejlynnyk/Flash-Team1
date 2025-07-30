import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../../api/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import './ProductByCategory.scss';

const ProductByCategory = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getProductsByCategory(id);
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
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadProducts();
  }, [id]);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="category-page">
      <h1 className="category-title">Category Products</h1>
      
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductByCategory;