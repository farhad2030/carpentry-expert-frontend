import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
const CheckoutForm = ({ order }) => {
  // const order = setOrder;
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  // setclientsecret from intentent response
  const [clientSecret, setClientSecret] = useState("");

  const price = parseInt(order?.orderQuantity) * parseInt(order?.unitPrice);

  useEffect(() => {
    fetch(" http://localhost:3000/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.ClientSecret) {
          setClientSecret(data.ClientSecret);
        }
      });
  }, [order]);
  // edit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // not read data of from stripe or not find element
    if (!stripe || !elements) {
      return;
    }

    // get card information
    const card = elements.getElement(CardElement);

    // if card is null then return
    if (card === null) {
      return;
    }

    // get card value
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      // methode for payment to wish
      type: "card",
      card,
    });

    setCardError(error?.message || "");
    setSuccess("");
    setProcessing(true);

    // confirm card payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: order.receiveName,
            email: order.email,
          },
        },
      });

    if (intentError) {
      setCardError(intentError?.message);
      setProcessing(false);
    } else {
      setCardError("");
      setTransactionId(paymentIntent.id);
      console.log(paymentIntent);
      setSuccess(" Your payment is completed.");

      //store payment on database
      const payment = {
        orderId: order._id,
        transactionId: paymentIntent.id,
      };
      const url = ` http://localhost:3000/order`;
      console.log(url);
      fetch(url, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          setProcessing(false);
          console.log(data);
        });
    }
  };

  // console.log(stripe, clientSecret, success);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <button
          className="btn btn-success btn-sm mt-4"
          type="submit"
          disabled={!stripe || !clientSecret || success}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-500">{cardError}</p>}
      {success && (
        <div className="text-green-500">
          <p>{success} </p>
          <p>
            Your transaction Id:{" "}
            <span className="text-orange-500 font-bold">{transactionId}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
