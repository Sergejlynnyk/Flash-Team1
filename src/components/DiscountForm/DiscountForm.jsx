import React, { useState } from 'react';
import './DiscountForm.scss';

export default function DiscountForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!phone.trim()) {
      setError('Please enter your phone number');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    setError('');
    alert('Discount request sent!');
    setName('');
    setPhone('');
    setEmail('');
  }

  return (
    <section className="discount-section">
      <h2 className="discount-title">5% off on the first order</h2>
      <div className="discount-content">
        <div className="discount-image">
          {/* Путь должен быть /image11.png если файл лежит в public */}
          <img src="/image11.png" alt="Gardening tools" />
        </div>
        <form className="discount-form" onSubmit={handleSubmit}>
          <h3 className="discount-form-title">Discount Form</h3>
          <div>
            <input
              type="text"
              className="discount-input"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <input
            type="tel"
            className="discount-input"
            placeholder="Phone number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <input
            type="email"
            className="discount-input"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {error && (
            <p className="error-message">{error}</p>
          )}
          <button type="submit" className="discount-button">
            Get a discount
          </button>
        </form>
      </div>
    </section>
  );
}
