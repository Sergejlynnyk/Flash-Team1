import React from 'react';
import './Header.scss';
import { Link, useLocation } from 'react-router-dom';
import { useLiked } from "../Liked/LikedContext";
import { useCart } from "../Cart/CartContext";
import ToggleSwitch from '../Toggle/ToggleSwitch'; 

const Header = () => {
  const location = useLocation();
  const { cart } = useCart();
  const { likedCount } = useLiked();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="custom-header">
      <div className="header-content">
        <div className="header-left">
          <img src="/logo.svg" alt="Logo" className="logo-image" />
          <ToggleSwitch />
        </div>

        <div className="center-box">
          <button className="promo-button">1 day discount!</button>
          <nav>
            <ul>
              <li>
                <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                  Main Page
                </Link>
              </li>
              <li>
                <Link to="/categories" className={location.pathname === "/categories" ? "active" : ""}>
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/all-products" className={location.pathname === "/all-products" ? "active" : ""}>
                  All products
                </Link>
              </li>
              <li>
                <Link to="/sales" className={location.pathname === "/sales" ? "active" : ""}>
                  All sales
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header-right">
          <Link to="/liked" className="liked-link">
            <img src="/basket=heart empty.svg" alt="Liked" className="header-icon" />
            {likedCount > 0 && <span className="liked-count">{likedCount}</span>}
          </Link>
          
          <Link to="/cart" className="cart-link">
            <img src="/basket=empty.svg" alt="Basket" className="header-icon" />
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
