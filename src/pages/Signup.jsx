import React, { useState } from "react";
import { toast } from "react-toastify";
import TextField from "../component/TextField";
import RadioField from "../component/RadioField";
import { Formik, Form } from "formik";
import Img from "../assets/signup_vector.png";
import Navbar from "../component/Navbar";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const url = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  // const [isOtp, setIsOtp] = useState(false);

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    pwd: Yup.string().required("Required"),
    confirmPassword: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
    otp:Yup.string().required("Required"),
  });

  // const response = await fetch(`${url}user/register/`)
  return (
    <>
      <Navbar isSignup />
      <div className="flex justify-around">
        <div className="text-black flex items-center justify-center pt-[70px]">
          <Formik
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              confirmPassword: "",
              pwd: "",
              gender: "",
              phoneNumber: "",
              otp:""
            }}
            validationSchema={validate}
            onSubmit={async (values, { setSubmitting }) => {
              const formData = {
                email: values.email,
                first_name: values.firstName,
                last_name: values.lastName,
                password2: values.confirmPassword,
                password: values.pwd,
                gender: values.gender,
                phone_number: values.phoneNumber,
                otp:values.otp
              };

              try {
                const response = await fetch(`${url}user/register/`, {
                  method: "POST",
                  body: JSON.stringify(formData),
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                });

                const responseData = await response.json();
                if (response.ok) {
                  localStorage.setItem('token', responseData.token.access);
                  localStorage.setItem("is_actual_superuser", responseData.results.is_actual_superuser);
                  localStorage.setItem("user_id", responseData.results.id);
                  // toast.success(responseData.message);
                  toast.success('Logged In Successfully',{ autoClose: 1300,draggablePercent: 20});
                  console.log(responseData.message)
                  navigate('/courses');
                } else {
                  Object.values(responseData.errors).forEach(error => {
                    error.forEach(err => toast.error(err));
                  });
                }
              } catch (error) {
                console.error('Error registering user:', error);
                toast.error('An error occurred while registering. Please try again later.');
              }

              setSubmitting(false);
            }}
          >
            {(formik) => (
              <Form className="mx-3 flex flex-col max-w-[500px]">
                <div className="pb-8 flex justify-center">
                  <p className="text-4xl text-indigo-600 font-bold inline">Sign Up</p>
                </div>
                <div className=" border-indigo-600">
                  <div className="grid grid-cols-2 gap-3">
                    <TextField
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                    />
                    <TextField
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                  <TextField name="email" type="email" placeholder="Email" />
                  <TextField
                    name="pwd"
                    type="password"
                    placeholder="Password"
                  />
                  <TextField
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                  />
                  {/* <TextField
                    name="dateOfBirth"
                    type="date"
                    placeholder="Date Of Birth"
                  /> */}
                  <div
                    className={`my-2 w-full p-2 rounded-full text-black input-field flex justify-around shadow-lg shadow-[#040c166b] border-1`}
                  >
                    <RadioField
                      type="radio"
                      name="gender"
                      value="Male"
                      id="male"
                    />
                    <RadioField
                      type="radio"
                      name="gender"
                      value="Female"
                      id="female"
                    />
                    <RadioField
                      type="radio"
                      name="gender"
                      value="Others"
                      id="others"
                    />
                  </div>
                </div>
                <TextField
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                />
                <TextField
                  name="otp"
                  type="text"
                  placeholder="ENTER YOUR OTP"
                />
                 {/* <button
                  type="button"
                  className="text-[#E0E0E0] rounded-full px-5 py-2 my-8 mx-auto flex items-center bg-[#4F46E5] shadow-lg shadow-[#040c166b] font-bold text-lg dark:shadow-lg dark:shadow-[#000000] hover:bg-[#382bf0] hover:-translate-y-1 duration-300"
                  onClick={() => {
                    // Call the API to generate OTP here
                    fetch(`${url}getotp/`, {
                      method: "POST",
                      body: JSON.stringify({ phoneNumber: formik.values.phoneNumber }),
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    })
                      .then(response => response.json())
                      .then(data => {
                        if (data.success) {
                          toast.success('OTP sent successfully!');
                          toggleOtp(); // Show OTP field after successful OTP generation
                        } else {
                          toast.error('Failed to generate OTP. Please try again.');
                        }
                      })
                      .catch(error => {
                        console.error('Error generating OTP:', error);
                        toast.error('An error occurred. Please try again later.');
                      });
                  }}
                >
                  SEND OTP
                </button> */}
                <button
                // disabled={!isOtp}
                  type="submit"
                  className="text-[#E0E0E0] rounded-full px-5 py-2 my-8 mx-auto flex items-center bg-[#4F46E5] shadow-lg shadow-[#040c166b] font-bold text-lg dark:shadow-lg dark:shadow-[#000000] hover:bg-[#382bf0] hover:-translate-y-1 duration-300"
                >
                  Register
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="hidden lg:flex">
          <img
            className="w-[800px] h-[700px] mt-10"
            src={Img}
            alt="Log in Image"
          />
        </div>
      </div>
    </>
  );
};

export default Signup;
