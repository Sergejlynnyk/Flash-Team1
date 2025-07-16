import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Categories.scss";
import Section from "../Section/Section";
import CategoryCard from "../CategoryCard/CategoryCard";

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
    fetch("https://exam-server-5c4e.onrender.com/categories/all")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setRandomCategories(getRandomItems(data, 5));
      })
      .catch((err) => console.error("Fehler beim Laden der Kategorien:", err));
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
