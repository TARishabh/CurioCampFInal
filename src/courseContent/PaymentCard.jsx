import React, { useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import axios from "axios";
import Course1 from "../assets/course1.png";
import { useParams } from "react-router-dom";


const PaymentCard = ({ price }) => {
  const Razorpay = useRazorpay();
  const [amount, setAmount] = useState(price);
  const url = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000/"
  const { id } = useParams();
  useEffect(() => {
    setAmount(price);
  }, [price]);
  // console.log(amount);
  // complete order
  const complete_order = (paymentID, orderID, signature) => {
    axios({
      method: "post",
      url: `${url}verifySignature/`,
      data: {
        payment_id: paymentID,
        order_id: orderID,
        signature: signature,
        amount: amount,
      },
    })
      .then((response) => {
        console.log(response.data);
        toast.success('Payment Completed Successfully',{ autoClose: 1300,draggablePercent: 20});

      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error('An error occurred. Please try again later.');
      });
  };

  const razorPay = () => {
    // Get the authentication token from localStorage or wherever it's stored
    const authToken = localStorage.getItem("token");
    // const authToken = import.meta.env.VITE_TOKEN

    // Create the axios instance with the authentication token
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Make the API request with the axios instance
    axiosInstance({
      method: "post",
      url: `${url}createOrder/`,
      data: {
        user: 9,
        course: id,
        total_amount: amount,
        amount_paid: amount,
        currency: "INR",
      },
    })
      .then((response) => {
        // console.log(amount);

        console.log(response.data.results.order_id);
        // get order id
        const order_id = response.data.results.order_id;
        console.log(order_id);

        // handle payment
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
          name: "CurioCamp",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
          handler: function (response) {
            //complete order
            complete_order(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );
          },
          prefill: {
            name: import.meta.env.VITE_NAME,
            email: import.meta.env.VITE_NUMBER,
            contact: import.meta.env.VITE_EMAIL,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });
        rzp1.open();
      })
      .catch((error) => {
        console.log(amount);
        console.log(error);
      });
  };
  return (
    // <div>
    //   <button type="button" className="btn btn-light fw-semibold py-3" onClick={razorPay}>Upgrad now</button>
    // </div>
    // <div className="sticky top-1">

     <div className="m-4 sticky top-3 right-3 ">
      <div className="grid w-full max-w-[900px] border-4 border-indigo-500 flex-cols-1 items-center justify-center rounded-xl bg-gradient-to-tr from-[#E7E9E8] to-[#f4f4f3] bg-clip-border p-8 text-black shadow-lg">
        <div className="relative m-0 mb-8 w-full overflow-hidden rounded-none border-b border-white/10 bg-transparent bg-clip-border pb-8 text-center  shadow-none">
          <p className="block font-sans text-sm font-normal uppercase leading-normal  antialiased">
            {/* standard */}
          </p>
          <h1 className="mt-6 flex justify-center gap-1 font-sans text-7xl font-normal tracking-normal  antialiased">
            <span className="mt-2 text-4xl">₹</span>499
            <span className="self-end text-4xl"></span>
          </h1>
        </div>
        <div className="p-0">
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  ></path>
                </svg>
              </span>
              <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
                Duration: <span>3 months</span>
              </p>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  ></path>
                </svg>
              </span>
              <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
                Language: <span>English</span>
              </p>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  ></path>
                </svg>
              </span>
              <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
                Timing: <span>Flexible</span>
              </p>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  ></path>
                </svg>
              </span>
              <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
                Trainers: <span>Industry Experts</span>
              </p>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  ></path>
                </svg>
              </span>
              <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
                Life time technical support
              </p>
            </li>
          </ul>
        </div>
        <div className="mt-12 p-0">
          <button
            className="block w-full select-none text-white rounded-lg bg-indigo-600 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-dark="true"
            onClick={razorPay}
          >
            Buy Now
          </button>
        </div>
      </div>
      <div className="w-full pt-5 px-4 mb-8 mx-auto ">
      </div>
    </div>
    // </div>
  );
};
export default PaymentCard;
