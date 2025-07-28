import React, { useEffect, useState } from "react";
import Categories from "../../components/Categories/Categories";
import { getAllCategories, formatCategory } from "../../api/products";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getAllCategories();
        const formattedCategories = data.map(formatCategory);
        setCategories(formattedCategories);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };
    loadCategories();
  }, []);

  return (
    <section>
      <Categories categories={categories} type="categories" />
    </section>
  );
}
