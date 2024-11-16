import React, { useRef, useState, useEffect } from "react";
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
  const [selectedImage, setSelectedImage] = useState(selectedProduct.images[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [openDescription, setOpenDescription] = useState(null);
  const modalRef = useRef(null);
  const { user, isAuth } = useSelector((state) => state.auth);
  // Check if user is logged in
  const isUserLoggedIn = isAuth;

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

  const toggleDescription = (index) => {
    setOpenDescription(openDescription === index ? null : index);
  };

  const handleAddToCart = () => {
    if (!isUserLoggedIn) {
      // Notify user to log in
      toast.info("Please log in to add items to your cart!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return; // Exit early if user is not logged in
    }

    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }

    // Check if the selected size is in stock
    const selectedSizeStock = selectedProduct.sizes.find(
      (size) => size.size_name === selectedSize
    )?.stock;

    if (selectedSizeStock === 0) {
      toast.error("This size is out of stock!");
      return;
    }

    // Proceed to add to cart if size is selected and in stock
    const productId = selectedProduct._id;
    const size = selectedSize;
    const quantity = 1;

    dispatch(addToCart({ userId: user._id, productId, quantity, size }));
  };

  const handleSelectSize = (size) => {
    setSelectedSize(size);
    const sizeStock = selectedProduct.sizes.find(
      (sizeItem) => sizeItem.size_name === size
    )?.stock;
    setSelectedStock(sizeStock);
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
              {selectedProduct.images.length > 0 ? (
                <div>
                  <img
                    src={selectedImage}
                    alt={selectedProduct.name}
                    className="large-product-image"
                  />
                  <ul className="image-gallery">
                    {selectedProduct.images.slice(0, -1).map((image, index) => (
                      <li
                        className="image-item"
                        key={index}
                        onClick={() => setSelectedImage(image)}
                      >
                        <img
                          src={image}
                          alt={`${selectedProduct.name} - ${index + 1}`}
                          className={`product-image ${
                            image === selectedImage ? "selected" : ""
                          }`}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No images available</p>
              )}
            </div>
          </div>
          <div className="product-info">
            <div className="mw-450">
              <div className="product-name">
                <h1 className="pr-name-title">{selectedProduct.name}</h1>
              </div>
              <div className="list-size">
                <div className="size-list">
                  {selectedProduct.sizes.map((size, index) => (
                    <div
                      key={index}
                      className={`size-item ${
                        selectedSize === size.size_name ? "selected" : ""
                      } ${size.stock === 0 ? "out-of-stock" : ""}`}
                      onClick={() =>
                        size.stock > 0 && handleSelectSize(size.size_name)
                      }
                      style={{
                        cursor: size.stock > 0 ? "pointer" : "not-allowed",
                      }}
                    >
                      {size.size_name} {size.stock === 0 && "(Out of stock)"}
                    </div>
                  ))}
                </div>
              </div>
              {selectedStock !== null && (
                <div className="stock-info">
                  <p>Stock available: {selectedStock}</p>
                </div>
              )}
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
                <p className="product-price">${selectedProduct.price}</p>
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
              {selectedProduct.description.map((item, index) => (
                <div key={index} className="description-item">
                  <div
                    className={`description-title ${
                      openDescription === index ? "active" : ""
                    }`}
                    onClick={() => toggleDescription(index)}
                  >
                    {Object.keys(item)[1]}{" "}
                    <span className="toggle-icon">
                      {openDescription === index ? "▲" : "▼"}
                    </span>
                  </div>
                  {openDescription === index && (
                    <div className="description-content">
                      <p>{Object.values(item)[1]}</p>
                    </div>
                  )}
                </div>
              ))}
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
