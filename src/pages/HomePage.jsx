// import Header from "../components/Header";
// import Banner from "../components/Banner";
// import Categories from "../components/Categories";
// import Footer from "../components/Footer";

// function HomePage() {
//   return (
//     <>
//       <Header />
//       <Banner />
//       <Categories />
//       <Footer />
//     </>
//   );
// }
// export default HomePage;
import React from 'react';
import Hero from '../components/Hero/Hero';
import Categories from '../components/Categories/Categories';
import AllProducts from '../components/AllProducts/AllProducts';
import AllSales from '../components/AllSales/AllSales';
import Container from '../components/container/Container';

export default function HomePage() {
  return (
    <>
      {/* Hero остаётся на всю ширину экрана */}
      <Hero />

      {/* Всё, что ниже Hero, в одном Container */}
      <Container>
        {/* Заголовок + карточки категорий */}
        <Categories />
        {/* Секция «Все продукты» */}
        <AllProducts />
        {/* Секция «Все распродажи» */}
        <AllSales />
      </Container>
    </>
  );
}