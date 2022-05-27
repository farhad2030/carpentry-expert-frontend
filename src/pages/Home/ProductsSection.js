import React from "react";
import { useQuery } from "react-query";
import Loading from "../../sheared/Loading";
import ProductCard from "./ProductCard";

const ProductsSection = () => {
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery("products", () =>
    fetch(` http://localhost:3000/products`).then((res) => res.json())
  );

  if (isLoading) return <Loading />;
  return (
    <div className="text-center m-5">
      <p>ProductsSection{products?.length}</p>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((product) => {
          return <ProductCard data={product} />;
        })}
      </div>
    </div>
  );
};

export default ProductsSection;
