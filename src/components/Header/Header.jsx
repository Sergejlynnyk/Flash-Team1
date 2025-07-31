import React, { useState } from 'react';
import './Header.scss';
import { Link, useLocation } from 'react-router-dom';
import { useLiked } from "../Liked/LikedContext";
import { useCart } from "../Cart/CartContext";
import ToggleSwitch from '../Toggle/ToggleSwitch'; 
import Modal from '../Modal/Modal';
import ProductDayDiscountCard from '../ProductDayDiscountCard/ProductDayDiscountCard';
import useFetchProducts from '../../utils/useFetchProducts';

const Header = () => {
  const location = useLocation();
  const { cart } = useCart();
  const { likedCount } = useLiked();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const { data: products, loading, error } = useFetchProducts();

  const handleMenuClick = () => {
    setIsBurgerOpen(false);
  };

  return (
    <>
      <header className="custom-header">
        <div className="header-content">
          <div className="header-left">
            <img src="/logo.svg" alt="Logo" className="logo-image" />
            <ToggleSwitch />
          </div>

          <button 
            className={`burger-button ${isBurgerOpen ? 'open' : ''}`}
            onClick={() => setIsBurgerOpen(!isBurgerOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="center-box">
            <button
              className="promo-button"
              onClick={() => setIsModalOpen(true)}
            >
              1 day discount!
            </button>
            
            <nav className={`main-nav ${isBurgerOpen ? 'nav-open' : ''}`}>
              <ul>
                <li>
                  <Link 
                    to="/" 
                    className={location.pathname === "/" ? "active" : ""}
                    onClick={handleMenuClick}
                  >
                    Main Page
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/categories" 
                    className={location.pathname === "/categories" ? "active" : ""}
                    onClick={handleMenuClick}
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/all-products" 
                    className={location.pathname === "/all-products" ? "active" : ""}
                    onClick={handleMenuClick}
                  >
                    All products
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/sales" 
                    className={location.pathname === "/sales" ? "active" : ""}
                    onClick={handleMenuClick}
                  >
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

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {loading && <p>Loading product...</p>}
          {error && <p>Error loading product.</p>}
          {products && <ProductDayDiscountCard products={products} />}
        </Modal>
      )}
    </>
  );
};

export default Header;