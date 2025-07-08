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
      setError('Wrong input. Try please again.');
    } else {
      setError('');
      alert('email sent!');
      setName('');
      setPhone('');
      setEmail('');
    }
  }

  return (
    <section className="discount-section">
      <h2 className="discount-title">5% off on the first order</h2>
      <div className="discount-content">
        <div className="discount-image">
          <img src="/image11.png" alt="Hands with garden tools" />
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
              required
            />
            {error && (
              <p className="error-message">{error}</p>
            )}
          </div>
          <input
            type="tel"
            className="discount-input"
            placeholder="Phone number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
          <input
            type="email"
            className="discount-input"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="discount-button">
            Get a discount
          </button>
        </form>
      </div>
    </section>
  );
}
