import React, { useEffect, useState } from "react";
import Categories from "../../components/Categories/Categories";
import Hero from "../../components/Hero/Hero";
import DiscountForm from "../../components/DiscountForm/DiscountForm";
import SaleItems from "../../components/SaleItems/SaleItems";
import { getAllCategories, formatCategory } from "../../api/products";

function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getAllCategories();
        const formattedCategories = data.map(formatCategory).slice(0, 4); // 4 карточки
        setCategories(formattedCategories);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };
    loadCategories();
  }, []);

  return (
    <>
      <Hero />
      <Categories categories={categories} type="home" />
      <DiscountForm />
      <SaleItems />
    </>
  );
}

export default Home;
