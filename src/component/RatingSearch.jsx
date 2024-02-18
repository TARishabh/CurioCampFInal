import React, { useState } from 'react';
import RatingFilter from './RatingFilter';

function Ratingsearch({ onRatingChange }) {
  const [filterRating, setFilterRating] = useState(null);

  // Function to handle rating change
  const handleRatingChange = (newValue) => {
    setFilterRating(newValue);
    // Call the parent component's callback function with the new rating value
    onRatingChange(newValue);
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
