import React, { useState } from 'react';
import RatingFilter from './RatingFilter';
function Ratingsearch() {
  const [filterRating, setFilterRating] = useState(null);
  // Function to handle rating change
  const handleRatingChange = (newValue) => {
    setFilterRating(newValue);
    // Perform filtering based on the new rating value
    // For example, you can make an API call with the new rating value to fetch filtered data
    console.log('Filtering with rating:', newValue);
  };
  return (
    <div className='grid items-center justify-center'>
      <h1 className='font-md text-xs ml-4'>Filter by Rating</h1>
      <RatingFilter value={filterRating} onChange={handleRatingChange} />
      {/* Render your search results here */}
    </div>
  );
}
export default Ratingsearch;