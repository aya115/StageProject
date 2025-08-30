// src/components/ChatBot.jsx
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../styles/ChatBot.css';
import { FaPaperPlane } from 'react-icons/fa';

const ChatBot = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    if (!userId) return;
    axios.get(`http://localhost:8081/api/chat/history/${userId}`)
      .then(res => setMessages(res.data))
      .catch(() => {});
  }, [userId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (e) => {
    e?.preventDefault();
    if (!text.trim()) return;
    try {
      const res = await axios.post('http://localhost:8081/api/chat/ask', {
        userId: String(userId),
        message: text.trim()
      });
      setMessages(res.data);
      setText('');
    } catch (e) {
      alert("Erreur d'envoi du message");
    }
  };

  if (!userId) return <div style={{padding:20}}>Veuillez vous connecter.</div>;

  return (
    <div className="chatbot">
      <div className="chatbot-header">Assistance ICARS</div>

      <div className="chatbot-body">
        {messages.map(m => (
          <div key={m.id} className={`bubble ${m.sender === 'USER' ? 'user' : 'bot'}`}>
            {m.content}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form className="chatbot-input" onSubmit={send}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Posez votre question…"
        />
        <button type="submit" aria-label="Envoyer"><FaPaperPlane /></button>
      </form>
    </div>
  );
};

export default ChatBot;
