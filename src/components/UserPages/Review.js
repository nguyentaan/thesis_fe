import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../Slices/ReviewSlice";
import "../Review.css";

const Reviews = ({ productId }) => {
  const dispatch = useDispatch();
  const {
    reviews = [],
    isLoading,
    error,
  } = useSelector((state) => state.review || {});

  useEffect(() => {
    if (productId) {
      dispatch(fetchReviews(productId));
    }
  }, [dispatch, productId]);

  if (isLoading) return <p>Loading reviews...</p>;

  if (error)
    return (
      <p className="no-reviews">
        {error?.message || "An unknown error occurred"}
      </p>
    );

  return (
    <div className="reviews-section">
      {reviews.length === 0 ? (
        <div className="no-reviews">
          <p>No reviews yet. Be the first to review this product!</p>
          {/* Optional Call-to-Action */}
          <button
            className="add-review-button"
            onClick={() => alert("Add your review!")}
          >
            Write a Review
          </button>
        </div>
      ) : (
        <ul className="reviews-list">
          {reviews.map((review) => (
            <li key={review._id} className="review-item">
              <div className="review-rating">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={index < review.rating ? "filled" : ""}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="review-text">{review.review}</p>
              <div className="df-sp">
                <p className="review-author">
                  - {review.user.name || "Anonymous"}
                </p>
                <p className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
