import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../../sheared/Loading";

const AllUsers = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch(" http://localhost:3000/users", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  console.log(users);

  const makeAdminHandeler = (email, role) => {
    fetch(` http://localhost:3000/user/admin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("Failed to Make an admin");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success(`Successfully made an admin`);
        }
      });
  };

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
              {users?.map((user, index) => {
                return (
                  <tr class="hover" key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user?.email}</td>
                    <td>{user?.role}</td>
                    <td>
                      {user?.role === "admin" ? (
                        "Already addmin"
                      ) : (
                        <button
                          class="btn btn-sm "
                          onClick={() => {
                            makeAdminHandeler(user?.email, user?.role);
                          }}
                        >
                          Make admin
                        </button>
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
