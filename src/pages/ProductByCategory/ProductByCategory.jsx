import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory, getAllCategories } from "../../api/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import "./ProductByCategory.scss";

const ProductByCategory = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        const productsData = await getProductsByCategory(id);
        
        const categoriesData = await getAllCategories();
        const currentCategory = categoriesData.find(cat => cat.id === parseInt(id));
        setCategoryName(currentCategory?.title || "Category");
        
        const formattedProducts = productsData.map((product) => ({
          id: product.id,
          title: product.title,
          image: `https://exam-server-5c4e.onrender.com${product.image}`,
          price: Number(product.discont_price || product.price),
          oldPrice: product.discont_price ? Number(product.price) : null,
          description: product.description,
        }));
        
        setProducts(formattedProducts);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load category data");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadData();
  }, [id]);

  const breadcrumbItems = [
    { label: "Main page", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: categoryName || "Category" },
  ];

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="category-page">
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="category-title">{categoryName || "Loading..."}</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductByCategory;