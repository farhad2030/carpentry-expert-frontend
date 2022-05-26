import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../firebase.init";
const TopNavBar = () => {
  const [user, loading, error] = useAuthState(auth);
  console.log(user);
  const sigingOutHandeler = () => {
    signOut(auth);
  };
  return (
    <>
      <div class="navbar bg-base-100">
        <div class="navbar-start">
          <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabindex="0"
              class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/portfulio">Portfolio</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </div>
        </div>
        <div class="navbar-center">
          <Link to="/" class="btn btn-ghost normal-case text-xl">
            Carpentry-expert
          </Link>
        </div>
        <div class="navbar-end">
          {user ? (
            <>
              <p className="mr-3">{user.displayName}</p>
              <div className="dropdown dropdown-end">
                <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        user?.photoURL ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMUCcc2aoEwGnUZ_vhumNFtRW23YtnyoX5mQ&usqp=CAU"
                      }
                    />
                  </div>
                </label>
                <ul
                  tabIndex="0"
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="justify-between">Profile</a>
                  </li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <a onClick={sigingOutHandeler}>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <button class="btn mr-1">
                <Link to="/login">login</Link>
              </button>
              <button class="btn">
                <Link to="/register">Register</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TopNavBar;
