import React from "react";
import '../Review.css';

const Reviews = ({ reviews }) => {
  return (
    <div className="reviews-section">
      <h3>Customer Reviews</h3>
      <ul className="reviews-list">
        <li className="review-item">
          <div className="review-rating">
            <span className="filled">★</span>
            <span className="filled">★</span>
            <span className="filled">★</span>
            <span className="filled">★</span>
            <span>★</span>
          </div>
          <p className="review-text">This is an amazing product!</p>
          <p className="review-author">- John Doe</p>
        </li>
        <li className="review-item">
          <div className="review-rating">
            <span className="filled">★</span>
            <span className="filled">★</span>
            <span className="filled">★</span>
            <span>★</span>
            <span>★</span>
          </div>
          <p className="review-text">Good quality but slightly expensive.</p>
          <p className="review-author">- Jane Smith</p>
        </li>
        <li className="review-item">
          <div className="review-rating">
            <span className="filled">★</span>
            <span className="filled">★</span>
            <span className="filled">★</span>
            <span className="filled">★</span>
            <span className="filled">★</span>
          </div>
          <p className="review-text">
            Best purchase I've made! Highly recommend.
          </p>
          <p className="review-author">- Emily Brown</p>
        </li>
      </ul>
    </div>
  );
};

export default Reviews;
