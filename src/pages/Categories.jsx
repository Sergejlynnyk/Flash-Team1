// // src/pages/Categories.jsx
// import React from "react";

// const Categories = () => {
//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>Categories</h1>
//       <p>Hier siehst du alle Produktkategorien.</p>
//       {/* Hier kommt deine bestehende Kategorien-Logik hin */}
//     </div>
//   );
// };

// export default Categories;
import React from 'react';
import CategoriesPage from '../components/Categories/CategoriesPage';
import Container from '../components/container/Container';

export default function CategoriesRoute() {
  return (
    <Container>
      <CategoriesPage />
    </Container>
  );
}