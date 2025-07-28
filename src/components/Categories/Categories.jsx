import React, { useEffect, useState } from "react";
import "./Categories.scss";
import Section from "../Section/Section";
import CategoryCard from "../CategoryCard/CategoryCard";
import { getAllCategories, formatCategory } from "../../api/products";


export default function Categories({ count = 4, title = "Categories", categories: externalCategories }) {
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
    
    if (externalCategories && externalCategories.length > 0) {
      setCategories(externalCategories);
      return;
    }
    
    const loadCategories = async () => {
      try {
        const data = await getAllCategories();
        const formattedCategories = data.map(formatCategory);
        setCategories(getRandomItems(formattedCategories, count));
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };
    loadCategories();
    
  }, [count, externalCategories]);

  return (
    <Section title={title}>
      {categories.map(category => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </Section>
  );
}