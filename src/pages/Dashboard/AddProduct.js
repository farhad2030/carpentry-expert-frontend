import React from "react";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6  border-solid border-2 border-sky-200 rounded  "
      >
        <p className="text-center">Add a Product</p>
        <input
          {...register("name", {
            required: {
              value: true,
              message: "Name  is Required",
            },
          })}
          type="email"
          placeholder="Type Product Name"
          class="input input-bordered w-full my-2"
        />
        <p className="text-red-400">
          {errors.name?.type === "required" && "Name is required"}
        </p>
        <input
          {...register("description")}
          type="text"
          placeholder="Type Product Name"
          class="input input-bordered w-full my-2"
        />
        <input
          {...register("quantity", {
            required: {
              value: true,
              message: "Name  is Required",
            },
          })}
          type="number"
          placeholder="Type Product Name"
          class="input input-bordered w-full my-2"
        />
        <p className="text-red-400">
          {errors.quantity?.type === "required" && "Name is required"}
        </p>

        <input className="btn" type="submit" value="Add Product" />
      </form>
    </>
  );
};

export default AddProduct;
