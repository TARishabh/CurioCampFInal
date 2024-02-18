import React from "react";
import { IoBookOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const PurchasedCourseCard = ({ course }) => {
  const { id, title, image, price, modules } =
    course;
  // const sliced = keyword.slice(1,5);
  return (
    <div className="shadow-lg p-3 rounded-2xl h-[325px] max-w-[270px] bg-gradient-to-tr from-[#E7E9E8] to-[#f4f4f3] hover:-translate-y-1 duration-200  hover:bg-[#f4f4fe]">
      <Link to={`/courses/${id}/`}>
        <img
          className="shadow-md rounded-lg mb-3 hover:-translate-y-1 duration-200"
          src={image}
          alt="Courses Image"
        />
        <div className=" flex flex-col gap-2">
          <h2 className="font-bold text-lg">{title}</h2>
          {/* <p className='font-semibold'>{description}</p> */}
          <p className="flex gap-2 text-indigo-600">
            <IoBookOutline className="mt-[5px] text-indigo-600" />{" "}
            {modules} Modules
          </p>
          {/* <p className="text-sm">{keyword}</p> */}
          <p className="font-semibold">₹{price}</p>
        </div>
      </Link>
    </div>
  );
};
export default PurchasedCourseCard;