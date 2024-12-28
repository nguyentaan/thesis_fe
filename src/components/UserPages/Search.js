import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import LoginModal from "./Login";
import { logout, loginSuccess } from "../../Slices/AuthenSlice";
import "../Users.css";
import "../Search.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Search = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (isAuth) {
      setShowLoginModal(false);
    }
  }, [isAuth]);

  const noLoginCartNotification = () => {
    toast.error("Please login first to continue.", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = (boolean) => {
    setShowLoginModal(boolean);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    // Optionally, handle additional logic for the logged-in user
    // console.log(user?.data); // Access user data after login// Save user info
    dispatch(loginSuccess({ user: user }));
  };

  const Logout = () => {
    dispatch(logout());
    // setNavLoginSuccess(false);
    toast.success("Successfully logged out!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div
      style={{ fontFamily: "Karla, sans-serif", backgroundColor: "#f8f9fa" }}
      className="search-page"
    >
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={logo} className="logo-fx" alt="Logo" />
          </a>
          <div className="search-container">
          </div>
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
              {isAuth ? (
                <Link to="/cart" style={{ textDecoration: "none" }}>
                  <li className="nav-item">
                    <button className="btn btn-success d-flex d-row">
                      <i className="fas fa-shopping-cart align-self-center mr-2" />
                      <p className="my-0">Cart</p>
                    </button>
                  </li>
                </Link>
              ) : (
                <li className="nav-item">
                  <button
                    onClick={() => noLoginCartNotification()}
                    className="btn btn-secondary d-flex d-row"
                  >
                    <i className="fas fa-shopping-cart align-self-center mr-2" />
                    <p className="my-0">Cart </p>
                  </button>
                </li>
              )}

              <li className="nav-item mx-4">
                {isAuth ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-success dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {`Hello, ${user.name}`}
                    </button>
                    <div className="dropdown-menu t45">
                      <Link
                        to={`/userorders`} // Ensure the path is correct
                        className="dropdown-item text-danger"
                      >
                        My Orders <i className="fas fa-box-open"></i>
                      </Link>
                      <button
                        className="dropdown-item text-danger"
                        onClick={Logout}
                      >
                        Logout <i className="fas fa-sign-out-alt"></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={openLoginModal}
                    className="btn btn-success"
                  >
                    Sign In <i className="fas fa-sign-in-alt ml-2"></i>
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <ToastContainer />

      <div className="container mt-5 pt-5">
        <div className="row mb-5">
          <div className="col-md-9"></div>
        </div>
      </div>
      <hr className="horizontal-line" />
      <Footer />
      <LoginModal
        showLoginModal={showLoginModal}
        closeLoginModal={closeLoginModal}
        onLoginSuccess={handleLoginSuccess} // Pass the callback here
      />
    </div>
  );
};

export default Search;
