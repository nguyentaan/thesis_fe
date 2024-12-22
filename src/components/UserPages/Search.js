import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import mainBg from "../../assets/mainBackground.png";
import Footer from "./Footer";
import ProductsRender from "./ProductsRender";
import LoginModal from "./Login";
import { useParams } from "react-router-dom";
import { getSearchProducts, addSearchKeyword, updateSearchHistory } from "../../Slices/UserSlice";
import "../Users.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import { logout } from "../../Slices/AuthenSlice";

const Search = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchInput, setSearchInput] = useState(keyword || "");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionContext, setSessionContext] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = async () => {
    if (searchInput.trim()) {
      if (!sessionContext.includes(searchInput)) {
        setSessionContext((prev) => [...prev, searchInput]);
      }

      await fetchSearchProducts(sessionContext);

      if (isAuth) {
        try {
          const response = await dispatch(addSearchKeyword({ query: searchInput, user_id: user?.data?._id })).unwrap();
          const newHistory = response.data;
          dispatch(updateSearchHistory(newHistory));
          setSearchHistory(newHistory);
        } catch (error) {
          console.error("Failed to add search keyword:", error);
        }
      }
    }
  };

  const fetchSearchProducts = async (updatedSessionContext, page = currentPage) => {
    setIsLoading(true);
    try {
      const response = await dispatch(getSearchProducts({
        query: searchInput,
        session_context: updatedSessionContext,
        page,
        limit: 20,
      })).unwrap();

      setSearchResults(response?.refined_products || []);
      console.log("fetchSearchProducts -> response", searchResults)
      setCurrentPage(page);
      setTotalResults(response?.total_results || 0);
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
    }
  }, [isAuth, user]);

  useEffect(() => {
    if (searchInput) {
      if (isAuth) {
        dispatch(addSearchKeyword({ query: searchInput, user_id: user?.data?._id }))
          .unwrap()
          .then((response) => {
            dispatch(updateSearchHistory(response.data));
          })
          .catch((error) => console.error("Failed to add search keyword:", error));
      }
    }
  }, [dispatch, isAuth, sessionContext, searchInput]);

  const handlePageChange = (newPage) => {
    fetchSearchProducts(sessionContext, newPage);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleLogout = () => {
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

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
  };

  const totalPages = Math.ceil(totalResults / 20);


  return (
    <div style={{ fontFamily: "Karla,sans-serif", backgroundColor: "#f8f9fa", height: "100vh", }}>
      <div className="">
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="/">
              <img src={logo} className="logo-fx" alt="Logo" />
            </a>
            <div className="vertical-center">
              <div className="form-group mt-5">
                <input
                  type="text"
                  className="search-box"
                  placeholder="Search the fashion name that you want here"
                  name="searchinput"
                  value={searchInput}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={handleSearchInput}
                  required
                  onKeyPress={(event) => event.key === "Enter" && handleSearchSubmit()}
                />
                <button className="btn-search" type="button" id="button-addon2" onClick={handleSearchSubmit}>
                  <i className="fas fa-search"></i>
                </button>
              </div>
              {isFocused && searchHistory?.length > 0 && (
                <div className="search-history-dropdown">
                  {searchHistory?.map((keyword, index) => (
                    <div
                      key={index}
                      className="search-history-item"
                      onMouseDown={() => setSearchInput(keyword)}
                    >
                      {keyword}
                    </div>
                  ))}
                </div>
              )}
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
                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                          Logout <i className="fas fa-sign-out-alt"></i>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button type="button" onClick={openLoginModal} className="btn btn-success">
                      Sign In <i className="fas fa-sign-in-alt ml-2"></i>
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <ToastContainer />
      </div>

      {/* Products Section */}
      <div className="container">
        <div className="row mb-5">
          {/* Products Render */}
          <div className="col-md-9">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <ProductsRender
                dataProduct={{ products: searchResults, total: searchResults.length }}
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

      {/* Footer */}
      <Footer />
      {showLoginModal && <LoginModal onClose={closeLoginModal} onSuccess={handleLoginSuccess} />}
    </div>
  );
};

export default Search;