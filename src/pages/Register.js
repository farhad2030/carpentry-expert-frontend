import React from "react";
import { useForm } from "react-hook-form";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import auth from "../firebase.init";
import { useLocation, useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
const Register = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, emailUser, emailLoading, emailError] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, UpdateError] = useUpdateProfile(auth);
  //   react-router-dom
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    const { email, password } = data;
    await createUserWithEmailAndPassword(email, password);
    if (!emailError) {
      await updateProfile({ displayName: data.name });
      console.log("displayname", data);
      navigate(from, { replace: true });
    }
  };
  const googleHandeler = () => {
    signInWithGoogle();
  };

  if (gUser) {
    navigate(from, { replace: true });
  }
  return (
    <div class="hero min-h-screen bg-base-200 px-3">
      <div className="mx-3 text-center border-solid border-2 border-sky-200 rounded-lg w-full sm:w-[400px]">
        <p className="text-xl py-4">Register</p>

        <p className="text-red-400">
          {gError || emailError ? gError?.message || emailError?.message : ""}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="px-5  ">
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Type Your Name"
            class="input input-bordered w-full my-2 "
          />
          <p className="text-red-400">
            {errors.name?.type === "required" && "Name  is required"}
          </p>
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

          <input className="btn" type="submit" value="Register" />
        </form>
        <div class="divider">OR</div>
        <button class="btn gap-2 mb-4 " onClick={googleHandeler}>
          {gLoading ? (
            <button class="btn btn-square loading"></button>
          ) : (
            <FcGoogle />
          )}
          Login width Google
        </button>
      </div>
    </div>
  );
};

export default Register;
