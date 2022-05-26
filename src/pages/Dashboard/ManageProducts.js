import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../../sheared/Loading";

const ManageProducts = () => {
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery("products", () =>
    fetch(`http://localhost:5000/products`).then((res) => res.json())
  );

  const handelProductDelete = (id) => {
    console.log(id);
    const deleteConfirm = window.confirm(`Do you want to delete`);
    if (deleteConfirm) {
      fetch(`http://localhost:5000/product/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount) {
            toast.success(`Your order is deleted`);
            refetch();
          }
        });
    }
  };
  console.log(products);
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

              <th>action</th>
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
                    <th>
                      <button
                        class="btn btn-sm "
                        onClick={() => {
                          handelProductDelete(product._id);
                        }}
                      >
                        Delete product{" "}
                      </button>
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
