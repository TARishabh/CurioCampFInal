import { useState, useEffect } from "react";
import Img from "../assets/signup_vector.png";
import Navbar from "../component/Navbar";
import * as Yup from "yup";
// import UpdateDetails from "../dashboardContent/UpdateDetails";
// import OngoingCourses from "../dashboardContent/OngoingCourses";
// import PurchesedCourses from "../dashboardContent/PurchesedCourses";
// import CompletedCourses from "../dashboardContent/CompletedCourses";

import LiveStreamRoom from "../collaborateContent/LiveStreamRoom";
import AudioRoom from "../collaborateContent/AudioRoom";
import VideoRoom from "../collaborateContent/VideoRoom";
import ChatRoom from "../collaborateContent/ChatRoom";
import { Link } from "react-router-dom";

const Collaborate = () => {
  const [joinChatRoom, setJoinChatRoom] = useState(true);
  const [joinLiveStream, setJoinLiveStream] = useState(false);
  const [joinVideoRoom, setJoinVideoRoom] = useState(false);
  const [joinAudioRoom, setJoinAudioRoom] = useState(false);

  return (
    <>
      <Navbar />
      <div className="flex-row lg:flex">
          <div className="w-full">
            <ul className="m-1 p-4 sticky top-2 gap-3 bg-white rounded-2xl z-10 flex flex-nowrap overflow-scroll items-center  justify-center overflow-y-hidden">
              <button
                className="inline select-none text-white rounded-full bg-indigo-600 py-3.5 px-[28px] text-center align-middle font-sans text-sm font-bold uppercase shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => {
                  setJoinChatRoom(true);
                  setJoinLiveStream(false);
                  setJoinVideoRoom(false);
                  setJoinAudioRoom(false);
                }}
              >
                Join Chat Room
              </button>
              <button
                className="inline select-none text-white rounded-full bg-indigo-600 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => {
                  setJoinLiveStream(true);
                  setJoinChatRoom(false);
                  setJoinVideoRoom(false);
                  setJoinAudioRoom(false);
                }}
              >
                Join Live Stream
              </button>
              <button
                className="inline select-none text-white rounded-full bg-indigo-600 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => {
                  setJoinLiveStream(false);
                  setJoinChatRoom(false);
                  setJoinVideoRoom(true);
                  setJoinAudioRoom(false);
                }}
              >
                Join Video Room
              </button>
              <button
                className="inline select-none text-white rounded-full bg-indigo-600 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => {
                  setJoinLiveStream(false);
                  setJoinChatRoom(false);
                  setJoinVideoRoom(false);
                  setJoinAudioRoom(true);
                }}
              >
                Join Audio Room
              </button>
            </ul>
          </div>
        </div>
      <div className="flex justify-around">
        {joinChatRoom && <ChatRoom />}
        {joinVideoRoom && <VideoRoom />}
        {joinAudioRoom && <AudioRoom />}
        {joinLiveStream && <LiveStreamRoom />}
        <div className="hidden lg:flex">
          {/* <img
                        className="h-[300px] w-[400px] mt-20"
                        src={Img}
                        alt="Log in Image"
                    /> */}
        </div>
        {/* <Link
                to="/quizpage"
                rel="noopener"
                className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-full ">
                Quiz Page
              </Link> */}
      </div>
    </>
  );
};

export default Collaborate;
