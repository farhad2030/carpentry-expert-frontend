import React from "react";
import { useQuery } from "react-query";
import Loading from "../../sheared/Loading";
const AllUsers = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch("http://localhost:5000/users", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  console.log(users);
  return (
    <>
      <div>All Users {isLoading ? "loading ... " : users?.length}</div>

      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>NO.</th>
              <th>Email</th>
              <th>Role</th>
              <th>Make adnim</th>
            </tr>
          </thead>
          {!isLoading ? (
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr class="hover" key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user?.email}</td>
                    <td>{user?.role}</td>
                    <td>
                      {user?.role === "admin" ? (
                        "Already addmin"
                      ) : (
                        <button class="btn btn-sm ">Make admin</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <Loading />
          )}
        </table>
      </div>
    </>
  );
};

export default AllUsers;
