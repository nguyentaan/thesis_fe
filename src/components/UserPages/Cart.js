import React, { useEffect, useState } from "react";
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
import Loader from "./Loader";

const Cart = () => {
  const dispatch = useDispatch();
  const { dataCart = [], isCartLoading } = useSelector((state) => state.cart);
  const [subTotal, setSubTotal] = useState(0);

  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
  const shippingCost = 5;
  const total = subTotal + shippingCost;

  // Fetch cart data on component mount
  useEffect(() => {
    if (!userId) {
      console.error("User ID is missing, cannot fetch cart.");
      return;
    }
    dispatch(fetchCart(userId));
  }, [dispatch, userId]);

  // Recalculate subtotal whenever dataCart changes
  useEffect(() => {
    const totalAmount = dataCart.reduce(
      (acc, item) => acc + (item.productId.price * item.quantity || 0),
      0
    );
    setSubTotal(totalAmount);
  }, [dataCart]);

  // Handle quantity updates optimistically
  const handleQuantityChange = async (item, type) => {
    try {
      if (type === "increase") {
        await dispatch(
          increaseQuantity({
            userId,
            productId: item.productId._id,
            color: item.color,
          })
        );
      } else {
        await dispatch(
          decreaseQuantity({
            userId,
            productId: item.productId._id,
            color: item.color,
          })
        );
      }

      // Fetch updated cart data after action completes
      await dispatch(fetchCart(userId));
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={logo} className="logo-fx" alt="..." />
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mx-4">
                <h6 className="my-0 text-success-s2 d-flex">
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
              <th>PRODUCT</th>
              <th>NAME</th>
              <th>Color</th>
              <th>UNIT PRICE</th>
              <th>QUANTITY</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {isCartLoading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  <Loader isProductLoading={isCartLoading} />
                </td>
              </tr>
            ) : dataCart.length > 0 ? (
              dataCart.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div
                      className="w-75 text-center"
                      style={{
                        backgroundImage: `url(${item.productId.image_url})`,
                        height: "75px",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    />
                  </td>
                  <td>
                    <p className="my-0 text-secondary">{item.productId.name}</p>
                  </td>
                  <td>
                    <p className="my-0 text-secondary">{item.color}</p>
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <p className="my-0 text-secondary">
                      ${item.productId.price}
                    </p>
                  </td>
                  <td>
                    <div className="btn-group">
                      <button
                        onClick={() => handleQuantityChange(item, "decrease")}
                        className="btn btn-outline-success"
                        disabled={item.quantity === 0}
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
                        onClick={() => handleQuantityChange(item, "increase")}
                        className="btn btn-outline-success"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <h6 className="font-weight-bold text-secondary">
                      ${item.productId.price * item.quantity}
                    </h6>
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
                <div className="border-top d-flex py-3 px-3">
                  <h6 className="font-weight-bold my-0">Subtotal</h6>
                  <h6 className="ml-auto my-0">${subTotal}</h6>
                </div>
                <div className="border-top d-flex py-3 px-3">
                  <h6 className="font-weight-bold my-0">Shipping</h6>
                  <h6 className="ml-auto my-0">${shippingCost}</h6>
                </div>
                <div className="border-top d-flex py-3 px-3">
                  <h6 className="font-weight-bold my-0">Total</h6>
                  <h6 className="ml-auto my-0">${total}</h6>
                </div>
              </div>
              <div className="d-flex">
                {dataCart.length > 0 ? (
                  <Link className="btn btn-outline-success mt-4" to="/checkout">
                    PROCEED TO CHECKOUT
                  </Link>
                ) : (
                  <button className="btn btn-outline-secondary mt-4" disabled>
                    PROCEED TO CHECKOUT
                  </button>
                )}
                <Link to="/" className="btn btn-outline-primary mt-4 ml-auto">
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;
