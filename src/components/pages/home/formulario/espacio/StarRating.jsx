import React, { useState } from 'react';
import './StarRating.css';

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              style={{ display: 'none' }} // Ocultar el input
            />
            <i
              className={`fa fa-star ${ratingValue <= (hover || rating) ? 'filled' : 'empty'}`}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setRating(ratingValue)}
              style={{ cursor: 'pointer', fontSize: '2rem' }}
            ></i>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
