import React from "react";
import BusinessSummary from "./BusinessSummary";
import ProductsSection from "./ProductsSection";

const Home = () => {
  return (
    <div className="text-center">
      <ProductsSection />
      <BusinessSummary />
    </div>
  );
};

export default Home;
