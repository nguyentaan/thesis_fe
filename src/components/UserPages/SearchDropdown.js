import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import "../Users.css";

const SearchDropdown = ({
  options = [],
  id = "dropdown",
  selectedVal = "",
  handleChange = () => { }
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
    <div className="relative cursor-default">
      <div className="form-group relative w-full">
        <input
          ref={inputRef}
          type="text"
          className="search-box"
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
          className="btn-search"
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
          className="dropdown-menu absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg max-h-52 overflow-y-auto z-50 mt-1"
          style={{ maxHeight: "200px", display: "block" }} // Ensure visibility
        >
          {filterOptions().length > 0 ? (
            filterOptions().map((option, index) => (
              <div
                key={`${id}-${index}`}
                onClick={() => selectOption(option)}
                className={`dropdown-item p-2 px-4 cursor-pointer ${
                  option === selectedVal
                    ? "selected"
                    : "hover:bg-indigo-100 hover:text-gray-900"
                }`}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="p-2">No matches found</div> // Display a message if no options
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
