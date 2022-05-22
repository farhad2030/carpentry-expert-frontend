import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div class="hero min-h-screen bg-base-200 px-3">
      <div className="mx-3 text-center border-solid border-2 border-sky-200 rounded-lg w-full sm:w-[400px]">
        <p className="text-xl py-4">Login</p>
        <form onSubmit={handleSubmit(onSubmit)} className="px-5  ">
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Type Your Email"
            class="input input-bordered w-full my-2"
          />
          <p className="text-red-400">
            {errors.email?.type === "required" && "Email is required"}
          </p>
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Type Password"
            class="input input-bordered w-full  my-2"
          />
          <p className="text-red-400">
            {errors.password?.type === "required" && "Password is required"}
          </p>

          <input className="btn" type="submit" value="Login" />
        </form>
        <div class="divider">OR</div>
        <button class="btn gap-2 mb-4">
          <FcGoogle />
          Login width Google
        </button>
      </div>
    </div>
  );
};

export default Login;
