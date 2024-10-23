import React, { useRef, useState, useEffect } from "react";
import "../Users.css";

const ProductDetailModal = ({
  selectedProduct,
  showDetailModel,
  unDisplayDetailModal,
}) => {
  const [selectedImage, setSelectedImage] = useState(selectedProduct.images[0]);
  const [openDescription, setOpenDescription] = useState(null);
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

  const toggleDescription = (index) => {
    setOpenDescription(openDescription === index ? null : index);
  }

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
              <div className="product-name">
                <h1 className="pr-name-title">{selectedProduct.name}</h1>
              </div>
              <div className="list-size">
                <div className="size-list">
                  {selectedProduct.size.map((size, index) => (
                    <div key={index} className="size-item">
                      {size}
                    </div>
                  ))}
                </div>
              </div>
              <div className="product-color">
                <p className="color-label">Color: </p>
                <p className="color-value">{selectedProduct.color}</p>
              </div>
              <div className="product-wrapper">
                <p className="product-price">${selectedProduct.price}</p>
                <button className="btn btn-outline-success d-flex d-row ml-auto">
                  <i className="fas fa-cart-plus align-self-center mr-2 fa-sm" />
                  <small className="font-weight-bold">Cart</small>
                </button>
              </div>
            </div>
            {/* Collapsible Descriptions */}
            <div className="product-description">
              {/* <h3>Description</h3> */}
              {selectedProduct.description.map((item, index) => (
                <div key={index} className="description-item">
                  <div
                    className={`description-title ${
                      openDescription === index ? "active" : ""
                    }`}
                    onClick={() => toggleDescription(index)}
                  >
                    {Object.keys(item)[1]}{" "}
                    {/* This will display the title of the description */}
                    <span className="toggle-icon">
                      {openDescription === index ? "▲" : "▼"}
                    </span>
                  </div>
                  {openDescription === index && (
                    <div className="description-content">
                      <p>{Object.values(item)[1]}</p>{" "}
                      {/* This will display the content */}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
