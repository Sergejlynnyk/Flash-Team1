import React from "react";
import { Link } from "react-router-dom";
import "./CategoryCard.scss";

const CategoryCard = ({ category }) => (
  <div className="category-outer">
    <Link
      to={`/categories/${category.id}`}
      className="category-link"
      style={{ textDecoration: "none" }}
    >
      <div className="category-image-container">
        <img
          src={`https://exam-server-5c4e.onrender.com${category.image}`}
          alt={category.title}
          className="category-image"
        />
      </div>
    </Link>
    <div className="category-title">{category.title}</div>
  </div>
);

export default CategoryCard;
