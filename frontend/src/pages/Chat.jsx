import React, { useState } from 'react';
import { MessageCircle, Send, Sparkles } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: 'Alice', text: 'Hey! How’s it going?' },
    { sender: 'You', text: 'All good! Working on a new React project.' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'You', text: input.trim() }]);
      setInput('');
    }
  };

  return (
    <main className="page-shell chat-page">
      <header className="page-heading">
        <span className="section-kicker"><MessageCircle size={14} /> Keep the conversation going</span>
        <h1>Messages.</h1>
        <p>Ideas get better when they’re shared.</p>
      </header>

      <section className="chat-card" aria-label="Conversation with Alice">
        <header className="chat-header">
          <div className="chat-avatar">A</div>
          <div className="chat-contact">
            <h2>Alice</h2>
            <span><i /> Your TechSphere community</span>
          </div>
          <span className="chat-header-icon"><Sparkles size={17} /></span>
        </header>

        <div className="chat-messages" aria-live="polite">
          <div className="chat-day-label"><span>Today</span></div>
          {messages.map((msg, index) => {
            const isOwnMessage = msg.sender === 'You';
            return (
              <div className={`message-row ${isOwnMessage ? 'is-own' : ''}`} key={`${msg.sender}-${index}`}>
                {!isOwnMessage && <span className="message-avatar">A</span>}
                <div className={`message-bubble ${isOwnMessage ? 'own-message' : ''}`}>
                  {!isOwnMessage && <span className="message-sender">{msg.sender}</span>}
                  <p>{msg.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        <form
          className="chat-composer"
          onSubmit={(event) => {
            event.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            aria-label="Write a message"
            placeholder="Write a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="button-primary send-button" aria-label="Send message" disabled={!input.trim()}>
            <Send size={17} />
          </button>
        </form>
      </section>
    </main>
  );
};

export default Chat;
