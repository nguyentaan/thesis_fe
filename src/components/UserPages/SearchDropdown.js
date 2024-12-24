import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import {
  addSearchKeyword,
  removeSearchHistoryItem,
  clearAllSearchHistory,
  setSearchQuery
} from "../../Slices/UserSlice"; // Import the action
import "../Search.css";

const SearchDropdown = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const {searchQuery} = useSelector((state) => state.user); // Get the search query from Redux store
  const [searchInput, setSearchInput] = useState(searchQuery); // Local state for search input
  // const [searchHistoryLocal, setSearchHistoryLocal] = useState([]); // Local state for search history

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Dispatch hook for Redux actions
  const { user } = useSelector((state) => state.auth); // Get the user info from Redux store

  // If the user is logged in, get the search history from the user object
  const searchHistory = useMemo(() => user?.search_history || [], [user]);


  // Handle search submit
  const handleSearchSubmit = useCallback(() => {
    if (searchInput.trim()) {
      dispatch(addSearchKeyword({ query: searchInput, user_id: user?._id }));
      navigate(`/search/${encodeURIComponent(searchInput)}`);
    }
  }, [dispatch, navigate, searchInput, user]);

  const handleDeleteHistoryItem = (historyItem) => {
    if (user?._id) {
      dispatch(
        removeSearchHistoryItem({ query: historyItem, user_id: user?._id }) // Use the user ID from Redux
      );
    }
  };

  const handleClearAllHistory = () => {
    if (user?._id) {
      dispatch(clearAllSearchHistory({ user_id: user?._id })); // Use the user ID from Redux
    }
  };

  // Handle search input changes
  const handleSearchInput = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    setQuery(value);
    setIsOpen(true); // Open dropdown when typing
    dispatch(setSearchQuery(event.target.value)); // Sync with Redux
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Select an option from the dropdown
  const selectOption = (option) => {
    setSearchInput(option); // Set the input to the selected option
    setQuery(""); // Clear query state
    setIsOpen(false);
    if (user?.id) {
      dispatch(addSearchKeyword({ query: option, user_id: user.id }));
    }
    navigate(`/search/${encodeURIComponent(option)}`);
  };

  // Handle Enter key press
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        handleSearchSubmit();
      }
    },
    [handleSearchSubmit]
  );

  // Filter search history based on the search query
  const filteredSearchHistory = useMemo(() => {
    return searchHistory.filter((historyItem) =>
      historyItem.toLowerCase().includes(query.toLowerCase())
    );
  }, [searchHistory, query]);

  return (
    <div className="search-container-content">
      <div className="search-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search the fashion name that you want here"
          name="searchinput"
          value={searchInput} // React keeps input value in sync with state
          onChange={handleSearchInput}
          onClick={() => setIsOpen(true)}
          onKeyPress={handleKeyPress}
          required
          autoComplete="off"
        />

        <button
          className="search-button"
          type="button"
          id="button-addon2"
          onClick={handleSearchSubmit}
        >
          <i className="fas fa-search"></i>
        </button>
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="search-dropdown"
          aria-live="assertive"
          role="listbox"
        >
          {filteredSearchHistory.length > 0 ? (
            <>
              {filteredSearchHistory.map((historyItem, index) => (
                <div
                  key={`history-item-${index}`}
                  className="search-dropdown-item"
                >
                  <span onClick={() => selectOption(historyItem)}>
                    {historyItem}
                  </span>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteHistoryItem(historyItem)}
                  >
                    ✖
                  </button>
                </div>
              ))}
              {/* "Clear All" button displayed once at the bottom */}
              <div className="clear-all">
                <button
                  onClick={handleClearAllHistory}
                  className="clear-all-button"
                >
                  Clear All
                </button>
              </div>
            </>
          ) : (
            <div className="search-dropdown-empty">No items</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
