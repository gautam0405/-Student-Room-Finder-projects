import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your Student Room Finder assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const responses = {
    'register': "To register: 1. Click on 'Login' in the top right, 2. Click 'Register' link, 3. Fill in your details (Name, Email, Phone, Location, Password), 4. Click Register button.",
    'login': "To login: 1. Click 'Login' in the top right, 2. Enter your registered email and password, 3. Click Login button.",
    'contact': "To contact a room owner: 1. Search for rooms using the search form, 2. Browse the results, 3. Click 'Contact Owner' button on any room listing.",
    'search': "To search rooms: 1. Go to Search Rooms section, 2. Enter location, max rent, and room type, 3. Click Search button, 4. View results on the next page.",
    'post': "To post a room: 1. Login to your account, 2. Click 'Post Room' in navigation, 3. Fill in room details, 4. Submit the form.",
    'help': "I can help you with: registration, login, searching rooms, posting rooms, and contacting owners. Just ask me any question!",
    'default': "I'm here to help with questions about registration, login, searching rooms, posting rooms, and contacting owners. What would you like to know?"
  };

  const getResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('register') || lowerMessage.includes('sign up') || lowerMessage.includes('create account')) {
      return responses.register;
    } else if (lowerMessage.includes('login') || lowerMessage.includes('sign in')) {
      return responses.login;
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('owner') || lowerMessage.includes('connect')) {
      return responses.contact;
    } else if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('room')) {
      return responses.search;
    } else if (lowerMessage.includes('post') || lowerMessage.includes('add') || lowerMessage.includes('list')) {
      return responses.post;
    } else if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return responses.help;
    } else {
      return responses.default;
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse = { text: getResponse(inputMessage), sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInputMessage('');
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '💬'}
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h3>Room Finder Assistant</h3>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <div className="message-content">
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <form className="chatbot-input" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything..."
              autoFocus
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;