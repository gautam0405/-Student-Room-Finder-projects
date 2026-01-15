// Simple Chatbot for Static HTML Version
document.addEventListener('DOMContentLoaded', function() {
    // Create chatbot HTML
    const chatbotHTML = `
        <div id="chatbot-toggle" class="chatbot-toggle">💬</div>
        <div id="chatbot-container" class="chatbot-container" style="display: none;">
            <div class="chatbot-header">
                <h3>Room Finder Assistant</h3>
            </div>
            <div id="chatbot-messages" class="chatbot-messages">
                <div class="message bot">
                    <div class="message-content">Hi! I'm your Student Room Finder assistant. How can I help you today?</div>
                </div>
            </div>
            <form id="chatbot-form" class="chatbot-input">
                <input type="text" id="chatbot-input" placeholder="Ask me anything..." autocomplete="off">
                <button type="submit">Send</button>
            </form>
        </div>
    `;

    // Add chatbot to body
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // Add CSS styles
    const style = document.createElement('style');
    style.textContent = `
        .chatbot-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #ffcc00, #ff9900);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: white;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            transition: all 0.3s ease;
        }

        .chatbot-toggle:hover {
            transform: scale(1.1);
        }

        .chatbot-container {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            z-index: 1000;
            overflow: hidden;
        }

        .chatbot-header {
            background: linear-gradient(135deg, #ffcc00, #ff9900);
            color: white;
            padding: 15px 20px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 12px 12px 0 0;
        }

        .chatbot-messages {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            background: #f8f9fa;
        }

        .message {
            margin-bottom: 12px;
            display: flex;
        }

        .message.user {
            justify-content: flex-end;
        }

        .message.bot {
            justify-content: flex-start;
        }

        .message-content {
            max-width: 80%;
            padding: 10px 15px;
            border-radius: 18px;
            font-size: 14px;
            line-height: 1.4;
        }

        .message.user .message-content {
            background: linear-gradient(135deg, #ffcc00, #ff9900);
            color: white;
            border-bottom-right-radius: 4px;
        }

        .message.bot .message-content {
            background: white;
            color: #333;
            border-bottom-left-radius: 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .chatbot-input {
            display: flex;
            padding: 15px;
            background: white;
            border-top: 1px solid #eee;
        }

        .chatbot-input input {
            flex: 1;
            padding: 10px 15px;
            border: 1px solid #ddd;
            border-radius: 20px;
            outline: none;
            font-size: 14px;
        }

        .chatbot-input input:focus {
            border-color: #ffcc00;
        }

        .chatbot-input button {
            margin-left: 10px;
            padding: 10px 20px;
            background: linear-gradient(135deg, #ffcc00, #ff9900);
            color: white;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
        }

        @media (max-width: 480px) {
            .chatbot-container {
                width: calc(100vw - 40px);
                height: 400px;
                bottom: 80px;
                right: 10px;
            }
        }
    `;
    document.head.appendChild(style);

    // Chatbot functionality
    const toggle = document.getElementById('chatbot-toggle');
    const container = document.getElementById('chatbot-container');
    const form = document.getElementById('chatbot-form');
    const input = document.getElementById('chatbot-input');
    const messages = document.getElementById('chatbot-messages');

    // Toggle chatbot
    toggle.addEventListener('click', function() {
        const isOpen = container.style.display !== 'none';
        container.style.display = isOpen ? 'none' : 'flex';
        toggle.textContent = isOpen ? '💬' : '✕';

        if (!isOpen) {
            input.focus();
        }
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = input.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        input.value = '';

        // Get bot response
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 500);
    });

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('register') || lowerMessage.includes('sign up')) {
            return "To register: 1. Click 'Login' in top right, 2. Click 'Register' link, 3. Fill your details (Name, Email, Phone, Location, Password), 4. Click Register.";
        } else if (lowerMessage.includes('login') || lowerMessage.includes('sign in')) {
            return "To login: 1. Click 'Login' in top right, 2. Enter your email and password, 3. Click Login button.";
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('owner')) {
            return "To contact room owner: 1. Search for rooms, 2. Click 'Contact Owner' button on any room listing.";
        } else if (lowerMessage.includes('search') || lowerMessage.includes('find')) {
            return "To search rooms: 1. Scroll to Search section, 2. Enter location, max rent, room type, 3. Click Search.";
        } else if (lowerMessage.includes('post') || lowerMessage.includes('add')) {
            return "To post a room: 1. Login first, 2. Click 'Post Room' in navigation, 3. Fill room details and submit.";
        } else if (lowerMessage.includes('help')) {
            return "I can help with registration, login, searching rooms, posting rooms, and contacting owners. Just ask!";
        } else {
            return "I'm here to help with questions about using the Student Room Finder app. Ask me about registration, login, or searching rooms!";
        }
    }
});