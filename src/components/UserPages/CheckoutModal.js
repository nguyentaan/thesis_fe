import React from "react";
import logo from "../../assets/logo.png";
import { Modal } from "react-bootstrap";
import "../Checkout.css";

const CheckoutModal = ({
  showCheckoutModal,
  unDisplayCheckoutModal,
  subTotalPrice,
  dataInputCheckout = {},
  dataCart = [],
}) => {
  const { firstName, lastName, phoneNumber, address, paymentMethod } =
    dataInputCheckout;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  const todayDate = `${
    monthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  const closeCheckoutModal = () => unDisplayCheckoutModal(false);
  // Enhanced parsePrice function to handle different invalid cases
  return (
    <Modal size="lg" show={showCheckoutModal} onHide={closeCheckoutModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          <img src={logo} alt="Logo" className="checkout-modal-logo" />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="checkout-modal-body">
        <div className="checkout-modal-content">
          <div className="checkout-message">
            <p className="p-3 text-center text-success-s2">
              Thank you, your order has been received.
            </p>
          </div>

          <div className="d-flex justify-content-center mt-4 order-summary">
            <p className="text-center text-secondary">
              Date: <br />
              <span className="font-weight-bold text-dark">{todayDate}</span>
            </p>
            <div className="divider" />
            <p className="text-center text-secondary">
              Total: <br />
              <span className="font-weight-bold text-dark">
                ${subTotalPrice + 5}
              </span>
            </p>
            <div className="divider" />
            <p className="text-secondary">
              Payment Method: <br />
              <span className="font-weight-bold text-dark">
                {paymentMethod}
              </span>
            </p>
          </div>

          <div className="order-details">
            <h5 className="font-weight-bold text-success-s2 mb-3">
              ORDER DETAILS
            </h5>
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Firstname:</td>
                  <td>
                    <b>{firstName}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Lastname:</td>
                  <td>
                    <b>{lastName}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Phone Number:</td>
                  <td>
                    <b>{phoneNumber}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Location:</td>
                  <td>
                    <b>{`${address}`}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>Product:</td>
                  <td>
                    {dataCart.map((item, index) => (
                      <div className="d-flex align-items-center" key={index}>
                        <p className="text-success-s2 mb-0">
                          {item.productId.name}
                        </p>
                        <span className="ml-2">× {item.quantity}</span>
                        <p className="mb-0 font-weight-bold">
                          ${item.productId.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td>SubTotal:</td>
                  <td>
                    <b className="text-success-s2">${subTotalPrice}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">7</th>
                  <td>Shipping:</td>
                  <td>
                    <b className="text-success-s2">$5</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">9</th>
                  <td>Payment:</td>
                  <td>
                    <b>{paymentMethod}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">10</th>
                  <td
                    className="font-weight-bold"
                    style={{ fontSize: "1.1rem" }}
                  >
                    Total:
                  </td>
                  <td style={{ fontSize: "1.1rem" }}>
                    <b className="text-success-s2">${subTotalPrice + 5}</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="thank-you">
            <h6 className="text-success-s2">
              Thank you for being our valued customer. We hope you enjoy your
              experience and come back soon!
            </h6>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CheckoutModal;
