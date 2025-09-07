import React, { useState } from "react";

// Extend window interface for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

const Razorpayreact: React.FC = () => {
  const [paymentId, setPaymentId] = useState<string>("");

  // Function to dynamically load Razorpay script
  const loadScript = (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // Function to display Razorpay checkout
  const displayRazorpay = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const razorpayOptions = {
      key: "rzp_test_REYYglhoimD7jQ", // Your Razorpay key_id
      amount: 5000, // Amount in paise (₹50 = 5000 paise)
      currency: "INR",
      name: "infysky",
      description: "Payment for the service",
      image: "/your_logo.png", // Replace with your logo image path
      handler: (response: { razorpay_payment_id: string }) => {
        alert(response.razorpay_payment_id);
        setPaymentId(response.razorpay_payment_id);
      },
      prefill: {
        name: "sunita",
        email: "sunitaspatil123@gmail.com",
        contact: "2536523652",
      },
      theme: {
        color: "#F37254",
      },
    };

    const paymentObject = new window.Razorpay(razorpayOptions);
    paymentObject.open();
  };

  return (
    <div>
      <button onClick={displayRazorpay}>Pay Now</button>
      {paymentId && <p>Payment ID: {paymentId}</p>}
    </div>
  );
};

export default Razorpayreact;
