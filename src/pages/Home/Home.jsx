import Categories from "../../components/Categories/Categories";
import Hero from "../../components/Hero/Hero";
import DiscountForm from "../../components/DiscountForm/DiscountForm";
import SaleItems from "../../components/SalesItems/SaleItems";

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

export default Home;
