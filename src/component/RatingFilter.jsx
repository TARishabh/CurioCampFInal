import React from 'react';
import { Rating } from '@mui/material';
export default function RatingFilter({ value, onChange }) {
  return (
    <Rating
      name="rating-filter"
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
    />
  );
}
