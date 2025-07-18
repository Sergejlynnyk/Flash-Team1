import React from "react";
import "./ToolsAndEquipment.scss";
import FilterBar from "../FilterBar/FilterBar";
import ProductCard from "../ProductCard/ProductCard"; 
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

// Массив товаров
const items = [
  {
    id: 1,
    image: "/14.png",
    alt: "Secateurs",
    name: "Secateurs",
    discount: 17,
    price: 199,
    oldPrice: 240,
  },
  {
    id: 2,
    image: "/img-22.png",
    alt: "Collection for berries (plastic)",
    name: "Collection for berries (plastic)",
    discount: 26,
    price: 26,
    oldPrice: 35,
  },
  {
    id: 3,
    image: "/img-34.png",
    alt: "Gloves (black)",
    name: "Gloves (black)",
    discount: 36,
    price: 9,
    oldPrice: 14,
  },
  {
    id: 4,
    image: "/img-44.png",
    alt: "Watering Can",
    name: "Watering Can",
    discount: 18,
    price: 34,
    oldPrice: 41,
  },
  {
    id: 5,
    image: "/img-8.png",
    alt: "Spade",
    name: "Spade",
    discount: 21,
    price: 56,
    oldPrice: 71,
  },
  {
    id: 6,
    image: "/img-7.png",
    alt: "Hoe",
    name: "Hoe",
    discount: 11,
    price: 31,
    oldPrice: 35,
  },
  {
    id: 7,
    image: "/img-6.png",
    alt: "Garden Fork",
    name: "Garden Fork",
    discount: 15,
    price: 66,
    oldPrice: 78,
  },
  {
    id: 8,
    image: "/img-5.png",
    alt: "Sprayer",
    name: "Sprayer",
    discount: 21,
    price: 85,
    oldPrice: 107,
  },
];

export default function ToolsAndEquipment() {
  return (
    <div className="tools-and-equipment-container">
       <Breadcrumbs items={breadcrumbItems} /> 
      <h2 className="section-title">Tools & Equipment</h2>

      {/* Фильтр (если есть функциональность) */}
      <FilterBar />

      <div className="items-container">
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}