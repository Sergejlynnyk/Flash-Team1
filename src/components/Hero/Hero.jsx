import React from 'react';
import './Hero.scss'; // Falls du SCSS verwendest

const Hero = () => {
  return (
    <div className="hero-section">
      <img src="/public/img-4.png" alt="Hero" className="hero-image" />

      <div className="hero-content">
        <h1 className="hero-text">Amazing Discounts on Garden Products!</h1>
        <button className="hero-button">Check out</button>
      </div>
    </div>
  );
};

export default Hero;
