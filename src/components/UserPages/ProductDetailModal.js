import React, { useRef, useEffect } from "react";
import "../Users.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Slices/CartSlice";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS
import Reviews from "./Review";
import RatingDisplay from "./RatingDisplay";

const ProductDetailModal = ({
  selectedProduct,
  showDetailModel,
  unDisplayDetailModal,
}) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const { user, isAuth } = useSelector((state) => state.auth);
  // Check if user is logged in
  const isUserLoggedIn = isAuth;
  console.log("selectedProduct", selectedProduct);
  
  // Close modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        unDisplayDetailModal(); // Call the prop function to close the modal
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [unDisplayDetailModal]);

  const handleAddToCart = () => {
    if (!isUserLoggedIn) {
      // Notify user to log in
      toast.info("Please log in to add items to your cart!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return; // Exit early if user is not logged in
    }

    // Proceed to add to cart if size is selected and in stock
    const productId = selectedProduct._id;
    const color = selectedProduct.color;
    const quantity = 1;
    console.log("Adding to cart:", { productId, color, quantity });

    dispatch(addToCart({ userId: user._id, productId, quantity, color }));
  };

  if (!showDetailModel) return null; // Hide modal if not visible

  return (
    <div className="product-detail-modal">
      <div className="modal-content-tab" ref={modalRef}>
        <span
          className="close-button"
          onClick={unDisplayDetailModal} // Use the correct prop
        >
          &times;
        </span>
        <div className="product-detail-tabs">
          <div className="images-column">
            <div className="mw-450">
              <div>
                <img
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  className="large-product-image"
                />
              </div>
            </div>
          </div>
          <div className="product-info">
            <div className="mw-450">
              <div className="product-name">
                <h1 className="pr-name-title">{selectedProduct.name}</h1>
              </div>
              {/* {selectedStock !== null && (
                <div className="stock-info">
                  <p>Stock available: {selectedStock}</p>
                </div>
              )} */}
              <div className="clr-rating">
                <div className="product-color">
                  <p className="color-label">Color: </p>
                  <p className="color-value">{selectedProduct.color}</p>
                </div>
                <div className="product-rating">
                  <RatingDisplay rating={selectedProduct.avg_rating} />
                </div>
              </div>
              <div className="product-wrapper">
                <p className="product-price">
                  ${selectedProduct.price || "N/A"}
                </p>
                <button
                  className="btn btn-outline-success d-flex d-row ml-auto"
                  onClick={handleAddToCart}
                >
                  <i className="fas fa-cart-plus align-self-center mr-2 fa-sm" />
                  <small className="font-weight-bold">Add to Cart</small>
                </button>
              </div>
            </div>
            {/* Collapsible Descriptions */}
            <div className="product-description">
              <p>
                {selectedProduct.description || "No description available."}
              </p>
            </div>

            {/* Reviews Section */}
            <Reviews productId={selectedProduct._id} />
          </div>
        </div>
      </div>
      {/* Toast container */}
      <ToastContainer />{" "}
    </div>
  );
};

export default ProductDetailModal;
