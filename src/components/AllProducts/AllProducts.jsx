import React, { useEffect, useState } from "react";
import FilterBar from "../FilterBar/FilterBar";
import "./AllProducts.scss";

function ItemCard({ image, alt, text, discount, newPrice, oldPrice }) {
  return (
    <div className="item-card">
      <div className="discount-badge">-{discount}%</div>
      <div className="icon-bar">
        <img src="/basket=empty.svg" alt="Cart" className="icon" />
        <img src="/basket=heart empty.svg" alt="Like" className="icon" />
      </div>
      <img src={image} alt={alt} className="item-image" />
      <div className="item-text">{text}</div>
      <div className="item-prices">
        <span className="new-price">${newPrice}</span>
        <span className="old-price">${oldPrice}</span>
      </div>
    </div>
  );
}

export default function AllProducts() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch("https://exam-server-5c4e.onrender.com/products/all")
      .then(res => res.json())
      .then(data => setAllProducts(data))
      .catch(err => console.error("Fehler beim Laden der Produkte:", err));
  }, []);

  return (
    <div className="allproducts-outer-container">
      <section className="allproducts-section">
        <h2 className="allproducts-title">All Products</h2>
        
        <FilterBar />    {/* <-- HIER eingefügt */}

        <div className="items-container">
          {allProducts.map((item, idx) => (
            <ItemCard
              key={item.id || idx}
              image={item.image}
              alt={item.title}
              text={item.title}
              discount={item.discount}
              newPrice={item.newPrice}
              oldPrice={item.oldPrice}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
