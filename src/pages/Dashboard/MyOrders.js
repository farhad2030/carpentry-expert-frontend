import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../../sheared/Loading";

const MyOrders = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

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
                      <button
                        onClick={() => {
                          navigateMakepayment(order?._id);
                        }}
                        class="btn btn-sm 
                      
                      
                      "
                      >
                        Make payment
                      </button>
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
