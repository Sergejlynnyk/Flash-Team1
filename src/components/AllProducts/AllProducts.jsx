// src/AllProducts/AllProducts.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AllProducts.scss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sort, setSort] = useState('default');
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('https://exam-server-5c4e.onrender.com/products/all')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFiltered(data);
      })
      .catch(err => console.error('Error loading products:', err));
  }, []);

  useEffect(() => {
    let sorted = [...products];

    if (sort === 'asc') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'desc') sorted.sort((a, b) => b.price - a.price);

    if (query) {
      sorted = sorted.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFiltered(sorted);
  }, [sort, query, products]);

  const breadcrumbItems = [
  { label: 'Main page', href: '/' },
  { label: 'All products' }
];

  return (
    <div className="all-products-container">
       <Breadcrumbs items={breadcrumbItems} />
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="default">Default</option>
          <option value="asc">Price: Low to high</option>
          <option value="desc">Price: High to low</option>
        </select>
      </div>

      <div className="product-grid">
        {filtered.map(product => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="product-card"
          >
            {product.discountPercentage && (
              <div className="discount-badge">-{product.discountPercentage}%</div>
            )}

            <button className="like-button">
              {product.isLiked ? '💖' : '🤍'}
            </button>

            <img
              src={`https://exam-server-5c4e.onrender.com${product.image}`}
              alt={product.title}
            />

            <div className="product-info">
              <h4>{product.title}</h4>
              <div className="price">
                <span>{product.price} €</span>
                {product.oldPrice && (
                  <span className="old-price">{product.oldPrice} €</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* <div className="contact-section">
        <h2>Contact</h2>
        <div className="contact-grid">
          <div><strong>Phone</strong><br />+49 999 999 99 99</div>
          <div><strong>Socials</strong><br />🎥 📷</div>
          <div><strong>Address</strong><br />Linkstraße 2, 8 OG, 10785, Berlin, Deutschland</div>
          <div><strong>Working Hours</strong><br />24 hours a day</div>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.7242332783053!2d13.374583476326997!3d52.50676167195904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c9eb661bbd%3A0xa91e50d5aa6212a6!2sLinkstra%C3%9Fe%202%2C%2010785%20Berlin%2C%20Germany!5e0!3m2!1sen!2sde!4v1720000000000"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: "16px", marginTop: "24px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div> */}
    </div>
  );
}