import React from "react";
import "./Breadcrumbs.css"; // optional, für eigenes Styling

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="breadcrumbs">
      {items.map((item, idx) => (
        <span key={idx}>
          {item.href ? (
            <a href={item.href}>{item.label}</a>
          ) : (
            <span>{item.label}</span>
          )}
          {idx < items.length - 1 && <span className="breadcrumb-separator"> &gt; </span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
