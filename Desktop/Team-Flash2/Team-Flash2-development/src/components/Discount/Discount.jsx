import React, { useState } from 'react';
import styles from './Discount.module.scss';

export default function Discount() {
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
      alert('Email sent!');
      setName('');
      setPhone('');
      setEmail('');
    }
  }

  return (
    <section className={styles.discountSection}>
      <div className={styles.discountContent}>
        {/* Linke Seite: Titel & Bild */}
        <div className={styles.discountLeft}>
          <h2 className={styles.discountTitle}>5% off on the first order</h2>
          <img
            src="/image11.png"
            alt="Hands with garden tools"
            className={styles.discountImage}
          />
        </div>
        {/* Rechte Seite: Formular */}
        <form className={styles.discountForm} onSubmit={handleSubmit}>
          {/* <h3 className={styles.discountFormTitle}>Discount Form</h3> */}
          <div>
            <input
              type="text"
              className={styles.discountInput}
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              autoComplete="off"
            />
            {error && <p className={styles.errorMessage}>{error}</p>}
          </div>
          <input
            type="tel"
            className={styles.discountInput}
            placeholder="Phone number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
            autoComplete="off"
          />
          <input
            type="email"
            className={styles.discountInput}
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="off"
          />
          <button type="submit" className={styles.discountButton}>
            Get a discount
          </button>
        </form>
      </div>
    </section>
  );
}
