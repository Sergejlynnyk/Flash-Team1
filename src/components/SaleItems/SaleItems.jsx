import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SaleItems.scss";
import { useCart } from "../Cart/CartContext";
import { useLiked } from "../Liked/LikedContext";
import { getRandomDiscountedProducts } from "../../api/products";
import Section from "../Section/Section";

const SaleItems = () => {
  const { addToCart } = useCart();
  const { toggleLiked, isLiked } = useLiked();
  const [items, setItems] = useState([]);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    const loadSaleItems = async () => {
      try {
        const products = await getRandomDiscountedProducts(4);

        const formattedItems = products.map((product) => ({
          id: product.id,
          discount: product.oldPrice
            ? `-${Math.round(
                ((product.oldPrice - product.price) / product.oldPrice) * 100
              )}%`
            : "-0%",
          image: product.image,
          title: product.title,
          newPrice: product.price,
          oldPrice: product.oldPrice || product.price,
        }));

        setItems(formattedItems);
      } catch (err) {
        console.error("Error loading sale items:", err);
      }
    };

    loadSaleItems();
  }, []);

  const handleAddToCart = (item, e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart({
      id: item.id,
      name: item.title,
      price: item.newPrice,
      image: item.image,
      quantity: 1,
    });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 900);
  };

  const handleToggleLike = (item, e) => {
    e.preventDefault();
    e.stopPropagation();
    const productForLiked = {
      id: item.id,
      title: item.title,
      image: item.image,
      price: item.newPrice,
      oldPrice: item.oldPrice !== item.newPrice ? item.oldPrice : null,
    };
    toggleLiked(productForLiked);
  };

  return (
    <Section title="Products">
      {items.map((item) => (
        <Link
          to={`/product/${item.id}`}
          key={item.id}
          className="product-link"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="item-card">
            <div className="discount-badge">{item.discount}</div>
            <div className="icon-bar">
              <button
                className="icon-btn"
                onClick={(e) => handleAddToCart(item, e)}
              >
                <img src="/basket.png" alt="Cart" className="icon" />
              </button>
              <button
                className={`icon-btn like-btn ${
                  isLiked(item.id) ? "liked" : ""
                }`}
                onClick={(e) => handleToggleLike(item, e)}
              >
                <img
                  src={isLiked(item.id) ? "/liked.png" : "/notliked.png"}
                  alt="Like"
                  className="icon"
                />
              </button>
            </div>
            <img src={item.image} alt={item.title} className="item-image" />
            <div className="item-text">{item.title}</div>
            <div className="item-prices">
              <span className="new-price">${item.newPrice}</span>
              <span className="old-price">${item.oldPrice}</span>
            </div>
          </div>
        </Link>
      ))}
    </Section>
  );
};

export default SaleItems;
