import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import TextField from "../component/TextField";
import RadioField from "../component/RadioField";
import { Formik, Form } from "formik";
import Img from "../assets/signup_vector.png";
import Navbar from "../component/Navbar";
import * as Yup from "yup";
import UpdateDetails from "../dashboardContent/UpdateDetails";
import OngoingCourses from "../dashboardContent/OngoingCourses";
import PurchesedCourses from "../dashboardContent/PurchesedCourses";
import CompletedCourses from "../dashboardContent/CompletedCourses";

const Dashboard = () => {
  const [ completedCourses,  setCompletedCourses] = useState(false);
  const [ ongoingCourses,  setOngoingCourses] = useState(false);
  const [ purchesedCourses,  setPurchesedCourses] = useState(false);
  const [ updateDetails,  setUpdateDetails] = useState(true);

  return (
    <>
      <Navbar/>
      <div className="flex-row lg:flex">
        <div className="w-full">
      <ul className="m-1 p-4 sticky top-2 gap-3 bg-white z-10 flex flex-nowrap overflow-scroll items-center justify-center overflow-y-hidden">
          <button
            className="block-inline select-none text-white rounded-full bg-indigo-600 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() => {
              setUpdateDetails(true);
              setCompletedCourses(false);
              setOngoingCourses(false);
              setPurchesedCourses(false);
            }}
          >
            Update Details
          </button>
          <button
            className="block-inline select-none text-white rounded-full bg-indigo-600 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() => {
              setUpdateDetails(false);
              setCompletedCourses(true);
              setOngoingCourses(false);
              setPurchesedCourses(false);
            }}
          >
            Completed Courses
          </button>
          <button
            className="block-inline select-none text-white rounded-full bg-indigo-600 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() => {
              setUpdateDetails(false);
              setCompletedCourses(false);
              setOngoingCourses(true);
              setPurchesedCourses(false);
            }}
          >
            Ongoing Courses
          </button>
          <button
            className="block-inline select-none text-white rounded-full bg-indigo-600 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() => {
              setUpdateDetails(false);
              setCompletedCourses(false);
              setOngoingCourses(false);
              setPurchesedCourses(true);
            }}
          >
            Purchesed Courses
          </button>
        </ul>
        </div>
        </div>
      <div className="block justify-around">
        {updateDetails && <UpdateDetails />}
        {ongoingCourses && <OngoingCourses />}
        {purchesedCourses && <PurchesedCourses />}
        {completedCourses && <CompletedCourses />}
        <div className="hidden lg:flex">
          <img
            className="h-[300px] w-[400px] mt-20"
            src={Img}
            alt="Log in Image"
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
