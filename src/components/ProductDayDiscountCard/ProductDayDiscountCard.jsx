import React, { useEffect, useState } from "react";
import "./ProductDayDiscountCard.scss";
import { BASE_BACKEND_URL } from "../../utils/env";

import { useCart } from "../Cart/CartContext";
import { useLiked } from "../Liked/LikedContext";

const getSeededRandomIndex = (seed, max) => seed % max;

const ProductDayDiscountCard = ({ products }) => {
  const [product, setProduct] = useState(null);
  const [date, setDate] = useState(null);
  const { addToCart } = useCart();
  const { toggleLiked, isLiked } = useLiked();

  useEffect(() => {
    if (products && products.length > 0) {
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
      const saved = JSON.parse(localStorage.getItem("productOfTheDay"));

      if (saved?.date === today) {
        setProduct(saved.product);
      } else {
        const seed = new Date(today).getTime();
        const randomIndex = getSeededRandomIndex(seed, products.length);
        const selectedProduct = products[randomIndex];
        localStorage.setItem(
          "productOfTheDay",
          JSON.stringify({ date: today, product: selectedProduct })
        );
        setProduct(selectedProduct);
      }
    }
  }, [products]);

  if (!product) return null;

  const { image, title, price } = product;
  const discountPrice = (price / 2).toFixed(2);
  const imageUrl = `${BASE_BACKEND_URL}${image}`;

  const handleAddToCart = () => {
    const discountedProduct = {
      ...product,
      name: product.title,
      price: Number(discountPrice),
      oldPrice: Number(price),
      image: imageUrl,
      isDayDiscount: true,
    };
    addToCart(discountedProduct);
    console.log("Товар добавлен в корзину (контекст):", discountedProduct);
  };

  const handleToggleLiked = () => {
  const likedProduct = {
    ...product,
    image: imageUrl, // абсолютный путь
    isDayDiscount: true,
    price: Number(discountPrice),
    oldPrice: Number(price),
  };
  toggleLiked(likedProduct);
};

  return (
    <div className="product-of-day-card">
      <div className="cardImageWrapper">
        <img src={imageUrl} className="productImage" alt={title} />
        <div className="discountChip">−50%</div>

        <button
          className={`heartBtn ${isLiked(product.id) ? "liked" : ""}`}
          onClick={handleToggleLiked}
        >
          <img
            src={isLiked(product.id) ? "/liked.png" : "/notliked.png"}
            alt="Like"
            className="heart-icon"
          />
        </button>
      </div>

      <div className="cardDetails">
        <h3 className="productTitle">{title}</h3>
        <div className="priceContainer">
          <div className="priceWrapper">
            <p className="discontPrice">${discountPrice}</p>
            <p className="originalPrice">${price}</p>
          </div>
        </div>
        <div className="buttonWrapper">
          <button onClick={handleAddToCart} className="addToCart" type="button">
            Add to Cart
          </button>
        </div>
        {date && (
          <p className="productDate">
            🗓️ One Day Offer for{" "}
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDayDiscountCard;
