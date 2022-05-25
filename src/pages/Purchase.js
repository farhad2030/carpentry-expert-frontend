import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import Loading from "../sheared/Loading";

const Purchase = () => {
  const [loading, setloading] = useState(false);
  const [user, userLoading, error] = useAuthState(auth);

  const [productData, setproductData] = useState({});
  const location = useLocation();
  console.log(location?.state);

  const {
    data: product,
    isLoading,
    refetch,
  } = useQuery("product", () =>
    fetch(`http://localhost:5000/product/${location.state._id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setproductData(data);
      })
  );

  const data = location.state;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (formData) => {
    console.log("form data", formData);
    const order = {
      email: formData.email,
      productId: productData._id,
      orderQuantity: formData.orderQuantity,
      status: "unpaid",
    };

    fetch("http://localhost:5000/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((inserted) => {
        if (inserted.insertedId) {
          toast.success("Product added successfully");
          setloading(false);
          //  reset();
        } else {
          toast.error("Failed to add the product");
          setloading(false);
        }
      });
  };

  if (userLoading || loading || isLoading) return <Loading />;
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-6 m-5 border-solid border-2 border-sky-200 rounded  "
      >
        <img src={data.img} alt="" width={"100px"} />
        <input
          value={user?.email}
          {...register("email")}
          readOnly
          class="input input-bordered w-full my-2"
        />
        <input
          {...register("name")}
          value={data.name}
          readOnly
          class="input input-bordered w-full my-2"
        />
        <input
          {...register("description")}
          readOnly
          value={data?.description}
          class="input input-bordered w-full my-2"
        />
        <input
          {...register("quantity")}
          value={`Available quantity : ${data.quantity}`}
          readOnly
          class="input input-bordered w-full my-2"
        />

        <input
          {...register("minOrderQuantity")}
          value={`Minimum order quantity : ${data.minOrderQuantity}`}
          readOnly
          class="input input-bordered w-full my-2"
        />
        <input
          {...register("receiverName", {
            required: {
              value: true,
              message: "Receiver name  is Required",
            },
          })}
          type="text"
          placeholder="Type receiver name "
          class="input input-bordered w-full my-2"
        />

        <p className="text-red-400">
          {errors.receiverName?.type === "required" &&
            errors.receiverName.message}
        </p>
        <input
          {...register("address", {
            required: {
              value: true,
              message: "Address  is Required",
            },
          })}
          type="text"
          placeholder="Type delever address "
          class="input input-bordered w-full my-2"
        />
        <p className="text-red-400">
          {errors.address?.type === "required" && errors.address.message}
        </p>
        <input
          {...register("orderQuantity", {
            required: {
              value: true,
              message: "Order quantity  is Required",
            },
            max: {
              value: ` ${productData.quantity}`,
              message: "Not enough quantity",
            },
            min: {
              value: ` ${productData.minOrderQuantity}`,
              message: "Please order minimun quantity",
            },
          })}
          type="number"
          placeholder="Order quantity "
          class="input input-bordered w-full my-2"
        />

        <p className="text-red-400">
          {errors.orderQuantity && errors.orderQuantity.message}
        </p>

        {!loading ? (
          <input className="btn" type="submit" value=" Purchace Product" />
        ) : (
          <button class="btn  loading"></button>
        )}
      </form>
    </div>
  );
};

export default Purchase;
