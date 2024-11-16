import React from "react";
import "../Review.css"; // For styling

const RatingDisplay = ({ rating }) => {
  const filledStars = Math.round(rating); // Round the rating to the nearest whole number
  const emptyStars = 5 - filledStars;

  return (
    <div className="rating-display">
      {/* Display filled stars */}
      {[...Array(filledStars)].map((_, index) => (
        <span key={index} className="filled-star">
          ★
        </span>
      ))}

      {/* Display empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={index} className="empty-star">
          ★
        </span>
      ))}

      {/* Optionally display the numeric rating */}
      <span className="rating-text">({rating})</span>
    </div>
  );
};

export default RatingDisplay;
