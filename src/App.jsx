import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/_theme.scss";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import DiscountForm from "./components/DiscountForm/DiscountForm";
import SaleItems from "./components/SaleItems/SaleItems";
import Footer from "./components/Footer/Footer";
import ProductsPage from "./pages/ProductsPage";
import ToolsAndEquipment from "./components/ToolsAndEquipment/ToolsAndEquipment";
import AllProducts from "./components/AllProducts/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home/Home";
import Categories from "./pages/Categories/Categories";
import NotFound from "./pages/NotFound/NotFound";
import AllSales from "./pages/AllSales/AllSales";
import LikedProducts from "./pages/LikedProducts/LikedProducts";
import { LikedProvider } from "./components/Liked/LikedContext";
import { CartProvider } from "./components/Cart/CartContext";
import Cart from "./components/Cart/Cart";
import ProductByCategory from "./pages/ProductByCategory/ProductByCategory";

function App() {
  return (
    <CartProvider>
      <LikedProvider>
        <Router>
          <Header />
          <div className="main-container max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/categories/:id" element={<ProductByCategory />} />
              <Route path="/tools-and-equipment" element={<ToolsAndEquipment />} />
              <Route path="/all-products" element={<AllProducts />} />
              <Route path="/sales" element={<AllSales />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/liked" element={<LikedProducts />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </LikedProvider>
    </CartProvider>
  );
}

export default App;
