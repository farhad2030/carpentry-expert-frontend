import React from "react";
import { useQuery } from "react-query";
import Loading from "../../sheared/Loading";
const AllUsers = () => {
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery("products", () =>
    fetch("http://localhost:5000/users", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
  );
  return (
    <>
      <div>AllUsers {isLoading ? "loading ... " : products?.length}</div>

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
                  <tr class="hover">
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

export default AllUsers;
