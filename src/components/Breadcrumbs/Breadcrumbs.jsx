import React from "react";
import { Link } from "react-router-dom";
import "./Breadcrumbs.scss";

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="breadcrumbs">
      {items.map((item, idx) => (
        <span key={idx} className="breadcrumb-item">
          {item.href ? (
            <Link to={item.href}>{item.label}</Link>
          ) : (
            <span className="active">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs; 




