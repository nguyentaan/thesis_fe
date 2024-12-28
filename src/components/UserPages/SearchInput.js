import React, { useState } from "react";
import '../Search.css';

const SearchComponent = () => {
  // State to hold the search query and search history
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  // Handle the input change and update the search query
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle submitting a search (you could trigger any search logic here)
  const handleSearchSubmit = () => {
    if (searchQuery.trim() && !searchHistory.includes(searchQuery)) {
      setSearchHistory([searchQuery, ...searchHistory]); // Add to history
    }
  };

  // Handle when a user clicks a search history item
  const handleHistoryClick = (query) => {
    setSearchQuery(query); // Set the clicked query as the search query
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

      {/* Display search history */}
      {searchHistory.length > 0 && (
        <div className="search-history">
          <ul>
            {searchHistory.map((query, index) => (
              <li key={index} onClick={() => handleHistoryClick(query)}>
                {query}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
