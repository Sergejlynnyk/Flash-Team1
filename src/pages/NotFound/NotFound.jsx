import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

export default function NotFound() {
  return (
    <section className="notfound-wrapper">
      <div className="notfound-404">
        <img src="/four.png" alt="4" className="notfound-digit" />
        <img src="/cactus.png" alt="Cactus" className="notfound-cactus" />
        <img src="/four.png" alt="4" className="notfound-digit" />
      </div>
      <h2 className="notfound-title">Page Not Found</h2>
      <p className="notfound-text">
        We’re sorry, the page you requested could not be found.
      </p>
      <p className="notfound-text">Please go back to the homepage.</p>
      <Link to="/" className="notfound-button">Go Home</Link>
    </section>
  );
}
