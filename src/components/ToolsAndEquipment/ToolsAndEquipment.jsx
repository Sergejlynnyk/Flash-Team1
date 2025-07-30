import React from "react";
import "./ToolsAndEquipment.scss";
import ProductCard from "../ProductCard/ProductCard";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const items = [
  {
    id: 1,
    title: "Secateurs",
    image: "/14.png",
    price: 199,
    oldPrice: 240,
  },
  {
    id: 2,
    title: "Collection for berries (plastic)",
    image: "/img-22.png",
    price: 26,
    oldPrice: 35,
  },
  {
    id: 3,
    title: "Gloves (black)",
    image: "/img-34.png",
    price: 9,
    oldPrice: 14,
  },
  {
    id: 4,
    title: "Watering Can",
    image: "/img-44.png",
    price: 34,
    oldPrice: 41,
  },
  {
    id: 5,
    title: "Spade",
    image: "/img-8.png",
    price: 56,
    oldPrice: 71,
  },
  {
    id: 6,
    title: "Hoe",
    image: "/img-7.png",
    price: 31,
    oldPrice: 35,
  },
  {
    id: 7,
    title: "Garden Fork",
    image: "/img-6.png",
    price: 66,
    oldPrice: 78,
  },
  {
    id: 8,
    title: "Sprayer",
    image: "/img-5.png",
    price: 85,
    oldPrice: 107,
  },
];

export default function ToolsAndEquipment() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tools & Equipment", href: null }
  ];

  return (
    <div className="tools-and-equipment-container">
      <Breadcrumbs items={breadcrumbItems} />
      <h2 className="section-title">Tools & Equipment</h2>
      <div className="items-container">
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}