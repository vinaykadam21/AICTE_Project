import React, { useState } from 'react';
import './App.css';


function ChatApp() {
  const [userMessages, setUserMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatBodyRef = React.createRef();

  const addBotMessage = (message) => {
    setUserMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isBot: true },
    ]);
    scrollToBottom();
  };

  const addUserMessage = (message) => {
    setUserMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isBot: false },
    ]);
    scrollToBottom();
  };
  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };
  

  const sendMessage = () => {
    const userText = newMessage.trim();

    if (userText === '') return;

    addUserMessage(userText);
    setNewMessage('');

    // Send the user's message to your Express server and get the bot's response.
    fetch('http://192.168.42.240:3030/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userText }),
    })
      .then((response) => response.json())
      .then((data) => {
        const botResponse = data.message; // Assuming the bot's response is in the "message" field.
        addBotMessage(botResponse);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };


  // const generateBotResponse = (userInput) => {
  //   userInput = userInput.toLowerCase();

  //   if (
  //     userInput.includes('hello') ||
  //     userInput.includes('hi') ||
  //     userInput.includes('hey')
  //   ) {
  //     return "Hello there! How can I assist you?";
  //   } else if (userInput.includes('bye')) {
  //     return "Goodbye! Have a great day!";
  //   } else if (userInput.includes('about sspm college?')) {
  //     return "SSPM is an engineering college in Sindhudurg.";
  //   } else {
  //     return "I'm sorry, I don't understand that. Can you please be more specific?";
  //   }
  // };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>SSPM's Chatbot</h2>
      </div>
      <div className="chat-body" ref={chatBodyRef}>
        {userMessages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.isBot ? 'bot-message' : ''}`}
          >
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatApp;
