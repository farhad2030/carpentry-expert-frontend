import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const MyProfile = () => {
  const [user, setuser] = useState();
  const [currentUser, loading] = useAuthState(auth);
  useEffect(() => {
    fetch(`http://localhost:5000/user/${currentUser.email}`, {
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
              <img src="https://api.lorem.space/image/face?hash=92310" />
            </div>
          </div>
          <h2 class="card-title">{user?.name}</h2>
          <h2 class="card-title">{user?.email}</h2>

          <div class="card-actions justify-end">
            <button class="btn">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
