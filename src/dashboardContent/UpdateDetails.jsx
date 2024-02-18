import React, {useState, useEffect} from "react";
import TextField from "../component/TextField";
import RadioField from "../component/RadioField";
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from "formik";
import * as Yup from "yup";


const UpdateDetails = () => {
  const url = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000/"
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const user_id = localStorage.getItem("user_id")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${url}user/register/${user_id}/`);
        const data = await response.json();
        setUserData(data.results);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error
      }
    };

    fetchUserData();
  }, [url]);

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    pwd: Yup.string().required("Required"),
    confirmPassword: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
  });
  return (
    <div className="text-black flex items-center justify-center pt-[70px]">
      {userData && (
        <Formik
          initialValues={{
            email: userData.email || "",
            firstName: userData.first_name || "",
            lastName: userData.last_name || "",
            confirmPassword: "",
            pwd: "",
            gender: userData.gender || "",
            phoneNumber: userData.phone_number || "",
          }}
          validationSchema={validate}
          onSubmit={async (values, formik) => {
            const formData = {
              email: values.email,
              first_name: values.firstName,
              last_name: values.lastName,
              password2: values.confirmPassword,
              // date_of_birth: "2023-01-01",
              password: values.pwd,
              gender: values.gender,
              phone_number: values.phoneNumber,
            };
            // console.log(formData);
            const response = await fetch(
              `${url}user/register/${userData.id}/`,
              {
                method: "PUT",
                body: JSON.stringify(formData),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            );
            const responseData = await response.json();
          }}
        >
          {(formik) => (
            <Form className="mx-3 flex flex-col max-w-[500px]">
              <div className="pb-8 flex justify-center">
                <p className="text-4xl font-bold inline text-indigo-600">Update Details</p>
              </div>
              <div className="">
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
                <TextField name="pwd" type="password" placeholder="Password" />
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
              <button
                type="submit"
                className="text-white rounded-full px-5 py-2 my-8 mx-auto flex items-center bg-indigo-600 shadow-lg shadow-[#040c166b] font-bold text-lg dark:shadow-lg dark:shadow-[#000000] hover:bg-[#382bf0] hover:-translate-y-1 duration-300"
              >
                Update
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default UpdateDetails;
