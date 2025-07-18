import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Categories.scss";
import Section from "../Section/Section";
import CategoryCard from "../CategoryCard/CategoryCard";
import { getAllCategories, formatCategory } from "../../api/products";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [randomCategories, setRandomCategories] = useState([]);

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
      console.log('Categories raw data:', data);
      const formattedCategories = data.map(formatCategory);
      console.log('Categories formatted:', formattedCategories);
      setCategories(formattedCategories);
      setRandomCategories(getRandomItems(formattedCategories, 5));
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  loadCategories();
}, []);

  return (
    <Section title="Categories">
      {randomCategories &&
        randomCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
    </Section>
  );
}