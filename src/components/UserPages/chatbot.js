import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchChatbot, addMessage } from "../../Slices/ChatbotSlice";
import "../Chatbot.css"; // Styles for the chatbot component

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");

  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.chatbot);

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

  return (
    <>
      <div className="chatbot-button" onClick={toggleChat}>
        <button className="btn-chat">Search Advance</button>
      </div>

      {isOpen && (
        <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
          <div className="chatbot-header">
            <h5>Chat with us!</h5>
            <button className="close-btn" onClick={toggleChat}>
              X
            </button>
          </div>
          <div className="chatbot-body">
            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${
                    message.sender === "user" ? "user" : "bot"
                  }`}
                >
                  {message.text}
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
                  Error: {error.detail[0]?.msg}
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
            <button
              className="chatbot-send-btn"
              onClick={handleSendMessage} // Corrected here
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
