// import React from 'react';
// import './Header.scss';
// import { Link, useLocation } from 'react-router-dom';
// import { useCart } from "../Cart/CartContext"; // Pfad ggf. anpassen

// const Header = () => {
//   const location = useLocation();
//   const { cart } = useCart();
//   const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <header className="custom-header">
//       <div className="header-left">
//         <img src="/logo.svg" alt="Logo" className="logo-image" />
//         <img src="/mode=light.svg" alt="Toggle Mode" className="mode-toggle-image" />
//       </div>

//       <div className="center-box">
//         <button>1 day discount!</button>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/" className={location.pathname === "/" ? "active" : ""}>
//                 Main Page
//               </Link>
//             </li>
//             <li>
//               <Link to="/categories" className={location.pathname === "/categories" ? "active" : ""}>
//                 Categories
//               </Link>
//             </li>
//             <li>
//               <Link to="/products" className={location.pathname === "/products" ? "active" : ""}>
//                 All products
//               </Link>
//             </li>
//             <li>
//               <Link to="/sales" className={location.pathname === "/sales" ? "active" : ""}>
//                 All sales
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       <div className="header-right">
//         <img src="/basket=heart empty.svg" alt="Heart" className="header-icon" />
//         <Link to="/cart" className="cart-link">
//           <img src="/basket=empty.svg" alt="Basket" className="header-icon" />
//           {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
//         </Link>
        
//       </div>
//     </header>
//   );
// };

// export default Header;

// import React from 'react';
// import './Header.scss';
// import { Link, useLocation } from 'react-router-dom';

// import { useCart } from "../Cart/CartContext";
// import ToggleSwitch from '../Toggle/ToggleSwitch'; 

// const Header = () => {
//   const location = useLocation();
//   const { cart } = useCart();
//   const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <header className="custom-header">
//       <div className="header-left">
//         <img src="/logo.svg" alt="Logo" className="logo-image" />
//        <ToggleSwitch />
//       </div>

//       <div className="center-box">
//         <button>1 day discount!</button>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/" className={location.pathname === "/" ? "active" : ""}>
//                 Main Page
//               </Link>
//             </li>
//             <li>
//               <Link to="/categories" className={location.pathname === "/categories" ? "active" : ""}>
//                 Categories
//               </Link>
//             </li>
//             <li>
//               <Link to="/products" className={location.pathname === "/products" ? "active" : ""}>
//                 All products
//               </Link>
//             </li>
//             <li>
//               <Link to="/sales" className={location.pathname === "/sales" ? "active" : ""}>
//                 All sales
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       <div className="header-right">
//         <img src="/basket=heart empty.svg" alt="Heart" className="header-icon" />
//         <Link to="/cart" className="cart-link">
//           <img src="/basket=empty.svg" alt="Basket" className="header-icon" />
//           {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
//         </Link>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React from 'react';
import Container_Two from '../container_two/Container_Two';
import './Header.scss';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';

export default function Header() {
  const location = useLocation();
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Container_Two>
    <header className="custom-header">
      
        <div className="header-inner">
          {/* ЛЕВАЯ ГРУППА */}
          <div className="header-left">
            <button className="burger-btn" aria-label="Menu">
              <span className="burger-icon" />
            </button>
            <img src="/logo.svg" alt="Logo" className="logo-image" />
            <label className="mode-switch">
              <input type="checkbox" />
              <span className="slider" />
            </label>
          </div>

          {/* ЦЕНТРАЛЬНАЯ ГРУППА */}
          <div className="header-center">
            <button className="discount-button">1 day discount!</button>
            <nav className="header-nav">
              <ul>
                <li className={location.pathname === '/' ? 'active' : ''}>
                  <Link to="/">Main Page</Link>
                </li>
                <li
                  className={
                    location.pathname.startsWith('/categories')
                      ? 'active'
                      : ''
                  }
                >
                  <Link to="/categories">Categories</Link>
                </li>
                <li
                  className={
                    location.pathname.startsWith('/products') ? 'active' : ''
                  }
                >
                  <Link to="/products">All products</Link>
                </li>
                <li
                  className={
                    location.pathname.startsWith('/sales') ? 'active' : ''
                  }
                >
                  <Link to="/sales">All sales</Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* ПРАВАЯ ГРУППА */}
          <div className="header-right">
            <button className="icon-btn" aria-label="Favorites">
              <img src="/basket=heart empty.svg" alt="" />
            </button>
            <Link to="/cart" className="icon-btn cart-link" aria-label="Cart">
              <img src="/basket=empty.svg" alt="" />
              {itemCount > 0 && (
                <span className="cart-count">{itemCount}</span>
              )}
            </Link>
          </div>
        </div>
    </header>
    </Container_Two>
  );
}