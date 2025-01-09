import React from "react";
import "../Search.css";

const SearchComponent = ({ searchQuery, setSearchQuery, onSearchSubmit }) => {
  // Handle the input change and update the search query
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle submitting a search
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery); // Trigger the search action here
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="search-input"
      />
      <button onClick={handleSearchSubmit} className="search-btn">
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
