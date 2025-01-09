import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { logout, loginSuccess } from "../../Slices/AuthenSlice";
import "react-toastify/dist/ReactToastify.css";
import mainBg from "../../assets/mainBackground.png";
import logo from "../../assets/logo.png";
import Carousel from "./Carousel";
import ProductField from "./Products";
import LoginModal from "./Login";
import Footer from "./Footer";
import SearchComponent from "./SearchInput";
import Chatbot from "./chatbot";
import "../Users.css";

const Index = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [finalSearchQuery, setFinalSearchQuery] = useState(""); // State for submitted query

  useEffect(() => {
    if (isAuth) {
      setShowLoginModal(false);
    }
  }, [isAuth]);

  // Handle search submit when button is clicked
  const handleSearchSubmit = (query) => {
    setFinalSearchQuery(query); // Set the final query when search is clicked
  };

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
    dispatch(loginSuccess({ user: user }));
  };

  const Logout = () => {
    dispatch(logout());
    toast.success("Successfully logged out!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const picture = (image) => {
    return {
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  };
  return (
    <div
      style={{
        fontFamily: "Karla,sans-serif",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Chatbot />
      <div className="main-bg-height" style={picture(mainBg)}>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="/">
              <img src={logo} className="logo-fx" alt="..." />
            </a>
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

        <div className="vertical-center">
          <h1
            className="display-4 font-weight-bold text-center"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Shop your designer dresses
          </h1>
          <p className="text-center text-secondary">
            Ready to wear dresses tailored for you from online. Hurry up while
            stock lasts.
          </p>
          <SearchComponent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchSubmit={handleSearchSubmit}
          />
        </div>
      </div>
      {/* start header - part 1 */}

      {/* carousel-brochure */}
      <div className="container my-5">
        <Carousel />
      </div>
      {/* carousel-brochure */}

      {/* part 3 - content */}
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-9">
            <h2 className="font-weight-bold">Our Products</h2>
            <ProductField searchQuery={finalSearchQuery} />
          </div>
        </div>
      </div>
      {/* part 3 - content */}

      {/* Footer */}
      <hr className="horizontal-line" />
      <Footer />
      {/* Modals */}
      <LoginModal
        showLoginModal={showLoginModal}
        closeLoginModal={closeLoginModal}
        onLoginSuccess={handleLoginSuccess} // Pass the callback here
      />
      {/* Modals */}
    </div>
  );
};
export default Index;
