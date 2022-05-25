import React, { useEffect } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import useToken from "../hooks/useToken";
const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, emailUser, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [token] = useToken(emailUser || gUser);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const { email, password } = data;
    signInWithEmailAndPassword(email, password);
  };
  const googleHandeler = () => {
    signInWithGoogle();
  };

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  return (
    <div class="hero min-h-screen bg-base-200 px-3">
      <div className="mx-3 text-center border-solid border-2 border-sky-200 rounded-lg w-full sm:w-[400px]">
        <p className="text-xl py-4">Login</p>
        <p className="text-red-400">{gError ? gError.message : ""}</p>
        <form onSubmit={handleSubmit(onSubmit)} className="px-5  ">
          <input
            {...register("email", {
              required: {
                value: true,
                message: "Email is Required",
              },
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: "Give a valid Email",
              },
            })}
            type="email"
            placeholder="Type Your Email"
            class="input input-bordered w-full my-2"
          />
          <p className="text-red-400">
            {errors.email?.type === "required" && "Email is required"}
          </p>
          <input
            {...register("password", {
              required: {
                value: true,
                message: "Password is Required",
              },
            })}
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
        <button class="btn gap-2 mb-4" onClick={googleHandeler}>
          {gLoading ? <button class="btn loading"></button> : <FcGoogle />}
          Login width Google
        </button>
      </div>
    </div>
  );
};

export default Login;
