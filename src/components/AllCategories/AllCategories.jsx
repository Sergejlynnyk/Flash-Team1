


import React, { useEffect, useState } from "react";
import "./Categories.scss"; // Или свой файл стилей, если хочешь отдельно
import Section from "../Section/Section";
import CategoryCard from "../CategoryCard/CategoryCard";
import { getAllCategories, formatCategory } from "../../api/products";

export default function AllCategories() {
  const [categories, setCategories] = useState([]);

  function getRandomItems(arr, n) {
    if (n >= arr.length) return arr;
    const result = [];
    const usedIndices = new Set();
    while (result.length < n) {
      const idx = Math.floor(Math.random() * arr.length);
      if (!usedIndices.has(idx)) {
        result.push(arr[idx]);
        usedIndices.add(idx);
      }
    }
    return result;
  }

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getAllCategories();
        const formattedCategories = data.map(formatCategory);
        setCategories(getRandomItems(formattedCategories, 5)); // ← ТУТ 5 карточек!
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };
    loadCategories();
  }, []);

  return (
    <Section title="All Categories">
      {categories.map(category => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </Section>
  );
}
