// Browser-only code
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById("send-btn");
  const userInput = document.getElementById("user-input");
  const chatMessages = document.querySelector(".chat-messages");

  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    
    // Get user input
    const query = userInput.value.trim();
    if (!query) return;
    
    // Add user message to chat
    addMessage(query, 'user');
    userInput.value = '';
    
    try {
      // Call your backend API endpoint
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });
      
      const data = await response.json();
      
      // Add bot response to chat
      addMessage(data.response, 'bot');
    } catch (error) {
      console.error('Error:', error);
      addMessage('Sorry, there was an error processing your request.', 'bot');
    }
  });
  
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message-bubble');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.classList.add(sender === 'user' ? 'self-end' : 'self-start');
    
    const messagePara = document.createElement('p');
    messagePara.classList.add(sender === 'user' ? 'text-ecru/90' : 'text-flax/90');
    messagePara.textContent = text;
    
    messageDiv.appendChild(messagePara);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});