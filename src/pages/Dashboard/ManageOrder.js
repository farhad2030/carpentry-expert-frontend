import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../../sheared/Loading";

const ManageOrder = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const [editModal, seteditModal] = useState(null);

  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery("orders", () =>
    fetch(`http://localhost:5000/orders}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  console.log(orders);
  const shipedOrder = (order) => {};
  return (
    <>
      <div>My order {isLoading ? "loading ... " : orders?.length}</div>
      <div class="overflow-x-auto">
        <table class="table w-full text-center">
          <thead>
            <tr>
              <th>NO.</th>
              <th>Order id</th>
              <th>Description</th>
              <th>Order Quantity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
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

                    <th>
                      {parseInt(order?.orderQuantity) *
                        parseInt(order?.unitPrice)}
                    </th>
                    <th>{order?.status}</th>
                    <th>
                      {order?.status !== "unpaid" && (
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
