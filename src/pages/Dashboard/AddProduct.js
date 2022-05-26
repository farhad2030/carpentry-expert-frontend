import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [loading, setloading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    setloading(true);
    console.log("FORM DATA ", data);
    const imageStorageKey = "9228b1417e65813168760af63da49d10";
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const img = result.data.url;
        const product = { ...data, img: img };
        if (result.success) {
          fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((inserted) => {
              if (inserted.insertedId) {
                toast.success("Product added successfully");
                setloading(false);
                reset();
              } else {
                toast.error("Failed to add the product");
                setloading(false);
              }
            });
        } else {
          toast.error("Failed to add the product for server error");
        }
      });

    //
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 m-5 border-solid border-2 border-sky-200 rounded  "
      >
        <p className="text-center text-lg ">Add a Product</p>
        <input
          {...register("name", {
            required: {
              value: true,
              message: "Name  is Required",
            },
          })}
          type="text"
          placeholder="Type Product Name"
          class="input input-bordered w-full my-2"
        />
        <p className="text-red-400">
          {errors.name?.type === "required" && errors.name.message}
        </p>
        <input
          {...register("description")}
          type="text"
          placeholder="Type Product description"
          class="input input-bordered w-full my-2"
        />
        {/*  */}
        <input
          {...register("quantity", {
            required: {
              value: true,
              message: "Available quantity is  Required",
            },
          })}
          type="number"
          placeholder="Available quantity"
          class="input input-bordered w-full my-2"
        />
        <p className="text-red-400">
          {errors.quantity?.type === "required" && errors.quantity.message}
        </p>
        <input
          {...register("minOrderQuantity", {
            required: {
              value: true,
              message: "Minimum order quantity is  Required",
            },
          })}
          type="number"
          placeholder="Minimun quantity"
          class="input input-bordered w-full my-2"
        />
        <p className="text-red-400">
          {errors.minOrderQuantity?.type === "required" &&
            errors.minOrderQuantity.message}
        </p>
        <input
          {...register("unitPrice", {
            required: {
              value: true,
              message: "Unit price is  Required",
            },
          })}
          type="number"
          placeholder="Unit price"
          class="input input-bordered w-full my-2"
        />
        <p className="text-red-400">
          {errors.unitPrice?.type === "required" && errors.unitPrice.message}
        </p>
        <input
          {...register("image")}
          type="file"
          placeholder="Upload a image"
          class="input input-bordered w-full my-2"
        />
        <p className="text-red-400">
          {errors.image?.type === "required" && errors.image.message}
        </p>

        {!loading ? (
          <input className="btn" type="submit" value="Add Product" />
        ) : (
          <button class="btn  loading"></button>
        )}
      </form>
    </>
  );
};

export default AddProduct;
