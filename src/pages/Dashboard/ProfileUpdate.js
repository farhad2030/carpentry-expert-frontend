import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const ProfileUpdate = ({ propUser }) => {
  const [user, loading] = useAuthState(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    //
    fetch(` http://localhost:3000/profileUpdate/${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },

      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("Failed to update ypur profile");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`Successfully update ypur profile`);
        }
      });
    //
    console.log(propUser);
  };
  return (
    <>
      <input type="checkbox" id="profileUpdateModal" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">Update your profile</h3>

          {/*  */}
          <form onSubmit={handleSubmit(onSubmit)} className="px-5  ">
            <input
              {...register("address")}
              type="text"
              placeholder="Type Your Address"
              class="input input-bordered w-full my-2"
            />
            <input
              {...register("education")}
              type="text"
              placeholder="Type Your last education"
              class="input input-bordered w-full my-2"
            />
            <input
              {...register("linkedIn")}
              type="text"
              placeholder="Type Your Linkedin"
              class="input input-bordered w-full my-2"
            />
            <input
              {...register("github")}
              type="text"
              placeholder="Type Your Github"
              class="input input-bordered w-full my-2"
            />
            <input
              {...register("facebook")}
              type="text"
              placeholder="Type Your Facebook"
              class="input input-bordered w-full my-2"
            />

            <input className="btn" type="submit" value="Update your profile" />
          </form>
          {/*  */}
          <div class="modal-action">
            <label for="profileUpdateModal" class="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
