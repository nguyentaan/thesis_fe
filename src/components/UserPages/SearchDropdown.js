import { useEffect, useRef, useState } from "react";
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
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleSearchSubmit = () => {
    if (searchInput.trim()) {
      navigate(`/search/${encodeURIComponent(searchInput)}`);
    }
  };

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
    setQuery(event.target.value);
    setIsOpen(true); // Open dropdown when typing
  };

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

  const selectOption = (option) => {
    setQuery("");
    handleChange(option);
    setSearchInput(option);
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const getDisplayValue = () => {
    return query || selectedVal || "";
  };

  const filter = (options) => {
    return options.filter((option) =>
      option?.toLowerCase().includes(query.toLowerCase())
    );
  };

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
          onClick={toggle}
          required
          autoComplete="off" 
          onKeyPress={(event) => event.key === "Enter" && handleSearchSubmit()}
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
          className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg max-h-52 overflow-y-auto z-50 mt-1"
          style={{ maxHeight: '200px' }} // Adjust height to fit approximately 5 items
        >
          {filter(options).map((option, index) => (
            <div
              onClick={() => selectOption(option)}
              className={`p-2 px-4 cursor-pointer ${option === selectedVal
                  ? "bg-indigo-100 text-gray-900"
                  : "hover:bg-indigo-100 hover:text-gray-900"
                }`}
              key={`${id}-${index}`}
            >
              {option}
            </div>
          ))}
        </div>
      )}


    </div>
  );
};

export default SearchDropdown;
