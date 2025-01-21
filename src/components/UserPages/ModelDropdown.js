import React, { useState } from "react";
import PropTypes from "prop-types"; // For prop type validation
import "../ModelDropdown.css";

const ModelDropdown = ({ onModelSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Mistral"); // Default model

  // List of available LLM models
  const llmModels = [
    // "GPT-3.5", 
    "LLaMA", 
    "Mistral"];

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleSelectModel = (model) => {
    setSelectedModel(model);
    setIsDropdownOpen(false); // Close the dropdown
    onModelSelect(model); // Pass the selected model to the parent component
  };

  const handleKeyDown = (event, model) => {
    if (event.key === "Enter" || event.key === " ") {
      handleSelectModel(model);
    }
  };

  // Close the dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (!event.target.closest(".model-dropdown-container")) {
      setIsDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    if (isDropdownOpen) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }
    return () => window.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div className="model-dropdown-container">
      {/* Dropdown trigger */}
      <button
        className="dropdown-button"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isDropdownOpen}
      >
        {selectedModel}{" "}
        <i className={`fas fa-chevron-${isDropdownOpen ? "up" : "down"}`}></i>
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <ul
          className="dropdown-menu-model"
          role="listbox"
          aria-labelledby="dropdown-button"
        >
          {llmModels
            .filter((model) => model !== selectedModel) // Filter out the selected model
            .map((model, index) => (
              <li
                key={index}
                className="dropdown-item-model"
                role="option"
                aria-selected={selectedModel === model}
                tabIndex={0}
                onClick={() => handleSelectModel(model)}
                onKeyDown={(event) => handleKeyDown(event, model)}
              >
                {model}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

ModelDropdown.propTypes = {
  onModelSelect: PropTypes.func.isRequired, // Require a callback function as a prop
};

export default ModelDropdown;
