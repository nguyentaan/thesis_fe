import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrdersByUserId, cancelOrder } from "../../Slices/OrderSlice";
import OrderDetailModal from "./OrderDetailModal";
import logo from "../../assets/logo.png";
import WriteReview from "./WriteReview";
import Loader from "./Loader";
import "../Order.css";

const UserOrdersPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;
  // Get order data and loading/error states from Redux store
  const {
    dataOrder = [], // Default to empty array if undefined
    isOrderLoading,
  } = useSelector((state) => state.order);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false); // State to control review modal

  // Fetch orders on component mount
  useEffect(() => {
    dispatch(getOrdersByUserId(userId));
  }, [dispatch, userId]);

  // Open the modal and set selected order
  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCancelOrder = (order) => {
    console.log("Canceling order:", order._id);
    if (window.confirm("Are you sure you want to cancel this order?")) {
      // Log userId and order._id to check if they are correct
      console.log("User ID:", userId, "Order ID:", order._id);
      dispatch(cancelOrder(userId, order._id));
    }
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const convertDateFormate = (dateString) => {
    const date = new Date(dateString);

    // Format the date as dd/mm/yyyy
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits for day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed, so add 1)
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleAddReview = (product) => {
    console.log("Adding review for product:", product._id);
    console.log("Product:", product);

    setSelectedOrder(product); // Update to set the product instead of the order
    setIsReviewOpen(true); // Open the review modal
    console.log("Is Review Open:", isReviewOpen);
  };

  return (
    <div>
      <nav
        id="top"
        className="navbar fixed-top navbar-expand-lg navbar-light bg-light"
      >
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={logo} className="logo-fx" alt="Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mx-4">
                <h6 className="my-0 text-success-s2 d-flex d-row">
                  <Link to="/" className="text-success-s2 mr-2">
                    HOME
                  </Link>
                  <span className="text-success-s2 my-0">/ My Orders</span>
                </h6>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Orders Section */}
      <div className="container mt-5 pt-5">
        <h2 className="mb-4 title">My Orders</h2>

        {/* Loading and Error Handling */}
        {isOrderLoading ? (
          <Loader isProductLoading={isOrderLoading} />
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Order Number</th>
                  <th>Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dataOrder.length > 0 ? (
                  dataOrder.map((order) => (
                    <tr key={order._id}>
                      <td>
                        {order.items.map((item) => (
                          <div key={item._id} className="product-info1">
                            <img
                              src={item.productId.image_url}
                              alt={item.productId.name}
                              className="product-image-small"
                            />
                            <div>
                              <p className="mb-1">
                                <strong>{item.productId.name}</strong>
                              </p>
                              {order.status === "Delivered" && (
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() =>
                                    handleAddReview(item.productId)
                                  }
                                >
                                  Write Review
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </td>
                      <td>{convertDateFormate(order.createdAt)}</td>
                      <td>${order.totalAmount}</td>
                      <td>
                        <span
                          className={`badge ${
                            order.status === "Delivered"
                              ? "badge-success"
                              : order.status === "Shipped"
                              ? "badge-primary"
                              : order.status === "cancelled"
                              ? "badge-danger"
                              : order.status === "Pending"
                              ? "badge-secondary"
                              : "badge-warning"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group">
                          <button
                            className="icon-button btn btn-outline-info btn-sm"
                            onClick={() => openModal(order)}
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          {order.status === "Pending" && (
                            <button
                              className="icon-button btn btn-outline-danger btn-sm ml-2"
                              onClick={() => handleCancelOrder(order)}
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Show WriteReview component if the state is open */}
      {isReviewOpen && (
        <WriteReview
          product={selectedOrder}
          userId={userId}
          closeReview={() => setIsReviewOpen(false)}
        />
      )}

      <OrderDetailModal
        order={selectedOrder}
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default UserOrdersPage;
