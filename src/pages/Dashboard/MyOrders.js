import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../../sheared/Loading";

const MyOrders = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const [editModal, seteditModal] = useState(null);

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

  const navigateMakepayment = (orderId) => {
    navigate(`/makePayment/${orderId}`);
  };
  const cancelOrder = (order) => {
    const deleteConfirm = window.confirm(
      `Do you want to delete ${order?.name}`
    );
    if (deleteConfirm) {
      fetch(`http://localhost:5000/order/${order?._id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount) {
            toast.success(`Your order is deleted`);
            refetch();
          }
        });
    }
  };
  console.log(orders);

  const editOrder = () => {
    seteditModal("edit");
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
                      <button
                        onClick={() => {
                          navigateMakepayment(order?._id);
                        }}
                        class="btn btn-sm m-2 "
                      >
                        Make payment
                      </button>
                      {order?.status === "unpaid" && (
                        <>
                          <button
                            onClick={() => {
                              cancelOrder(order);
                            }}
                            class="btn btn-sm m-2 "
                          >
                            Cancel order
                          </button>
                          <label
                            for={`editOrder-${order._id}`}
                            onClick={() => {
                              editOrder(order);
                            }}
                            class="btn modal-button btn-sm m-2
                          "
                          >
                            Edit order
                          </label>
                        </>
                      )}
                    </th>
                    {editModal && (
                      <EditOrder
                        refetch={refetch}
                        seteditModal={seteditModal}
                        order={order}
                      ></EditOrder>
                    )}
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

const EditOrder = ({ refetch, seteditModal, order }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmitEdit = (data) => {
    console.log(data);

    fetch(`http://localhost:5000/order/${order?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("Failed to update your order");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          console.log(data);
          seteditModal(null);
          toast.success(`Successfully update your order`);
          refetch();
        }
      });
    console.log("in edded");
  };
  return (
    <>
      <input
        type="checkbox"
        id={`editOrder-${order._id}`}
        class="modal-toggle"
      />
      <div class="modal">
        <div class="modal-box relative">
          <label
            for={`editOrder-${order._id}`}
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold">
            You can change the order quantity {order?.description}
          </h3>
          <p class="py-4">
            <form onSubmit={handleSubmit(onSubmitEdit)}>
              <input
                defaultValue={order.orderQuantity}
                {...register("orderQuantity", {
                  required: {
                    value: true,
                    message: "Order quantity  is Required",
                  },
                  max: {
                    value: ` ${order.quantity}`,
                    message: "Not enough quantity",
                  },
                  min: {
                    value: ` ${order.minOrderQuantity}`,
                    message: "Please order minimun quantity",
                  },
                })}
                type="number"
                placeholder="Order quantity "
                class="input input-bordered w-full my-2"
              />

              <p className="text-red-400">
                {errors.orderQuantity && errors.orderQuantity.message}
              </p>
              <input className="btn" type="submit" value=" Update order" />
            </form>
          </p>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
