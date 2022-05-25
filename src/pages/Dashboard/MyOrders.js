import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../../firebase.init";
import Loading from "../../sheared/Loading";

const MyOrders = () => {
  const [user, loading] = useAuthState(auth);
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery("orders", () =>
    fetch(
      `http://localhost:5000/orders/${user?.email}`,

      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res) => res.json())
  );
  return (
    <>
      <div>My order {isLoading ? "loading ... " : orders?.length}</div>

      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>NO.</th>
              <th>Order id</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Payment</th>
            </tr>
          </thead>
          {!isLoading ? (
            <tbody>
              {orders.map((order, index) => {
                return (
                  <tr class="hover" key={order._id}>
                    <th>{index}</th>
                    <th>{order?._id}</th>
                    <th>{order?.description}</th>
                    <th>{order?.orderQuantity}</th>
                    <th>{order?.status}</th>
                    <th>
                      {" "}
                      <button class="btn btn-sm">Make payment</button>
                    </th>
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

export default MyOrders;
