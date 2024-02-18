import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PurchasedCourseCard from '../component/PurchasedCourseCard';
import { useParams } from "react-router-dom";

const PurchasedCourses = () => {
  const [courses, setCourses] = useState([]);
  const url = import.meta.env.VITE_BASE_URL;
  // const { id } = useParams();
  const user_id = localStorage.getItem("user_id");
  const authToken = localStorage.getItem("token");
  const [showCard, setShowCard] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // const response = 
      const axiosInstance = axios.create({
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      try {
        const response = await axiosInstance.get(`${url}getTransactionDetails/?user=${user_id}`);
        setCourses(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {courses.map(course => (
        <PurchasedCourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default PurchasedCourses;
