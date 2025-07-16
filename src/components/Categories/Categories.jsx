import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Categories.scss';

export default function Categories() {
  const [Categories, setCategories] = useState([]);
  const [randomCategories, setRandomCategories] = useState([]);

  function getRandomItems(arr, n) {
    if (n >= arr.length) return arr;
    const result = [];
    const usedIndices = new Set();
    while (result.length < n) {
      const idx = Math.floor(Math.random() * arr.length);
      if (!usedIndices.has(idx)) {
        result.push(arr[idx]);
        usedIndices.add(idx);
      }
    }
    return result;
  }

  useEffect(() => {
    fetch('https://exam-server-5c4e.onrender.com/categories/all')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setRandomCategories(getRandomItems(data, 4));
      })
      .catch(err => console.error('Fehler beim Laden der Kategorien:', err));
  }, []);

  return (
    <div className="categories-container">
      <section className="categories-section">
    
        <div className="categories-title">
          <h2>Categories</h2>
        </div>
        
     

        <div className="categories-grid">
          {randomCategories.map(category => (
            <Link
              to="/tools-and-equipment"
              key={category.id}
              className="category-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img
                src={`https://exam-server-5c4e.onrender.com${category.image}`}
                alt={category.title}
                className="category-image"
              />
              <div className="category-label">{category.title}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
