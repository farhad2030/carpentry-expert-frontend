import React from "react";
import BusinessSummary from "./BusinessSummary";
import ProductsSection from "./ProductsSection";
import ReviewSection from "./ReviewSection";

const Home = () => {
  return (
    <div className="text-center">
      <ProductsSection />
      <BusinessSummary />
      <ReviewSection />
    </div>
  );
};

export default Home;
