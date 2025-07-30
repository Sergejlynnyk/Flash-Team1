import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsByCategory, getAllCategories } from "../../api/products";
import { useCart } from "../../components/Cart/CartContext";
import { useLiked } from "../../components/Liked/LikedContext";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import "./ProductByCategory.scss";

const ProductByCategory = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleLiked, isLiked } = useLiked();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    onlyDiscounted: false,
    sortBy: "default",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const categoryData = await getProductsByCategory(id);
        const categories = await getAllCategories();
        const currentCategory = categories.find(
          (cat) => cat.id === parseInt(id)
        );

        const formattedProducts = categoryData.map((product) => ({
          id: product.id,
          title: product.title,
          name: product.title,
          image: `https://exam-server-5c4e.onrender.com${product.image}`,
          price: Number(product.discont_price || product.price),
          oldPrice: product.discont_price ? Number(product.price) : null,
          description: product.description || "",
          categoryId: product.categoryId,
        }));

        setProducts(formattedProducts);
        setFilteredProducts(formattedProducts);
        setCategory(currentCategory);
      } catch (err) {
        console.error("Error loading category products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id]);

  useEffect(() => {
    let result = [...products];

    if (filters.minPrice) {
      result = result.filter((p) => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= Number(filters.maxPrice));
    }

    if (filters.onlyDiscounted) {
      result = result.filter((p) => p.oldPrice !== null);
    }

    switch (filters.sortBy) {
      case "priceAsc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [filters, products]);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.title,
      image: product.image,
      price: product.price,
      oldPrice: product.oldPrice,
      quantity: 1,
    });
  };

  const handleToggleLike = (product, e) => {
    e.preventDefault();
    e.stopPropagation();

    const productForLiked = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      oldPrice: product.oldPrice,
    };

    toggleLiked(productForLiked);
  };
  const handleAddToCartIcon = (product, e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id,
      name: product.title,
      image: product.image,
      price: product.price,
      oldPrice: product.oldPrice,
      quantity: 1,
    });
  };

  const calculateDiscount = (oldPrice, price) => {
    if (!oldPrice) return 0;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  };

  const resetFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      onlyDiscounted: false,
      sortBy: "default",
    });
  };

  const breadcrumbItems = [
    { label: "Main page", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: "Tools and equipment" },
  ];

  if (loading) {
    return (
      <div className="category-page">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-page">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="category-page">
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className="category-title">Tools and equipment</h1>

      <div className="filters-section">
        <div className="filter-group">
          <label>Price:</label>
          <input
            type="number"
            placeholder="From"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="To"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
          />
        </div>

        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={filters.onlyDiscounted}
              onChange={(e) =>
                setFilters({ ...filters, onlyDiscounted: e.target.checked })
              }
            />
            Only discounted items
          </label>
        </div>

        <div className="filter-group">
          <label>Sort by:</label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          >
            <option value="default">Default</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>

        <button className="reset-filters" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>No products found matching your criteria</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => {
            const discount = calculateDiscount(product.oldPrice, product.price);

            return (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`} className="product-link">
                  {discount > 0 && (
                    <div className="discount-badge">-{discount}%</div>
                  )}

                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-image.jpg";
                    }}
                  />

                  <div className="product-info">
                    <h3 className="product-name">{product.title}</h3>
                    <div className="product-prices">
                      <span className="current-price">${product.price}</span>
                      {product.oldPrice && (
                        <span className="old-price">${product.oldPrice}</span>
                      )}
                    </div>
                  </div>
                </Link>
                <button
                  className={`like-btn ${isLiked(product.id) ? "liked" : ""}`}
                  onClick={(e) => handleToggleLike(product, e)}
                  title={
                    isLiked(product.id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <img
                    src={isLiked(product.id) ? "/liked.png" : "/notliked.png"}
                    alt="Like"
                    className="heart-icon"
                  />
                </button>

                <button
                  className="cart-btn"
                  onClick={(e) => handleAddToCartIcon(product, e)}
                  title="Add to cart"
                >
                  <img src="/basket.png" alt="Cart" className="cart-icon" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductByCategory;
