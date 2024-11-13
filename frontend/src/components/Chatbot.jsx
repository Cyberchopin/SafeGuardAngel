import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async (message) => {
    const response = await fetch('https://api.coze.com/v1/bot/publish', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer pat_sYcPscHjRGVqRXQLJcbp2B0NA6GlnbD8VEbDkbkWXcRXN8lSX3MdHRjpWqAY9IaR',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bot_id: '7436674909054484536',
        connector_ids: ['API'],
        message: message,
      }),
    });

    const data = await response.json();
    setMessages([...messages, { text: message, sender: 'user' }, { text: data.reply, sender: 'bot' }]);
    setInput(''); // 清空输入框
  };

  return (
    <div className="chatbot-container fixed bottom-0 right-0 m-4 bg-white shadow-lg rounded-lg p-4 w-80">
      <div className="chat-window max-h-60 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender} mb-2`}>
            <span className={msg.sender === 'user' ? 'text-blue-600' : 'text-green-600'}>{msg.text}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(input)}
        className="chat-input border rounded p-2 w-full mt-2"
        placeholder="Type your message..."
      />
    </div>
  );
};

export default Chatbot; 