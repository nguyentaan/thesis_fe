import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../assets/logo.png";

import CheckoutModal from "./CheckoutModal";
import "../Checkout.css";

const Checkout = (props) => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  // const [dataInputCheckout, setDataInputCheckout] = useState({
  //   firstName: "",
  //   lastName: "",
  //   emailAddress: "",
  //   country: "",
  //   city: "",
  //   address: "",
  //   phoneNumber: "",
  //   postalCode: "",
  //   payment: "Direct Bank Transfer",
  // });

  // const unavailableAlert = () =>
  //   toast.error(
  //     "Sorry,for now we are unavailable for direct bank transfer. You can try with cash on delivery.",
  //     {
  //       position: toast.POSITION.TOP_CENTER,
  //       autoClose: 6000,
  //     }
  //   );

  return (
    <div
      style={{
        fontFamily: "Karla,sans-serif",
        backgroundColor: "#f8f9fa",
      }}
    >
      <ToastContainer />
      <nav
        id="top"
        className="navbar fixed-top navbar-expand-lg navbar-light bg-light"
      >
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={logo} className="logo-fx" alt="..." />
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
                  <p className="text-success-s2 my-0">/ CHECKOUT PAGE</p>
                </h6>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div style={{ paddingTop: "5rem" }} className="mx-5">
        <form>
          <div className="row">
            <div className="col-md-7 pr-3">
              <div className="checkout-div-1">
                <h4 className="font-weight-bold text-success-s2 mb-4">
                  BILLING DETAILS
                </h4>

                <div className="form-row">
                  <div className="form-group1 col-md-6 pr-3">
                    <p className="checkout-txt">
                      First Name <span className="text-danger">*</span>
                    </p>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="First Name"
                      // onChange={handleInputCheckoutChange}
                      required
                    />
                  </div>
                  <div className="form-group1 col-md-6 pl-3">
                    <p className="checkout-txt">
                      Last Name <span className="text-danger">*</span>
                    </p>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Last Name"
                      // onChange={handleInputCheckoutChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group1">
                  <p className="checkout-txt">
                    Email Address <span className="text-danger">*</span>
                  </p>
                  <input
                    type="text"
                    name="emailAddress"
                    className="form-control"
                    placeholder="Email address"
                    // onChange={handleInputCheckoutChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group1 col-md-6 pr-3">
                    <p className="checkout-txt">
                      Country <span className="text-danger">*</span>
                    </p>
                    <input
                      type="text"
                      name="country"
                      className="form-control"
                      placeholder="Country"
                      // onChange={handleInputCheckoutChange}
                      required
                    />
                  </div>
                  <div className="form-group1 col-md-6 pl-3">
                    <p className="checkout-txt">
                      Town/City <span className="text-danger">*</span>
                    </p>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      placeholder="Town/City"
                      // onChange={handleInputCheckoutChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group1">
                  <p className="checkout-txt">
                    Address <span className="text-danger">*</span>
                  </p>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="Address"
                    // onChange={handleInputCheckoutChange}
                    required
                  />
                </div>
                <div className="form-group1">
                  <p className="checkout-txt">
                    Phone Number <span className="text-danger">*</span>
                  </p>
                  <input
                    type="number"
                    name="phoneNumber"
                    className="form-control"
                    placeholder="Phone Number"
                    // onChange={handleInputCheckoutChange}
                    required
                  />
                </div>
                <div className="form-group1">
                  <p className="checkout-txt">
                    Postal Code <span className="text-danger">*</span>
                  </p>
                  <input
                    type="text"
                    name="postalCode"
                    className="form-control"
                    placeholder="Postal Code"
                    // onChange={handleInputCheckoutChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-md-5 pl-5">
              <div className="checkout-div-2 ">
                <h4 className="font-weight-bold text-center text-success-s2 mb-4">
                  YOUR ORDER
                </h4>
                <div className="mx-1">
                  <div className="row">
                    <div className="col-md-7">
                      <h5 className="text-success-s2 my-0 font-weight-bold">
                        Product
                      </h5>
                    </div>
                    <div className="col-md-5 pl-0">
                      <h5 className="text-success-s2 my-0 text-right font-weight-bold">
                        Subtotal
                      </h5>
                    </div>
                  </div>
                </div>

                <hr
                  className="w-100 my-2"
                  style={{ borderTop: "2px solid #009e7f" }}
                />

                <div className="mx-1 mb-4">
                  <div>
                    <h6 className="my-0">
                      It seems you've just reloaded this page, try to reopen
                      this website.
                    </h6>
                  </div>
                </div>

                <hr
                  className="w-100 my-2"
                  style={{ borderTop: "2px solid #009e7f" }}
                />

                <div className="mx-1">
                  <div className="row">
                    <div className="col-md-7">
                      <p className="text-success-s2 my-0 font-weight-bold">
                        Subtotal
                      </p>
                      <p className="text-success-s2 mb-0 mt-2 font-weight-bold">
                        Shipping
                      </p>
                    </div>
                    <div className="col-md-5 pl-0 text-right">
                      <p className="text-success-s2 my-0 font-weight-bold">
                        ${props.subTotalPrice}
                      </p>
                      <p className="text-success-s2 mb-0 mt-2 font-weight-bold">
                        $5
                      </p>
                    </div>
                  </div>
                </div>

                <hr
                  className="w-100 my-2"
                  style={{ borderTop: "2px solid #009e7f" }}
                />

                <div className="mx-1 mt-3">
                  <div className="row">
                    <div className="col-md-7">
                      <h5 className="text-success-s2 my-0 font-weight-bold">
                        TOTAL
                      </h5>
                    </div>
                    <div className="col-md-5 pl-0 text-right">
                      <h5 className="text-success-s2 my-0 font-weight-bold">
                        ${props.subTotalPrice + 5}
                      </h5>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment"
                      id="exampleRadios1"
                      value="Direct Bank Transfer"
                      // onChange={handleInputCheckoutChange}
                    />
                    <label
                      className="form-check-label font-weight-bold"
                      htmlFor="exampleRadios1"
                    >
                      Direct Bank Transfer
                    </label>
                    <div>
                      <p style={{ fontSize: "0.9rem" }}>
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        won’t be shipped until the funds have cleared in our
                        account.
                      </p>
                    </div>
                  </div>

                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment"
                      id="exampleRadios1"
                      value="Cash on Delivery"
                      // onChange={handleInputCheckoutChange}
                    />
                    <label
                      className="form-check-label font-weight-bold"
                      htmlFor="exampleRadios1"
                    >
                      Cash On Delivery
                    </label>
                    <div>
                      <p style={{ fontSize: "0.9rem" }}>
                        Pay with cash upon delivery.
                      </p>
                    </div>
                  </div>

                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                      required
                    />
                    <label
                      style={{ fontSize: "0.75rem" }}
                      className="form-check-label "
                      htmlFor="exampleCheck1"
                    >
                      I have read and agree to the website{" "}
                      <b className="text-success-s2">terms and conditions</b>
                      <span className="text-danger h6 my-0">*</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 py-3 mt-4"
                  style={{ borderRadius: "0" }}
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <CheckoutModal
        showCheckoutModal={showCheckoutModal}
        subTotalPrice={props.subTotalPrice}
      />
    </div>
  );
};

export default Checkout;
