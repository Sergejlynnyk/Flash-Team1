import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts, formatProduct } from "../../api/products";
import "./AllProducts.scss";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sort, setSort] = useState("default");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const breadcrumbItems = [
    { label: "Main page", href: "/" },
    { label: "All products" },
  ];

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
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="product-card"
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

              <button className="like-button">
                {product.isLiked ? "💖" : "🤍"}
              </button>

              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                  }}
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
          ))}
        </div>
      )}
    </div>
  );
}
