import React, { useState, useEffect } from 'react';
import PremiumCard from '../component/PremiumCard';
import CourseCard from '../component/CourseCard';

const PurchasedCourses = () => {
  const [courses, setCourses] = useState([]);
  const url = import.meta.env.VITE_BASE_URL;
//   console.log(url)
  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const response = await fetch(`${url}api/courses/?purchased=true&user=1`);
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data.results.results);
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
      }
    };

    fetchPurchasedCourses();
  }, []);

  return (
    <div>
      {courses.map(course => (
        <PremiumCard
          key={course.id}
          title={course.title}
          description={course.description}
          image={course.image}
        />
      ))}
    </div>
  );
};

export default PurchasedCourses;
