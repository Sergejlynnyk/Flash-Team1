import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/products";
import { useCart } from "../components/Cart/CartContext";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import "./ProductDetails.scss";
export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(id);
        const productData = Array.isArray(response) ? response[0] : response;
        console.log("Product data after array check:", productData);

        // Форматируем данные продукта
        // Форматируем данные продукта

        const formattedProduct = {
          id: productData.id,
          title: productData.title,
          image: productData.image
            ? `https://exam-server-5c4e.onrender.com${productData.image}`
            : "/placeholder-image.jpg",
          price: productData.discont_price
            ? Number(productData.discont_price)
            : Number(productData.price),
          oldPrice: productData.discont_price
            ? Number(productData.price)
            : null,
          description: productData.description || "No description available.",
          categoryId: productData.categoryId,
        };

        setProduct(formattedProduct);
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.title,
        image: product.image,
        price: product.price,
        oldPrice: product.oldPrice,
        quantity: quantity,
      });

      // Показываем уведомление
      alert(`${product.title} added to cart!`);
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const getSlicedText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const calculateDiscount = () => {
    if (!product.oldPrice) return 0;
    return Math.round(
      ((product.oldPrice - product.price) / product.oldPrice) * 100
    );
  };

  // Хлебные крошки
  const breadcrumbItems = [
    { label: "Main page", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: product ? product.title : "Product" },
  ];

  if (loading) {
    return (
      <div className="product-details-wrapper">
        <div className="loading">Loading product details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-details-wrapper">
        <div className="error">
          <h2>Error loading product</h2>
          <p>{error}</p>
          <button onClick={() => navigate("/")}>Go to Homepage</button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-wrapper">
        <div className="product-not-found">
          <h2>Product not found</h2>
          <button onClick={() => navigate("/")}>Go to Homepage</button>
        </div>
      </div>
    );
  }

  const discount = calculateDiscount();

  return (
    <div className="product-details-wrapper">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="product-details">
        <div className="image-block">
          <img
            src={product.image}
            alt={product.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder-image.jpg";
            }}
          />
        </div>

        <div className="info-block">
          <h1 className="product-title">{product.title}</h1>

          <div className="price-row">
            <span className="new-price">${product.price}</span>
            {product.oldPrice && (
              <>
                <span className="old-price">${product.oldPrice}</span>
                <span className="discount">-{discount}%</span>
              </>
            )}
          </div>

          <div className="quantity-cart">
            <div className="quantity-control">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>

          <div className="description">
            <h2>Description</h2>
            <p>
              {showFullDescription
                ? product.description
                : getSlicedText(product.description)}
            </p>
            {product.description.length > 100 && (
              <button
                onClick={toggleDescription}
                className="toggle-description"
              >
                {showFullDescription ? "Hide Text" : "Read more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
