import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripeElements,
} from "@stripe/react-stripe-js";

const DonationProcessingPage = () => {
  const [stripe, setStripe] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Fetch the client secret from the backend
    const fetchClientSecret = async () => {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 5000 }), // Replace with the donation amount
      });
      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
    };
    fetchClientSecret();

    // Initialize the Stripe library
    loadStripe("your_stripe_public_key").then(setStripe);
  }, []);

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-4'>Donation Processing</h1>
      {stripe && clientSecret && (
        <Elements stripe={stripe} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

const CheckoutForm = () => {
  const stripe = useStripeElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: stripe.getElement(CardElement),
    });

    if (error) {
      console.error(error);
    } else {
      // Send the payment method to the backend for processing
      await fetch("/api/process-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payment_method_id: paymentMethod.id }),
      });

      // Display a success message or redirect the user
      alert("Thank you for your donation!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
    >
      <div className='mb-4'>
        <label
          className='block text-gray-700 font-bold mb-2'
          htmlFor='card-element'
        >
          Credit or debit card
        </label>
        <CardElement
          id='card-element'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div className='flex items-center justify-between'>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Donate
        </button>
      </div>
    </form>
  );
};

export default DonationProcessingPage;
