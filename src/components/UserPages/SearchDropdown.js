import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../Search.css";

const SearchDropdown = ({
  options = [],
  id = "dropdown",
  selectedVal = "",
  handleChange = () => {},
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Handle search submit
  const handleSearchSubmit = useCallback(() => {
    if (searchInput.trim()) {
      navigate(`/search/${encodeURIComponent(searchInput)}`);
    }
  }, [searchInput, navigate]);

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
    setQuery("");
    handleChange(option);
    setSearchInput(option);
    setIsOpen(false);
  };

  // Filter options based on the search query
  const filterOptions = useCallback(() => {
    return options.filter((option) =>
      option.toLowerCase().includes(query.toLowerCase())
    );
  }, [options, query]);

  // Handle Enter key press
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        handleSearchSubmit();
      }
    },
    [handleSearchSubmit]
  );

  if (!options) return null;

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
          {filterOptions().length > 0 ? (
            filterOptions().map((option, index) => (
              <div
                key={`${id}-${index}`}
                onClick={() => selectOption(option)}
                className={`search-dropdown-item ${
                  option === selectedVal ? "active" : ""
                }`}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="search-dropdown-empty">No matches found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
