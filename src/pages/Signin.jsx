import { useState } from "react";
import { toast } from "react-toastify";
import TextField from "../component/TextField";
import Navbar from "../component/Navbar";
import { Formik, Form } from "formik";
import Img from "../assets/login_vector.png";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
  const url = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Required"),
    pwd: Yup.string().required("Required"),
  });

  return (
    <>
      <Navbar isSignin />
      <div className="flex justify-around">
        <div className="w-full lg:w-1/2 mt-20 flex justify-center items-center text-black">
          <Formik
            initialValues={{
              email: "",
              pwd: "",
            }}
            validationSchema={validate}
            onSubmit={async (values, formik) => {
              setLoading(true); // Set loading state to true on form submission
              const formData = { email: values.email, password: values.pwd };
              try {
                const response = await fetch(`${url}user/login/`, {
                  method: "POST",
                  body: JSON.stringify(formData),
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                });
                const responseData = await response.json();
                if (response.ok) {
                  localStorage.setItem("token", responseData.token.access);
                  localStorage.setItem("user_id", responseData.results.id);
                  localStorage.setItem("is_actual_superuser", responseData.results.is_actual_superuser);
                  // toast.success(responseData.message);
                  // toast.success('Logged In Successfully',{ autoClose: 1300, style: {fontSize:'18px'},draggablePercent: 20});
                  toast.success('Logged In Successfully',{ autoClose: 1300,draggablePercent: 20});
                  console.log(responseData.message);
                  navigate("/courses");
                } else {
                  toast.error(responseData.message);
                }
              } catch (error) {
                console.error('Error logging in:', error);
                toast.error('An error occurred while logging in. Please try again later.');
              }
              setLoading(false); // Set loading state to false after request completes
            }}
          >
            {(formik) => (
              <Form className="flex flex-col p-5 max-w-[400px] w-full">
                <div className="pb-8 flex justify-center">
                  <p className="text-4xl text-indigo-600 font-bold inline">Log In</p>
                </div>

                <TextField name="email" type="email" placeholder="Email" />
                <TextField name="pwd" type="password" placeholder="Password" />
                <button
                  type="submit"
                  className="text-[#E0E0E0] rounded-full px-5 py-2 my-8 mx-auto flex items-center bg-[#4F46E5] shadow-lg shadow-[#040c166b] font-bold text-lg dark:shadow-lg dark:shadow-[#959494] hover:bg-[#382bf0] hover:-translate-y-1 duration-300 relative" // Add relative positioning
                >
                  Log In
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="hidden lg:flex">
          <img
            className="mr-40 w-[700px] mt-10"
            src={Img}
            alt="Log in Image"
          />
        </div>
      </div>
    </>
  );
};

export default Signin;
