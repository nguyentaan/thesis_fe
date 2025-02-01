import React, { useState } from "react";
import "../CategorySidebar.css"; // Import CSS for styling

const CategorySidebar = ({
  categories,
  onCategorySelect,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [showAll, setShowAll] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Update the selected category state
    onCategorySelect(category === "All" ? null : category);
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Categories</h2>
      <ul className="category-list">
        <li
          key="all"
          className={`category-item ${
            selectedCategory === "All" ? "selected" : ""
          }`}
          onClick={() => handleCategorySelect("All")}
        >
          All
        </li>

        {Array.isArray(categories) &&
          (showAll ? categories : categories.slice(0, 10)).map(
            (category, index) => (
              <li
                key={index}
                className={`category-item ${
                  selectedCategory === category ? "selected" : ""
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </li>
            )
          )}
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
