import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const AddReview = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        if (resData.acknowledged === true) {
          toast.success("Thank you for ypur review");
          navigate("/");
        }
      });
  };

  return (
    <div class="hero min-h-screen bg-base-200 px-3">
      <div className="mx-3 p-4 text-center border-solid border-2 border-sky-200 rounded-lg w-full sm:w-[400px]">
        <p className="text-xl py-4">Add a review</p>

        <form onSubmit={handleSubmit(onSubmit)} className="px-5  ">
          <input
            {...register("email")}
            readOnly
            class="input input-bordered w-full my-2"
            value={user?.email}
          />

          <textarea
            {...register("review", {
              required: {
                value: true,
                message: "Review  is Required",
              },
            })}
            class="input input-bordered w-full my-2"
          />
          <p className="text-red-400">
            {errors.review?.type === "required" && "Review  is required"}
          </p>

          <input className="btn" type="submit" value="Add a review" />
        </form>
      </div>
    </div>
  );
};

export default AddReview;
