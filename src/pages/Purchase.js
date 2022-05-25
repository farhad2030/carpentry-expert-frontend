import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import auth from "../firebase.init";
import Loading from "../sheared/Loading";

const Purchase = () => {
  const [loading, setloading] = useState(false);
  const [user, userLoading, error] = useAuthState(auth);
  const location = useLocation();
  console.log(location?.state);
  const data = location.state;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  if (userLoading || loading) return <Loading />;
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
          disabled
          class="input input-bordered w-full my-2"
        />
        <input
          {...register("name")}
          value={data.name}
          disabled
          class="input input-bordered w-full my-2"
        />
        <input
          {...register("description")}
          disabled
          value={data?.description}
          class="input input-bordered w-full my-2"
        />
        <input
          {...register("quantity")}
          value={`Available quantity : ${data.quantity}`}
          disabled
          class="input input-bordered w-full my-2"
        />

        <input
          {...register("minOrderQuantity")}
          value={`Minimum order quantity : ${data.minOrderQuantity}`}
          disabled
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
              value: ` ${data.quantity}`,
              message: "Not enough quantity",
            },
            min: {
              value: ` ${data.minOrderQuantity}`,
              message: "Please or minimun quantity",
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
