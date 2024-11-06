import React from "react";

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

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      style={{ display: "block" }}
      aria-labelledby="orderModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
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
          <div className="modal-body">
            <h6>Date: {convertDateFormate(order.createdAt)}</h6>
            <p>
              <strong>Total Amount:</strong> {order.totalAmount}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Items:</strong>
            </p>
            <ul>
              {order.items &&
                order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.quantity} x {item.price} each
                  </li>
                ))}
            </ul>
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
