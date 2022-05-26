import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import ProfileUpdate from "./ProfileUpdate";

const MyProfile = () => {
  const [user, setuser] = useState();
  const [currentUser, loading] = useAuthState(auth);
  useEffect(() => {
    fetch(`http://localhost:5000/user/${currentUser?.email}`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setuser(data));
  }, []);
  return (
    <div className="container mx-auto">
      <div class="card bg-primary text-primary-content">
        <div class="card-body">
          <div class="avatar">
            <div class="w-24 rounded-full">
              <img
                src={
                  user?.photoURL ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMUCcc2aoEwGnUZ_vhumNFtRW23YtnyoX5mQ&usqp=CAU"
                }
              />
            </div>
          </div>
          <h2 class="card-title">{user?.displayName}</h2>
          <h2 class="card-title">Email : {user?.email}</h2>

          {user?.facebook && (
            <h2 class="card-title">Facebook : {user?.facebook}</h2>
          )}
          {user?.github && <h2 class="card-title">Github : {user?.github}</h2>}
          <div class="card-actions justify-end">
            <label for="profileUpdateModal" class="btn modal-button">
              Update prfile
            </label>
            <ProfileUpdate propUser={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
