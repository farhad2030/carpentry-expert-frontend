import React from "react";
import { useQuery } from "react-query";
import Loading from "../../sheared/Loading";

const ManageProducts = () => {
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery("products", () =>
    fetch(`http://localhost:5000/products`).then((res) => res.json())
  );
  return (
    <>
      <div>Manage products {isLoading ? "loading ... " : products?.length}</div>

      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>NO.</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Shiped</th>
            </tr>
          </thead>
          {!isLoading ? (
            <tbody>
              {products.map((product, index) => {
                return (
                  <tr class="hover" key={product._id}>
                    <th>{index}</th>
                    <th>{product?.name}</th>
                    <th>{product?.description}</th>
                    <th>{product?.quantity}</th>
                    <th>{product?.status}</th>
                    <th>
                      {" "}
                      <button class="btn btn-sm">Shiped</button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <Loading />
          )}
        </table>
      </div>
    </>
  );
};

export default ManageProducts;
