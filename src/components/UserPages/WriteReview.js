import React from "react";
import "../Review.css";

const WriteReview = ({ product, closeReview }) => {
  return (
    <div className="write-review-container">
      <div className="overlay">
        <div className="write-review-modal">
          <h3 className="modal-title">Write a Review for</h3>
          {/* <h3 className="modal-title">Write a Review for {product.name}</h3> */}

          <div className="rating-section">
            <label className="rating-label">Rating:</label>
            <div className="rating">
              {[...Array(5)].map((_, index) => (
                <span key={index} className={index < 0 ? "filled" : "empty"}>
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="review-section">
            <label className="review-label">Review:</label>
            <textarea
              className="review-textarea"
              placeholder="Write your review here..."
            />
          </div>

          <div className="btn-group">
            <button className="submit-review-btn">Submit Review</button>
            {/* Close Button */}
            <button className="close-modal-btn" onClick={closeReview}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
