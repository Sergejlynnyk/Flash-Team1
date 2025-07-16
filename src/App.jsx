import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Categories from './components/Categories/Categories';
import DiscountForm from './components/DiscountForm/DiscountForm';
import SaleItems from './components/SalesItems/SaleItems';
import Footer from './components/Footer/Footer';
import ProductsPage from './pages/ProductsPage';
import ToolsAndEquipment from './components/ToolsAndEquipment/ToolsAndEquipment';
import AllProducts from './components/AllProducts/AllProducts';
import ProductDetails from './pages/ProductDetails';
import NotFound from './pages/NotFound/NotFound'; 
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';

import { CartProvider } from "./components/Cart/CartContext";

import Cart from "./components/Cart/Cart";

import './index.css';

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <DiscountForm />
      <SaleItems />
    </>
  );
}

function CategoriesPage() {
  const breadcrumbItems = [
    { label: "Main page", href: "/" },
    { label: "Categories" }
  ];

  return (
    <div className="p-4">
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="text-2xl font-bold mb-4">All Categories</h1>
      <Categories />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="max-w-6xl mx-auto">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/tools-and-equipment" element={<ToolsAndEquipment />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />    {/* Your Cart page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

