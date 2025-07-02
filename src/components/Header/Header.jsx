import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
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
            <li><Link to="/" className="active">Main Page</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/products">All products</Link></li>
            <li><Link to="/sales">All sales</Link></li>
          </ul>
        </nav>
      </div>

      <div className="header-right">
        <img src="/basket=heart empty.svg" alt="Heart" className="header-icon" />
        <img src="/basket=empty.svg" alt="Basket" className="header-icon" />
      </div>
    </header>
  );
};

export default Header;
