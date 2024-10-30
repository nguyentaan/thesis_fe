import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import mainBg from "../../assets/mainBackground.png";
import Footer from "./Footer";
import ProductsRender from "./ProductsRender";
import LoginModal from "./Login";
import { useParams } from "react-router-dom";
import { getSearchProducts } from "../../Slices/UserSlice";
import "../Users.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import { logout } from "../../Slices/AuthenSlice";

const Search = () => {
  const { keyword } = useParams(); // Get the keyword from the URL
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchInput, setSearchInput] = useState(keyword || ""); // Initialize with keyword if available
  const [searchResults, setSearchResults] = useState([]); // State to hold search results
  const [isLoading, setIsLoading] = useState(false); // State to manage loading status
  const [sessionContext, setSessionContext] = useState([]); // State to hold session context
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalResults, setTotalResults] = useState(0); // State for total results

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value); // Update search input state
  };

  const handleSearchSubmit = () => {
    if (searchInput.trim()) {
      const updatedSessionContext = [...sessionContext, searchInput];
      fetchSearchProducts(updatedSessionContext); // Call fetch function with updated context
    }
  };

  const fetchSearchProducts = async (updatedSessionContext, page) => {
    setIsLoading(true);
    try {
      const response = await dispatch(getSearchProducts({
        query: searchInput,
        session_context: updatedSessionContext,
        page,
        limit: 20 // Set limit here
      })).unwrap();
      setSearchResults(response?.refined_products || []);
      setSessionContext(updatedSessionContext);
      setCurrentPage(page); // Update current page
      setTotalResults(response?.total_results || 0); // Set total results for pagination
    } catch (error) {
      console.error("Failed to fetch search products:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) {
      setShowLoginModal(false);
      console.log("user data", user);
    }
  }, [isAuth, user]);

  useEffect(() => {
    if (searchInput) {
      fetchSearchProducts(sessionContext); // Fetch products if search input changes
    }
  }, [dispatch, searchInput, sessionContext]); // Now also depend on sessionContext


  // const noLoginCartNotification = () => {
  //   toast.error("Please login first to continue.", {
  //     position: toast.POSITION.TOP_CENTER,
  //   });
  // };

  const handlePageChange = (newPage) => {
    fetchSearchProducts(sessionContext, newPage); // Fetch products for the new page
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const Logout = () => {
    dispatch(logout());
    toast.success("Successfully logged out!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const comingSoonNotification = () => {
    toast.success("This feature will be coming soon. Stay tuned!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const closeLoginModal = (boolean) => {
    setShowLoginModal(boolean);
  };

  const picture = (image) => {
    return {
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
  };

  const totalPages = Math.ceil(totalResults / 20); // Calculate total pages

  const backgroundStyle = {
    // backgroundImage: `url(${mainBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  };

  return (
    <div
      style={{
        fontFamily: "Karla,sans-serif",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* start header - part1 */}
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
                        {`Hello, ${user?.data?.name}`}
                      </button>
                      <div className="dropdown-menu">
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
          <div className="form-group mt-5">
            <input
              type="text"
              className="search-box"
              placeholder="Search the fashion name that you want here"
              name="searchinput"
              value={searchInput} // Bind input value to state
              onChange={handleSearchInput}
              required
              onKeyPress={(event) =>
                event.key === "Enter" ? handleSearchSubmit() : null
              }
            />
            <button
              className="btn-search"
              type="button"
              id="button-addon2"
              onClick={handleSearchSubmit}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
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
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <ProductsRender
                dataProduct={{ products: searchResults, total: searchResults.length }} // Adjust as needed
                isProductLoading={isLoading}
              />
            )}
            <div className="pagination">
              <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div>
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
    </div>
  );
};

export default Search;
