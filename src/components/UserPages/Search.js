import React, { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import ProductsRender from "./ProductsRender";
import LoginModal from "./Login";
import { useParams } from "react-router-dom";
import {
  getSearchProducts,
  addSearchKeyword,
  updateSearchHistory,
} from "../../Slices/UserSlice";
import { logout } from "../../Slices/AuthenSlice";
import "../Users.css";
import "../Search.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
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

  const noLoginCartNotification = () => {
    toast.error("Please login first to continue.", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const Logout = () => {
    dispatch(logout());
    // setNavLoginSuccess(false);
    toast.success("Successfully logged out!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleSearchInput = useCallback((event) => {
    setSearchInput(event.target.value);
  }, []);

  const fetchSearchProducts = useCallback(
    async (updatedSessionContext, page = currentPage) => {
      setIsLoading(true);
      try {
        const response = await dispatch(
          getSearchProducts({
            query: searchInput,
            session_context: updatedSessionContext,
            page,
            limit: 20,
          })
        ).unwrap();

        setSearchResults(response || []);
        setCurrentPage(page);
        setTotalResults(response?.total_results || 0);
      } catch (error) {
        console.error("Failed to fetch search products:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, searchInput, currentPage]
  );

  const handleSearchSubmit = useCallback(async () => {
    if (searchInput.trim() && !sessionContext.includes(searchInput)) {
      const updatedSessionContext = [...sessionContext, searchInput];
      setSessionContext(updatedSessionContext);

      await fetchSearchProducts(updatedSessionContext); // Pass updated session context directly

      if (isAuth) {
        try {
          const response = await dispatch(
            addSearchKeyword({ query: searchInput, user_id: user?._id })
          ).unwrap();
          const newHistory = response.data;
          dispatch(updateSearchHistory(newHistory));
          setSearchHistory(newHistory);
        } catch (error) {
          console.error("Failed to add search keyword:", error);
        }
      }
    }
  }, [
    searchInput,
    sessionContext,
    fetchSearchProducts,
    dispatch,
    isAuth,
    user,
  ]);

  const handlePageChange = useCallback(
    (newPage) => {
      fetchSearchProducts(sessionContext, newPage);
    },
    [sessionContext, fetchSearchProducts]
  );

  const openLoginModal = () => setShowLoginModal(true);

  const closeLoginModal = (boolean) => setShowLoginModal(boolean);

  const handleLoginSuccess = () => setShowLoginModal(false);

  const totalPages = Math.ceil(totalResults / 20);

  useEffect(() => {
    if (isAuth) {
      setShowLoginModal(false);
    }
  }, [isAuth]);

  useEffect(() => {
    if (searchInput) {
      if (isAuth) {
        dispatch(addSearchKeyword({ query: searchInput, user_id: user?._id }))
          .unwrap()
          .then((response) => {
            dispatch(updateSearchHistory(response.data));
          })
          .catch((error) =>
            console.error("Failed to add search keyword:", error)
          );
      }
    }
  }, [dispatch, isAuth, searchInput, user?._id]);

  return (
    <div
      style={{ fontFamily: "Karla, sans-serif", backgroundColor: "#f8f9fa" }}
    >
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={logo} className="logo-fx" alt="Logo" />
          </a>
          <div className="form-group">
            <div className="search-box-container">
              <input
                type="text"
                className="search-box1"
                placeholder="Search the fashion name that you want here"
                name="searchinput"
                value={searchInput}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={handleSearchInput}
                required
                onKeyPress={(event) =>
                  event.key === "Enter" && handleSearchSubmit()
                }
              />
              <button
                className="btn-search1"
                type="button"
                onClick={handleSearchSubmit}
              >
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
          <div className="col-md-9">
            {isLoading ? (
              <div className="loading-spinner">Loading...</div>
            ) : (
              <>
                {/* Render rank_product_llm first with special styling */}
                {searchResults?.rank_product_llm?.length > 0 && (
                  <div className="rank-products-container">
                    <h2 className="highlighted-section-title">
                      Featured Products
                    </h2>
                    <ProductsRender
                      dataProduct={{
                        products: searchResults.rank_product_llm,
                        total: searchResults.rank_product_llm.length,
                      }}
                      isProductLoading={isLoading}
                    />
                  </div>
                )}

                {/* Render refined_products normally */}
                {searchResults?.refined_products?.length > 0 && (
                  <div className="refined-products-container">
                    <h2 className="standard-section-title">Refined Products</h2>
                    <ProductsRender
                      dataProduct={{
                        products: searchResults.refined_products,
                        total: searchResults.refined_products.length,
                      }}
                      isProductLoading={isLoading}
                    />
                  </div>
                )}
              </>
            )}

            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
