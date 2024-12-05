const chatBody = document.getElementById('chatBody');
const userInput = document.getElementById('userInput');

function addBotMessage(message) {
  const botMessage = document.createElement('div');
  botMessage.classList.add('chat-message', 'bot-message');
  botMessage.innerHTML = `<p>${message}</p>`;
  chatBody.appendChild(botMessage);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function addUserMessage(message) {
  const userMessage = document.createElement('div');
  userMessage.classList.add('chat-message');
  userMessage.innerHTML = `<p>${message}</p>`;
  chatBody.appendChild(userMessage);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function sendMessage() {
  const userText = userInput.value.trim();

  if (userText === '') return;

  fetch('http://192.168.42.240:3030/api', {
    method: "POST",
    body: JSON.stringify({
      message:`${userInput}`
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });

  // addUserMessage(userText);
  // userInput.value = '';

  // // const botResponse = generateBotResponse(userText);


  // setTimeout(() => {
  //   addBotMessage(botResponse);
  // }, 500);
}

function generateBotResponse(userInput) {
  userInput = userInput.toLowerCase();

  if (userInput.includes('hello') || userInput.includes('hi') || userInput.includes('hey')) {
    return "Hello there! How can I assist you?";
  } else if (userInput.includes('bye')) {
    return "Goodbye! Have a great day!";
  }
  else if (userInput.includes('about sspm college?')) {
    return "sspm is engineering college in sindgudurg.";
  }
  else {
    return "I'm sorry, I don't understand that. Can you please be more specific?";
  }


}
