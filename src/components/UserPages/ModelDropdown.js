import React, { useState } from "react";
import "../ModelDropdown.css";

const ModelDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("GPT-4"); // Default LLM model

  // List of available LLM models
  const llmModels = [
    "GPT-4",
    "GPT-3.5",
    "BERT",
    "T5",
    "LLaMA",
    "Anthropic",
    "Mistral",
  ];

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSelectModel = (model) => {
    setSelectedModel(model);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="model-dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        {selectedModel}{" "}
        <i className={`fas fa-chevron-${isDropdownOpen ? "up" : "down"}`}></i>
      </button>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          {llmModels.map((model, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleSelectModel(model)}
            >
              {model}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelDropdown;
