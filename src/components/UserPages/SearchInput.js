import React from "react";
import "../Search.css";

const SearchComponent = ({ searchQuery, setSearchQuery, onSearchSubmit }) => {
  // Handle the input change and update the search query
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the state on input change
  };

  // Handle submitting a search
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery); // Trigger the search when button is clicked
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange} // Only updates the query on typing
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
