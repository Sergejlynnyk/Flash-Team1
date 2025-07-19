import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts, formatProduct } from "../../api/products";
import { useLiked } from "../Liked/LikedContext";
import { useCart } from "../Cart/CartContext";
import "./AllProducts.scss";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sort, setSort] = useState("default");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { toggleLiked, isLiked } = useLiked();
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        const formattedProducts = data.map((product) => ({
          ...product,
          image: `https://exam-server-5c4e.onrender.com${product.image}`,
          title: product.title,
          name: product.title,
          price: Number(product.discont_price || product.price),
          oldPrice: product.discont_price ? Number(product.price) : null,
        }));
        setProducts(formattedProducts);
        setFiltered(formattedProducts);
      } catch (err) {
        console.error("Error loading products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let sorted = [...products];

    if (sort === "asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "desc") sorted.sort((a, b) => b.price - a.price);

    if (query) {
      sorted = sorted.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFiltered(sorted);
  }, [sort, query, products]);

  const handleToggleLike = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const productForLiked = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      oldPrice: product.oldPrice
    };
    
    toggleLiked(productForLiked);
  };

  const breadcrumbItems = [
    { label: "Main page", href: "/" },
    { label: "All products" },
  ];

  if (loading) {
    return (
      <div className="all-products-container">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="all-products-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="all-products-container">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="sort-select"
        >
          <option value="default">Default</option>
          <option value="asc">Price: Low to high</option>
          <option value="desc">Price: High to low</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="no-results">
          No products found. Try another search term.
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <div key={product.id} className="product-card">
              <Link
                to={`/product/${product.id}`}
                className="product-link"
              >
                {product.oldPrice && (
                  <div className="discount-badge">
                    -
                    {Math.round(
                      ((product.oldPrice - product.price) / product.oldPrice) *
                        100
                    )}
                    %
                  </div>
                )}

                <div className="image-container">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                    onError={(e) => {
                      console.log("Image failed to load:", product.image);
                      e.target.onerror = null;
                      e.target.src = "/placeholder-image.jpg";
                    }}
                    onLoad={() => console.log("Image loaded:", product.image)}
                  />
                </div>

                <div className="product-info">
                  <h4>{product.title}</h4>
                  <div className="price">
                    <span>{product.price.toFixed(2)} €</span>
                    {product.oldPrice && (
                      <span className="old-price">
                        {product.oldPrice.toFixed(2)} €
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              <button 
                className={`like-button ${isLiked(product.id) ? 'liked' : ''}`}
                onClick={(e) => handleToggleLike(product, e)}
                title={isLiked(product.id) ? "Remove from favorites" : "Add to favorites"}
              >
                <div className="heart-icon">
                  {isLiked(product.id) ? '❤️' : '🤍'}
                </div>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}