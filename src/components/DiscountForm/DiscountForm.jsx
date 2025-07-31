import React, { useState } from "react";
import "./DiscountForm.scss";

export default function DiscountForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); 

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    setError("");
    setIsSubmitted(true); 
    alert("Discount request sent!");
    setName("");
    setPhone("");
    setEmail("");
  }

  return (
    <section className="discount-section">
      <h2 className="discount-title">5% off on the first order</h2>
      <div className="discount-content">
        <div className="discount-image">
          <img src="/image11.png" alt="Gardening tools" />
        </div>

        <form className="discount-form" onSubmit={handleSubmit}>
          <div className="inputs-container">
            <input
              type="text"
              className="discount-input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitted} 
            />
            <input
              type="tel"
              className="discount-input"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isSubmitted}
            />
            <input
              type="email"
              className="discount-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitted}
            />
          </div>
          {error && <p className="error-message">{error}</p>}

          <button
            type="submit"
            className="discount-button"
            disabled={isSubmitted} 
          >
            {isSubmitted ? "Sent!" : "Get a discount"}
          </button>
        </form>
      </div>
    </section>
  );
}
