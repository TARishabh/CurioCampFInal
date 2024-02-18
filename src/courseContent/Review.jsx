import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from "react-router-dom";


const Review = () => {
  const [showReviewFields, setShowReviewFields] = useState(false);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const url = import.meta.env.VITE_BASE_URL
  const { id } = useParams(); 
  const userId = localStorage.getItem("user_id")


  const checkToPostReviews = async () => {
    try {
      const response = await axios.post(`${url}checktopostreviews/`, {
        user: userId,
        course: id,
      });
      console.log(response.data)
      if (response.data.status) {
        setShowReviewFields(true);
      } else {
        toast.error('You need to purchase the course to leave a review.');
      }
    } catch (error) {
      console.error('Error checking if user can post reviews:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  const postReview = async () => {
    try {
      const response = await axios.post(`${url}postreviews/`, {
        user: userId,
        course: id,
        review,
        rating,
      });
      toast.success(response.data.message);
      // Reset review and rating input fields
      setReview('');
      setRating(0);
      // Optionally, you can hide the review fields after posting the review
      setShowReviewFields(false);
    } catch (error) {
      console.error('Error posting review:', error);
      toast.error('An error occurred while submitting your review. Please try again later.');
    }
  };

  return (
    <div name="Review" className='m-4 p-3 max-w-[800px] shadow-lg rounded-2xl'>
      <h1 className='font-bold text-indigo-600 text-xl mb-3'>Review</h1>
      <p className='text-gray-500'>
        In this free 14 hour tutorial you are going to learn how to build a Twitch Clone using Next 14. We are going to start with the basics like configuring Next.js, learning the routing concepts, and then slowly go deeper into setting up authentication, database, local tunnels, webhooks, all the way to generating RTMP and WHIP connections to connect to our OBS streaming software.
      </p>
      {!showReviewFields ? (
        <button
          onClick={checkToPostReviews}
          className="py-2 px-4 mt-3 bg-indigo-600 text-white rounded-full focus:outline-none hover:bg-indigo-700"
        >
          Have an opinion? Please Review
        </button>
      ) : (
        <div className="mt-3">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Your review..."
            className="w-full h-20 p-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
          ></textarea>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            placeholder="Rating out of 5"
            className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
          />
          <button
            onClick={postReview}
            className="mt-2 py-2 px-4 bg-indigo-600 text-white rounded-full focus:outline-none hover:bg-indigo-700"
          >
            Submit Review
          </button>
        </div>
      )}
    </div>
  );
};

export default Review;
