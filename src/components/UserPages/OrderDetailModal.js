import React from "react";
import "../Order.css";
const OrderDetailModal = ({ order, isOpen, closeModal }) => {
  if (!order || !isOpen) return null; // Don't render if no order or modal is closed

  const convertDateFormate = (dateString) => {
    const date = new Date(dateString);

    // Format the date as dd/mm/yyyy
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits for day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed, so add 1)
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  // Calculate subtotal by summing up item price * quantity
  const calculateSubtotal = () => {
    return order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  // console.log("order", order);

  return (
    <div
      className="modal1 fade show"
      tabIndex="-1"
      style={{ display: "block" }}
      aria-labelledby="orderModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog1">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="orderModalLabel">
              Order Details - {order._id}
            </h5>
            <button
              type="button"
              className="close"
              onClick={closeModal}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body df">
            <div className="column mr-5">
              <div className="table-container">
                <table className="table table-borderless br">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item._id}>
                        <td>
                          {/* Container for image and product name */}
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {/* Product Image */}
                            <img
                              src={item.productId.image_url}
                              alt={item.productId.name}
                              className="img-thumbnail"
                              style={{
                                width: "50px",
                                height: "70px",
                                objectFit: "cover",
                                marginRight: "10px", // Adds space between image and product name
                              }}
                            />
                            {/* Product Name */}
                            <p style={{ margin: 0 }}>{item.productId.name}</p>
                          </div>
                        </td>
                        <td>{item.quantity}</td>
                        <td>${item.price}</td>
                        <td>${item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="order-details">
                <h3 className="order-content">Customer and Order Details</h3>
                <div className="order-detail">
                  <span className="label">Customer Name:</span>
                  <span className="value">{order.fullName}</span>
                </div>
                <div className="order-detail">
                  <span className="label">Phone Number:</span>
                  <span className="value">{order.phoneNumber}</span>
                </div>
                <div className="order-detail">
                  <span className="label">Payment Method:</span>
                  <span className="value">{order.paymentMethod}</span>
                </div>
                <div className="order-detail">
                  <span className="label">Order Status:</span>
                  <span
                    className={`badge ${
                      order.status === "Delivered"
                        ? "badge-success"
                        : order.status === "Shipped"
                        ? "badge-primary"
                        : order.status === "cancelled"
                        ? "badge-danger" // Class for Cancelled status
                        : order.status === "Pending"
                        ? "badge-secondary" // Class for Pending status
                        : "badge-warning"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="column flex-grow-1 mw-300">
              <div className="order-summaries">
                <h3 className="order-content">Order Summary</h3>
                <div className="order-sumary">
                  <span className="label">Order Date:</span>
                  <span className="value">
                    {convertDateFormate(order.createdAt)}
                  </span>
                </div>
                <div className="order-sumary">
                  <span className="label">Total Items:</span>
                  <span className="value">{order.items.length}</span>
                </div>
                <div className="order-sumary">
                  <span className="label">Subtotal:</span>
                  <span className="value">${calculateSubtotal()}</span>
                </div>
                <div className="order-sumary">
                  <span className="label">Delivery Fee:</span>
                  <span className="value">$5</span>
                </div>
              </div>
              <div className="order-total">
                <div className="order-sumary">
                  <span className="label">Total:</span>
                  <span className="value">${order.totalAmount}</span>
                </div>
              </div>
              <div className="order-address">
                <h3 className="order-content">Shipping Address</h3>
                <div className="order-sumary">
                  <span className="label">Address:</span>
                  <span className="value">{order.shipping_address}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
