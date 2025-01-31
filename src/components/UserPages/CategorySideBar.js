import React, { useState } from "react";
import "../CategorySidebar.css"; // Import CSS for styling

const CategorySidebar = ({ categories, onCategorySelect }) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Track the selected category

  // Check if categories is an array before applying .slice()
  const visibleCategories = Array.isArray(categories)
    ? showAll
      ? categories
      : categories.slice(0, 10)
    : []; // Return an empty array if categories is not an array

  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Update the selected category
    onCategorySelect(category); // Call the parent's function with the selected category
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Categories</h2>
      <ul className="category-list">
        {/* Default "All" category */}
        <li
          key="all"
          className={`category-item ${
            selectedCategory === "All" ? "selected" : ""
          }`}
          onClick={() => handleCategorySelect("All")}
        >
          All
        </li>

        {/* List of categories */}
        {visibleCategories.map((category, index) => (
          <li
            key={index}
            className={`category-item ${
              selectedCategory === category ? "selected" : ""
            }`}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </li>
        ))}
      </ul>

      {Array.isArray(categories) && categories.length > 10 && (
        <button className="view-more-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? "View Less" : "View More"}
        </button>
      )}
    </aside>
  );
};

export default CategorySidebar;
