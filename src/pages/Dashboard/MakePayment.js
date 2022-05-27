import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

import {
  Elements,
  ElementsConsumer,
  CardElement,
} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51L3AJAGXbjY6zTvybe4N0w4UIom3l1zfu2eNQeZDR8rYVjsUsIL8mEPV9bnOKGUMkMr5vmRWd4D5xuqFzd0OwT2n00fiGABv2K"
);
const MakePayment = () => {
  const params = useParams();
  const location = useLocation();
  console.log(params.orderId);
  console.log(location);
  const { stateOrder } = location.state;

  // }
  return (
    <div>
      <div class="card w-50 max-w-md bg-base-100 shadow-xl my-12 mx-auto">
        <div class="card-body">
          <p className="text-info font-bold">
            Hello, {stateOrder?.receiverName}
          </p>
          <h2 class="card-title">
            Please Pay for{" "}
            {parseInt(stateOrder?.orderQuantity) *
              parseInt(stateOrder?.unitPrice)}
          </h2>

          <p>Please pay to confirm your order</p>
        </div>
        <div class="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
          <div class="card-body">
            <Elements stripe={stripePromise}>
              <CheckoutForm order={stateOrder} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
