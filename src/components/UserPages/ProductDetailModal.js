import React, { useRef, useState, useEffect } from "react";
import "../Users.css";

const ProductDetailModal = ({
  selectedProduct,
  showDetailModel,
  unDisplayDetailModal,
}) => {
  const [selectedImage, setSelectedImage] = useState(selectedProduct.images[0]);
  const modalRef = useRef(null);

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
          {/* <div className="product-card"> */}
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
                    {selectedProduct.images.map((image, index) => (
                      <li
                        className="image-item"
                        key={index}
                        onClick={() => setSelectedImage(image)}
                      >
                        <img
                          key={index}
                          src={image}
                          alt={`${selectedProduct.name} - ${index + 1}`}
                          className={`product-image ${
                            image === selectedImage ? "selected" : ""
                          }`} // Add conditional class
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
              <h3>{selectedProduct.name}</h3>
              <p>{selectedProduct.description}</p>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
