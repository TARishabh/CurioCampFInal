import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";
import { Link } from "react-scroll";
import Navbar from "../component/Navbar";
import Overview from "../courseContent/Overview";
import CourseContent from "../courseContent/CourseContent";
import Details from "../courseContent/Details";
import Instructor from "../courseContent/Instructor";
import Review from "../courseContent/Review";
import PaymentCard from "../courseContent/PaymentCard";
import Footer from "../component/footer";
import Ratings from "../component/Rating";

const CoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const [canPostReview, setCanPostReview] = useState(false); // State variable to track if user can post review
  const url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    // Fetch course details
    fetch(`${url}api/courses/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.results.review);
        setCourse(data.results);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

    // Check if user can post review
    fetch(`${url}checktopostreviews/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        course: id,
        user: localStorage.getItem("user_id"), // Assuming user_id is stored in localStorage
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCanPostReview(data.status); // Set state based on response
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [id]); // Include id in dependencies array to re-fetch data when id changes
  //   function getScrollPosition() {
  //     let scrollPosition = window.scrollY;
  //     if(scrollPosition >= 350){
  //         scrollStop = true;
  //     }
  //     console.log('Scroll Position:', scrollPosition);
  //   }
  //   window.addEventListener('scroll', getScrollPosition);
  return (
    <div>
      <Navbar />
      <div className="w-full max-h-[300px] imgbg p-20 flex flex-col gap-2">
        <h2 className="font-bold text-4xl">{course.title}</h2>
        {/* <p className="font-semibold">{course.description}</p> */}
        <p className="flex gap-2">
          <IoBookOutline className="mt-[5px]" /> {course.course_modules} Modules
        </p>
        <p className="text-sm">{course.keyword}</p>
        <p className="font-semibold">₹{course.price}</p>
        <Ratings rating={course.review}></Ratings>
      </div>
      <div className="flex-row lg:flex">
        <div className="w-full lg:w-[1000px]">
          <ul className="m-2 p-4 sticky top-2 gap-3 bg-white rounded-2xl z-10 flex flex-nowrap overflow-scroll overflow-y-hidden">
            <Link
              activeClass="active"
              className="block select-none text-white rounded-full bg-indigo-600 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              spy={true}
              to="Overview"
              smooth={true}
              duration={25}
            >
              Overview
            </Link>
            <Link
              activeClass="active"
              className="block select-none text-white rounded-full bg-indigo-600 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              spy={true}
              to="CourseContent"
              smooth={true}
              duration={25}
            >
              Content
            </Link>
            <Link
              activeClass="active"
              className="block select-none text-white rounded-full bg-indigo-600 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              spy={true}
              to="Details"
              smooth={true}
              duration={25}
            >
              Details
            </Link>
            <Link
              activeClass="active"
              className="block select-none text-white rounded-full bg-indigo-600 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              spy={true}
              to="Instructor"
              smooth={true}
              duration={25}
            >
              Instructor
            </Link>
            <Link
              activeClass="active"
              className="block select-none text-white rounded-full bg-indigo-600 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              spy={true}
              to="Review"
              smooth={true}
              duration={25}
            >
              Review
            </Link>
          </ul>
          <div className="">
          <Overview />
          <CourseContent />
          <Details />
          <Instructor />
          <Review />
          </div>
        </div>
        {!canPostReview && <PaymentCard price={course.price} />}
      </div>
      <Footer/>
    </div>
  );
};
export default CoursePage;