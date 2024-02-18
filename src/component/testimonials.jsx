import React from "react";
import Container from "./container";
import userOneImg from "../assets/pf1.png";
import userTwoImg from "../assets/pf2.png";
import userThreeImg from "../assets/pf3.png";
const Testimonials  = () => {
  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        <div className="lg:col-span-2 xl:col-auto">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-4 rounded-2xl py-4 dark:bg-trueGray-800">
            <p className="text-lg leading-normal ">
            Curiocamp ignited my passion for learning with its engaging modules and vibrant community, making every session a captivating journey of discovery!
            </p>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-4 rounded-2xl py-4 dark:bg-trueGray-800">
            <p className="text-lg leading-normal ">
            Thanks to Curiocamp, I found my tribe of fellow learners, and together, we're exploring new horizons and pushing the boundaries of knowledge!
            </p>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-4 rounded-2xl py-4 ">
            <p className="text-lg leading-normal ">
            Curiocamp isn't just a platform; it's a lifeline for curious minds like mine, offering endless opportunities for growth, connection, and enlightenment!
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
// function Avatar(props) {
//   return (
//     <div className="flex items-center mt-8 space-x-3">
//       <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
//       </div>
//       <div>
//         <div className="text-lg font-medium">{props.name}</div>
//         <div className="text-gray-600 dark:text-gray-400">{props.title}</div>
//       </div>
//     </div>
//   );
// }
function Mark(props) {
  return (
    <>
      {" "}
      <mark className="text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 dark:ring-indigo-900 dark:bg-indigo-900 dark:text-indigo-200">
        {props.children}
      </mark>{" "}
    </>
  );
}
export default Testimonials;