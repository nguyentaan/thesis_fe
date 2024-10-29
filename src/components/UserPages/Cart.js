import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Users.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../Slices/CartSlice";

const Cart = ({ removeItem }) => {
  const dispatch = useDispatch();
  const {
    dataCart = [],
    cartTotal,
    isCartLoading,
    error,
  } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.auth);
  const userId = user.data._id;

  // Fetch the cart when the component mounts
  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [dispatch, userId]);

  if (isCartLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleIncreaseQty = (item) => {
    dispatch(increaseQuantity({ userId, productId: item.productId._id }));
  };

  const handleDecreaseQty = (item) => {
    dispatch(decreaseQuantity({ userId, productId: item.productId._id }));
  };

  return (
    <div>
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
                  <p className="text-success-s2 my-0">/ CART PAGE</p>
                </h6>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container" style={{ marginTop: "6rem" }}>
        <table className="table">
          <thead style={{ backgroundColor: "#009e7f", color: "white" }}>
            <tr>
              <th scope="col">PRODUCT</th>
              <th scope="col">NAME</th>
              <th scope="col">SIZE</th>
              <th scope="col">UNIT PRICE</th>
              <th scope="col">QUANTITY</th>
              <th scope="col">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {dataCart.length !== 0 ? (
              dataCart.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div
                      className="w-75 text-center"
                      style={{
                        backgroundImage: `url(${item.productId.images[0]})`,
                        height: "75px",
                        backgroundSize: "cover",
                      }}
                    />
                  </td>
                  <td>
                    <p className="my-0 text-secondary">{item.productId.name}</p>
                  </td>
                  <td>
                    <p className="my-0 text-secondary">{item.size}</p>
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <p className="my-0 text-secondary">
                      ${item.productId.price}
                    </p>
                  </td>
                  <td>
                    <div className="btn-group" role="group" aria-label="...">
                      <button
                        onClick={() => handleDecreaseQty(item)}
                        className="btn btn-outline-success"
                      >
                        -
                      </button>
                      <p
                        className="btn my-0 text-success-s2"
                        style={{ borderColor: "#009e7f", cursor: "default" }}
                      >
                        <b>{item.quantity}</b>
                      </p>
                      <button
                        onClick={() => handleIncreaseQty(item)}
                        className="btn btn-outline-success"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex d-row">
                      <h6 className="font-weight-bold text-secondary align-self-center my-0">
                        ${item.productId.price * item.quantity}
                      </h6>
                      <button
                        className="btn trash-cart-btn ml-2"
                        onClick={() => removeItem(item)}
                      >
                        <i className="far fa-trash-alt fa-sm"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  <h3 className="my-0 text-secondary">
                    The cart is still empty, let's search something cool in the
                    shop!
                  </h3>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div style={{ margin: "4rem 16rem" }}>
          <div className="card shadow-subtotal-fx">
            <div className="card-body p-5">
              <h5 className="font-weight-bold mb-4">Cart Totals</h5>
              <div className="border border-top-0">
                <div className="border-top d-flex d-row py-3 px-3">
                  <h6 className="font-weight-bold my-0">Subtotal</h6>
                  <h6 className="ml-auto my-0">${cartTotal}</h6>
                </div>
                <div className="border-top d-flex d-row py-3 px-3">
                  <h6 className="font-weight-bold my-0">Shipping</h6>
                  <h6 className="ml-auto my-0">$5</h6>
                </div>
                <div className="border-top d-flex d-row py-3 px-3">
                  <h6 className="font-weight-bold my-0">Total</h6>
                  <h6 className="ml-auto my-0">${cartTotal + 5}</h6>
                </div>
              </div>
              <div className="d-flex">
                <div>
                  {dataCart.length !== 0 ? (
                    <Link
                      className="btn btn-outline-success mt-4"
                      to="/checkout"
                    >
                      PROCEED TO CHECKOUT <i className="fas fa-print"></i>
                    </Link>
                  ) : (
                    <button className="btn btn-outline-secondary mt-4" disabled>
                      PROCEED TO CHECKOUT <i className="fas fa-print"></i>
                    </button>
                  )}
                  <ToastContainer />
                </div>
                <Link to="/" className="btn btn-outline-primary mt-4 ml-auto">
                  CONTINUE SHOPPING <i className="fas fa-shopping-cart"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
