import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ToolsAndEquipment.scss";
import FilterBar from "../FilterBar/FilterBar";
import { useCart } from "../Cart/CartContext";

const items = [
  {
    id: 1,
    image: "/14.png",
    alt: "Secateurs",
    text: "Secateurs",
    discount: 17,
    newPrice: 199,
    oldPrice: 240,
  },
  {
    id: 2,
    image: "/img-22.png",
    alt: "Collection for berries (plastic)",
    text: "Collection for berries (plastic)",
    discount: 26,
    newPrice: 26,
    oldPrice: 35,
  },
  {
    id: 3,
    image: "/img-34.png",
    alt: "Gloves (black)",
    text: "Gloves (black)",
    discount: 36,
    newPrice: 9,
    oldPrice: 14,
  },
  {
    id: 4,
    image: "/img-44.png",
    alt: "Watering Can",
    text: "Watering Can",
    discount: 18,
    newPrice: 34,
    oldPrice: 41,
  },
  {
    id: 5,
    image: "/img-8.png",
    alt: "Spade",
    text: "Spade",
    discount: 21,
    newPrice: 56,
    oldPrice: 71,
  },
  {
    id: 6,
    image: "/img-7.png",
    alt: "Hoe",
    text: "Hoe",
    discount: 11,
    newPrice: 31,
    oldPrice: 35,
  },
  {
    id: 7,
    image: "/img-6.png",
    alt: "Garden Fork",
    text: "Garden Fork",
    discount: 15,
    newPrice: 66,
    oldPrice: 78,
  },
  {
    id: 8,
    image: "/img-5.png",
    alt: "Sprayer",
    text: "Sprayer",
    discount: 21,
    newPrice: 85,
    oldPrice: 107,
  },
];

function ItemCard({ id, image, alt, text, discount, newPrice, oldPrice }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({
      id,
      name: text,
      image,
      price: newPrice,
      oldPrice,
      quantity: 1,
    });
    alert(`${text} added to cart!`);
    // navigate("/cart");
  };

  return (
    <Link to={`/product/${id}`} className="item-card">
      <div className="discount-badge">-{discount}%</div>
      <div className="icon-bar">
        <img
          src="/basket=empty.svg"
          alt="Cart"
          className="icon"
          style={{ cursor: "pointer" }}
          onClick={handleAddToCart}
        />
        <img src="/basket=heart empty.svg" alt="Like" className="icon" />
      </div>
      <img src={image} alt={alt} className="item-image" />
      <div className="item-text">{text}</div>
      <div className="item-prices">
        <span className="new-price">${newPrice}</span>
        <span className="old-price">${oldPrice}</span>
      </div>
    </Link>
  );
}

export default function ToolsAndEquipment() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Tools & Equipment</h2>
      <FilterBar />
      <div className="items-container">
        {items.map((item) => (
          <ItemCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}


