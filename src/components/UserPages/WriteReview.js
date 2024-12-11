import React from "react";
import "../Review.css";
import { useDispatch } from "react-redux";
import { writeReview } from "../../Slices/ReviewSlice";

const WriteReview = ({ product, userId, closeReview }) => {
  const dispatch = useDispatch();
  const [reviewText, setReviewText] = React.useState("");
  const [rating, setRating] = React.useState(0);

  const handleSubmit = () => {
    // Add logic to save the review here (e.g., dispatching an action)
    dispatch(
      writeReview({ productId: product._id, rating, reviewText, userId })
    );
    closeReview();
  };

  return (
    <div className="review-section">
      <div className="modal-content1">
        <h2>Write a Review for {product.name}</h2>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here"
          className="review-textarea"
        />
        <div className="rating-stars">
          <label>Rating:</label>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${rating >= star ? "selected" : ""}`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <div className="btn-groups">
          <button className="submit-review-btn" onClick={handleSubmit}>
            Submit Review
          </button>
          <button className="close-modal-btn" onClick={closeReview}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
