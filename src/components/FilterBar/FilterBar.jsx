
import React from "react";
import "./FilterBar.scss";

export default function FilterBar() {
  return (
    <div className="filter-bar">
      <label className="filter-label">Price</label>
      <input className="filter-input" type="number" placeholder="from" />
      <input className="filter-input" type="number" placeholder="to" />
      <label className="filter-label">
        Discounted items
        <input className="filter-checkbox" type="checkbox" />
      </label>
      <label className="filter-label">Sorted</label>
      <select className="filter-select">
        <option>by default</option>
        <option>price: low to high</option>
        <option>price: high to low</option>
        <option>biggest discount</option>
      </select>
    </div>
  );
}
