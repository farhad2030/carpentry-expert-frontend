import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../../sheared/Loading";
import Login from "../Login";

const ManageOrder = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery("orders", () =>
    fetch(` http://localhost:3000/orders`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  console.log(orders);
  if (isLoading) return <Loading />;
  const shipedOrder = (orderdetails) => {
    const url = ` http://localhost:3000/admin/order`;
    const order = { orderId: orderdetails._id, status: "shiped" };
    console.log(url);
    fetch(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
      });
  };
  return (
    <>
      <div>My order {isLoading ? "loading ... " : orders?.length}</div>
      <div class="overflow-x-auto">
        <table class="table w-full text-center">
          <thead>
            <tr>
              <th>NO.</th>
              <th>Order id</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {!isLoading ? (
            <tbody>
              {orders?.map((order, index) => {
                return (
                  <tr class="hover" key={order?._id}>
                    <th>{index}</th>
                    <th>{order?._id}</th>

                    <th>{order?.status}</th>
                    <th>
                      {order?.status !== "unpaid" &&
                        order?.status !== "shiped" && (
                          <>
                            <button
                              onClick={() => {
                                shipedOrder(order);
                              }}
                              class="btn btn-sm m-2 "
                            >
                              shiped
                            </button>
                          </>
                        )}
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

export default ManageOrder;
