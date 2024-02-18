import React, { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import CourseCard from "../component/CourseCard";
import Footer from "../component/footer";
import RatingSearch from "../component/RatingSearch";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRating, setFilterRating] = useState(null);

  const fetchCourses = () => {
    const url = import.meta.env.VITE_BASE_URL;
    fetch(`${url}api/courses/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCourses(data.results.results);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearchOnclick = () => {
    const url = import.meta.env.VITE_BASE_URL;
    console.log(searchQuery);

    fetch(`${url}api/courses/?course=${searchQuery}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCourses(data.results.results);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  const handleRatingOnclick = (newvalue) => {
    const url = import.meta.env.VITE_BASE_URL;
    console.log(searchQuery);

    fetch(`${url}api/courses/?rating=${newvalue}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCourses(data.results.results);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };


  // Function to handle rating change
  const handleRatingChange = (newValue) => {
    setFilterRating(newValue);
    console.log(newValue);
    // Call the function to fetch courses based on the new rating value
    handleRatingOnclick(newValue);
  };

  return (
    <div className="courses">
      <Navbar />
      <div className="w-full h-[3000px] md:h-[800px] mb-96">
        <div className="mt-3">
          <p className="pl-8 pt-4">Home/ Courses</p>
          <h1 className="pl-8 font-bold text-2xl mb-2">All Courses</h1>
           <div className="flex flex-cols-2 items-center justify-center ">
           <div className="Searchbar mr-6">
          <form onSubmit={(e) => { e.preventDefault(); handleSearchOnclick(); }} className="flex items-center max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
              <input type="text" id="simple-search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Search courses" required />
            </div>
            <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-indigo-600 hover:text-white bg-[#f4f4fe] rounded-full border border-indigo-600 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
          </div>
          <RatingSearch onRatingChange={handleRatingChange} />
           </div>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="m-1 px-10 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10  h-screen">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
      <Footer className="mt-96"/>
    </div>
    
  );
};
export default Courses;