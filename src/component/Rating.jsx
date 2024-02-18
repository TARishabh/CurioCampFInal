import React, { useState, useEffect } from "react";
function Ratings({rating}) {
//   const [rating, setRating] = useState(null);
//   const [rating, setRating] = useState(null);
//   useEffect(() => {
//     // Fetch rating data from the backend
//     fetch("backend_endpoint_url")
//       .then((response) => response.json())
//       .then((data) => {
//         // Assuming the backend returns a JSON object with a 'rating' field
//         setRating(data.rating);
//       })
//       .catch((error) => {
//         console.error("Error fetching rating:", error);
//       });
//   }, []); // Empty dependency array ensures the effect runs only once on component mount
  return (
    <div>
      {rating !== null ? (
        <div className="flex items-center">
          <h4>{rating}</h4>
          {/* Render star icons based on rating */}
          {Array.from({ length: Math.floor(rating) }, (_, index) => (
            <svg
              key={index}
              className="w-4 h-4 text-yellow-300 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
          {/* Render remaining empty star icons if rating is not an integer */}
          {rating % 1 !== 0 && (
            <svg
              className="w-4 h-4 ms-1 text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          )}
        </div>
      ) : (
        <p>Loading rating...</p>
      )}
    </div>
  );
}
export default Ratings;