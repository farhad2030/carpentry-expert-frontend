import React from "react";
import BusinessSummary from "./BusinessSummary";
import ProductsSection from "./ProductsSection";
import ReviewSection from "./ReviewSection";

const Home = () => {
  return (
    <div className="text-center">
      <HeroSection />
      <ProductsSection />
      <BusinessSummary />
      <ReviewSection />
    </div>
  );
};

const HeroSection = () => {
  return (
    <div class="hero min-h-screen">
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">Welcom to Carpentry Experts</h1>
          <p class="mb-5">
            Our Manutacature Company is one of the most Reriable companey in USA
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
