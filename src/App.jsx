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

// import Page404 from './components/Page404'; 

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
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Alle Kategorien</h1>
      <Categories />
    </div>
  );
}


function App() {
  return (
    <Router>
      <div className="max-w-6xl mx-auto">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/tools-and-equipment" element={<ToolsAndEquipment />} />
          <Route path="/all-products" element={<AllProducts />} />
          {/* <Route path="*" element={<Page404 />} /> <- Korrekt! */}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
