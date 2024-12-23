import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { addSearchKeyword } from "../../Slices/UserSlice"; // Import the action
import "../Search.css";

const SearchDropdown = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

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
      // Dispatch to save the search keyword to the user's search history
      dispatch(
        addSearchKeyword({ query: searchInput, user_id: user?._id }) // Use the user ID from Redux
      );
      navigate(`/search/${encodeURIComponent(searchInput)}`);
    }
  }, [dispatch, navigate, searchInput, user]);

  // Handle search input changes
  const handleSearchInput = useCallback((event) => {
    const value = event.target.value;
    setSearchInput(value);
    setQuery(value);
    setIsOpen(true); // Open dropdown when typing
  }, []);

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
    setSearchInput(option);
    setQuery("");
    setIsOpen(false);
    if (user?.id) {
      // Dispatch addSearchKeyword when a suggestion is selected
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
  const filterSearchHistory = useCallback(() => {
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
          value={searchInput}
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
        <div ref={dropdownRef} className="search-dropdown">
          {filterSearchHistory().length > 0 ? (
            filterSearchHistory().map((historyItem, index) => (
              <div
                key={`history-item-${index}`}
                onClick={() => selectOption(historyItem)}
                className="search-dropdown-item"
              >
                {historyItem}
              </div>
            ))
          ) : (
            <div className="search-dropdown-empty">No items</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
