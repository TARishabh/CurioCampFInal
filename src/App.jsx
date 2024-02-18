// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route, Routes } from "react-router-dom";
import "./App.css";
// import Navbar from './component/Navbar'
import Signin from "./pages/Signin";
// import Card from './component/Card'
// import Modal from './component/Modal'
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import Razorpay from "./pages/Razorpay";
import Courses from "./pages/Courses";
import CoursePage from "./pages/CoursePage";
// import ChatComponent from './pages/ChatComponent'
// import LiveStream from './pages/Agora'
import VideoCallComponent from "./pages/VideoCallComponent ";
import Dashboard from "./pages/Dashboard";
// import PurchasedCourses from "./pages/PurchasedCourses";
import MCQpage from "./pages/MCQpage";
import VideoPage from "./pages/VideoPage";
// import VideoCallComponent from './pages/VideoCallComponent '
// import EditProfile from './pages/EditProfile'
import PurchasedCourses from './pages/PurchasedCourses'
import Collaborate from "./pages/Collaborate";
import Leaderboard from "./component/Leaderboard";
import QuizForm from "./component/Quizform";
import Dailyquest from "./pages/Dailyquest";
import QuizPage from "./pages/Quizpage";
import Learningpath from "./pages/LearningPath";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
    <ToastContainer limit={3} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/pay" element={<Razorpay />} />
        <Route exact path="/courses" element={<Courses />} />
        <Route exact path="/courses/:id" element={<CoursePage />} />
        <Route exact path="/courses/:id/mcq" element={<MCQpage />} />
        <Route exact path="/courses/:id/video" element={<VideoPage />} />
        <Route exact path="/livevideo" element={<VideoCallComponent />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/collaborate" element={<Collaborate />} />
        <Route exact path="/purchasedcourses" element={<PurchasedCourses />} />
        <Route exact path="/leaderboard" element={<Leaderboard />} />
        <Route exact path="/quizform" element={<QuizForm />} />
        <Route exact path="/dailyquest" element={<Dailyquest />} />
        <Route exact path="/quizpage" element={<QuizPage />} />
        <Route exact path="/learningpath" element={<Learningpath />} />
        <Route exact path='/*' element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
