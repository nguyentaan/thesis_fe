import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Slices/AuthenSlice";
import "react-toastify/dist/ReactToastify.css";
import mainBg from "../../assets/mainBackground.png";
import logo from "../../assets/logo.png";
import Footer from "./Footer";
import Carousel from "./Carousel";
import ProductField from "./Products";
import LoginModal from "./Login";
import { useNavigate } from 'react-router-dom';
import SearchDropdown from "./SearchDropdown";
import "../Users.css";

const Index = (props) => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);
  // const [NavLoginSuccess, setNavLoginSuccess] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [submitSearch, setSubmitSearch] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState(""); // Used for managing dropdown state

  useEffect(() => {
    if (isAuth) {
      setShowLoginModal(false);
      console.log("user", user);

    }
  }, [isAuth, user]);

  const noLoginCartNotification = () => {
    toast.error("Please login first to continue.", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const comingSoonNotification = () => {
    toast.success("This Feature will coming soon, Stay tune!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value); // Update search input state
  };

  const handleSearchSubmit = () => {
    if (searchInput.trim()) {
      navigate(`/search/${encodeURIComponent(searchInput)}`);
    }
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
    // cause warning but needed to stop logout alert shows 2 times.
  };

  const closeLoginModal = (boolean) => {
    setShowLoginModal(boolean);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    // Optionally, handle additional logic for the logged-in user
    console.log(user?.data); // Access user data after login
  };


  const Logout = () => {
    dispatch(logout());
    // setNavLoginSuccess(false);
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

          <SearchDropdown
            options={user?.search_history || []}
            id="id"
            selectedVal={value}
            handleChange={setValue}
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
          {/* Sidebar */}
          <div className="col-md-3 mt-3">
            <div className="list-group">
              <button
                onClick={comingSoonNotification}
                type="button"
                className="list-group-item list-group-item-action d-flex d-row mb-2"
              >
                Face
              </button>
              <button
                onClick={comingSoonNotification}
                type="button"
                className="list-group-item list-group-item-action d-flex d-row mb-2"
              >
                Eyes
              </button>
              <button
                onClick={comingSoonNotification}
                type="button"
                className="list-group-item list-group-item-action d-flex d-row mb-4"
              >
                Lips
              </button>
              <button
                onClick={comingSoonNotification}
                type="button"
                className="list-group-item list-group-item-action d-flex d-row mb-2"
              >
                Accessories
              </button>
              <button
                onClick={comingSoonNotification}
                type="button"
                className="list-group-item list-group-item-action d-flex d-row mb-2"
              >
                Shaving Needs
              </button>
            </div>
          </div>
          {/* Sidebar */}

          <div className="col-md-9">
            <ProductField
              searchInput={searchInput}
              submitSearch={submitSearch}
            />
          </div>
        </div>
      </div>
      {/* part 3 - content */}

      {/* Footer */}
      <hr className="horizontal-line" />
      <Footer />
      {/* Footer */}

      {/* Modals */}
      <LoginModal
        showLoginModal={showLoginModal}
        closeLoginModal={closeLoginModal}
        onLoginSuccess={handleLoginSuccess} // Pass the callback here
      />
      {/* Modals */}
    </div >
  );
};
export default Index;
