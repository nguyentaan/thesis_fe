import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MagnifyingGlassIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { fetchChatbot, addMessage } from "../../Slices/ChatbotSlice";
import ProductDetailModal from "./ProductDetailModal";
import "../Chatbot.css"; // Styles for the chatbot component
// import ModelDropdown from "./ModelDropdown";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailModel, setShowDetailModel] = useState(false);
  // const [selectedModel, setSelectedModel] = useState("Mistral");

  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.chatbot);
  // console.log("messages", messages);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      // Add the user's message
      dispatch(addMessage({ sender: "user", text: userInput }));
      // Dispatch fetchChatbot to get the bot's response
      dispatch(fetchChatbot(userInput));

      // Clear the input field
      setUserInput("");
    }
  };

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    // console.log("product", product);

    setShowDetailModel(true);
  };

  const closeProductDetail = () => {
    setShowDetailModel(false);
    setSelectedProduct(null);
  };

  // const handleModelSelect = (model) => {
  //   console.log("Selected Model:", model); // For debugging
  //   setSelectedModel(model);
  //   // Pass this value to other components or use it for API requests
  // };

  return (
    <>
      <div className="chatbot-button" onClick={toggleChat}>
        <button className="btn-chat">
          <MagnifyingGlassIcon style={{ width: "24px", height: "24px" }} />
        </button>
      </div>

      {isOpen && (
        <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
          <div className="chatbot-header">
            <h5>AI-powered assistant</h5>
            {/* <ModelDropdown onModelSelect={handleModelSelect} /> */}
            <button className="close-btn" onClick={toggleChat}>
              X
            </button>
          </div>
          <div className="chatbot-body">
            <div className="chatbot-messages">
              {messages.length === 0 && !loading && !error && (
                <div className="default-message">
                  <p>
                    Hi! I'm here to help. Ask me anything about our products.
                  </p>
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${
                    message.sender === "user" ? "user" : "bot"
                  }`}
                >
                  {/* Check for structured response */}
                  {message.sender === "bot" &&
                  message.text?.message &&
                  message.text?.products ? (
                    <>
                      <div className="bot-message">
                        {/* Split by '\n' to separate each line */}
                        {message.text.message.split("\n").map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                      <ul className="bot-products">
                        {message.text.products.map((product, i) => (
                          <li
                            key={i}
                            className="bot-product-item"
                            onClick={() => openProductDetail(product)} // Open product detail on click
                          >
                            <div className="product-info-chatbot">
                              <span className="product-name">
                                {i + 1}. {product.name} - {product.category} -{" "}
                                {product.color} - ${product.price}
                              </span>
                            </div>
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="product-image"
                            />
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <span>{message.text}</span> // Fallback for plain text or errors
                  )}
                </div>
              ))}
              {loading && (
                <div className="message bot loading">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              )}
              {error && (
                <div className="message bot error">
                  Error:{" "}
                  {error.detail?.[0]?.msg ||
                    "An error occurred. Please try again."}
                </div>
              )}
            </div>
          </div>
          <div className="chatbot-footer">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="chatbot-input"
              placeholder="Type a query..."
            />
            <button className="chatbot-send-btn" onClick={handleSendMessage}>
              <PaperPlaneIcon style={{ width: "24px", height: "24px" }} />
            </button>
          </div>
        </div>
      )}

      {/* Product Detail Modal (outside of chatbot container for full screen) */}
      {showDetailModel && (
        <ProductDetailModal
          selectedProduct={selectedProduct}
          showDetailModel={showDetailModel}
          unDisplayDetailModal={closeProductDetail} // Close the modal
        />
      )}
    </>
  );
};

export default ChatBot;
