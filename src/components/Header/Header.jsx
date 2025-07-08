import React from 'react';
import './Header.scss';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from "../Cart/CartContext"; // Pfad ggf. anpassen

const Header = () => {
  const location = useLocation();
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="custom-header">
      <div className="header-left">
        <img src="/logo.svg" alt="Logo" className="logo-image" />
        <img src="/mode=light.svg" alt="Toggle Mode" className="mode-toggle-image" />
      </div>

      <div className="center-box">
        <button>1 day discount!</button>
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
              <Link to="/products" className={location.pathname === "/products" ? "active" : ""}>
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
        <img src="/basket=heart empty.svg" alt="Heart" className="header-icon" />
        <Link to="/cart" className="cart-link">
          <img src="/basket=empty.svg" alt="Basket" className="header-icon" />
          {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;
