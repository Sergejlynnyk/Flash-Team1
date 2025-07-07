import React, { useState } from "react";

const CartForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errs = {};
    if (!name) errs.name = "Please enter your name";
    if (!phone.match(/^\+?\d{10,15}$/)) errs.phone = "Please enter a valid phone number";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Please enter a valid email";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ name, phone, email });
      setName(""); setPhone(""); setEmail(""); setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="cart-form">
      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      {errors.name && <span className="form-error">{errors.name}</span>}
      <input
        placeholder="Phone number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      {errors.phone && <span className="form-error">{errors.phone}</span>}
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      {errors.email && <span className="form-error">{errors.email}</span>}
      <button type="submit">Order</button>
    </form>
  );
};

export default CartForm;
