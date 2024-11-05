import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../assets/logo.png";
// import { fetchCart } from "../../Slices/CartSlice";
import CheckoutModal from "./CheckoutModal";
import "../Checkout.css";
import { useDispatch, useSelector } from "react-redux";
import { createOrderFromCart } from "../../Slices/OrderSlice";

const Checkout = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const { dataCart } = useSelector((state) => state.cart);
  const [subTotal, setSubTotal] = useState(0);
  const [orderDetails, setOrderDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    paymentMethod: "Direct Bank Transfer",
  });
  const total = subTotal + 5;
  const { user } = useSelector((state) => state.auth);
  const userId = user.data._id;

  const handleShowModal = () => setShowCheckoutModal(true);
  const handleCloseModal = () => {
    setShowCheckoutModal(false);
    navigate("/"); // Redirect to home page after successful order
  };

  useEffect(() => {
    setSubTotal(
      dataCart.reduce((total, item) => {
        // Use parsePrice to sanitize and parse each item price
        const itemPrice = parsePrice(item.productId.price);
        return total + itemPrice * item.quantity;
      }, 0)
    );
  }, [dataCart]);

  // Enhanced parsePrice function to handle different invalid cases
  const parsePrice = (price) => {
    if (price == null || price === "" || typeof price !== "string") return 0; // Handle null, undefined, or non-string values

    // Use regex to find the first valid number in the string, like "17.50" in "$Now 17.50"
    const match = price.match(/(\d+(\.\d+)?)/);
    const sanitizedPrice = match ? parseFloat(match[0]) : 0;

    return sanitizedPrice;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, address, phoneNumber, paymentMethod } =
      orderDetails;
    if (!firstName || !lastName || !address || !phoneNumber) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await dispatch(
        createOrderFromCart({
          userId: userId, // Replace with actual user ID
          paymentMethod,
          shipping_address: address,
          fullName: `${firstName} ${lastName}`,
          phoneNumber,
        })
      );
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    }
  };
  console.log("orderDetails", orderDetails);

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
        <form onSubmit={handleSubmit}>
          <div className="row jc-c">
            <div className="col-md-5 pr-3">
              <div className="checkout-div-1">
                <h4 className="font-weight-bold text-success-s2 mb-4">
                  BILLING DETAILS
                </h4>

                <div className="form-group1">
                  <p className="checkout-txt">
                    First Name <span className="text-danger">*</span>
                  </p>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="First Name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group1">
                  <p className="checkout-txt">
                    Last Name <span className="text-danger">*</span>
                  </p>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Last Name"
                    onChange={handleChange}
                    required
                  />
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                  {dataCart && dataCart.length > 0 ? (
                    dataCart.map((item) => (
                      <div
                        key={item.productId._id}
                        className="d-flex justify-content-between"
                      >
                        <div className="df fd-r mg-b-5">
                          <div
                            className=" text-center"
                            style={{
                              backgroundImage: `url(${item.productId.images[0]})`,
                              height: "75px",
                              width: "75px",
                              backgroundSize: "contain",
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                          <p>{item.productId.name}</p>{" "}
                        </div>
                        {/* Assumes each item has product details under productId */}
                        <p>${item.productId.price}</p>{" "}
                        {/* Adjust according to where price is stored */}
                      </div>
                    ))
                  ) : (
                    <h6 className="my-0">
                      It seems you've just reloaded this page, try to reopen
                      this website.
                    </h6>
                  )}
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
                        ${subTotal}
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
                        ${total}
                      </h5>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="exampleRadios1"
                      value="Direct Bank Transfer"
                      onChange={handleChange}
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
                      name="paymentMethod"
                      id="exampleRadios1"
                      value="Cash on Delivery"
                      onChange={handleChange}
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
                  onClick={handleShowModal} // Show modal on click
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
        unDisplayCheckoutModal={handleCloseModal}
        // userData={userData}
        subTotalPrice={subTotal}
        dataInputCheckout={orderDetails}
        dataCart={dataCart}
      />
    </div>
  );
};

export default Checkout;
