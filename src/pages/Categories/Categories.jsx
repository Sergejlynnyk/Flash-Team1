import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/CategoriesData';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import './Categories.scss';

export default function Categories() {
  const breadcrumbItems = [
    { label: "Main page", href: "/" },
    { label: "Categories" } 
  ];

  
  return (
    <section className="categories-section">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="categories-title">
        <h2>Categories</h2>
      </div>

      <div className="categories-grid">
        {categories.map(cat =>
          cat.title === 'Tools and equipment' ? (
            <Link
              to="/tools-and-equipment"
              key={cat.id}
              className="category-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img src={cat.image} alt={cat.title} className="category-image" />
              <div className="category-label">{cat.title}</div>
            </Link>
          ) : (
            <div key={cat.id} className="category-card">
              <img src={cat.image} alt={cat.title} className="category-image" />
              <div className="category-label">{cat.title}</div>
            </div>
          )
        )}
      </div>
    </section>
  );
}