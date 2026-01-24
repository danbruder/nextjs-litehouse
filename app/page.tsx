'use client';

import { useState, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  created_at: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newMessage }),
      });

      if (response.ok) {
        setNewMessage('');
        fetchMessages();
      }
    } catch (error) {
      console.error('Failed to create message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1>Hello World - Next.js with SQLite</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter a message..."
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            width: '70%',
            marginRight: '0.5rem'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Adding...' : 'Add Message'}
        </button>
      </form>

      {messages.length > 0 && (
        <div>
          <h2>Recent Messages:</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {messages.map((message) => (
              <li
                key={message.id}
                style={{
                  padding: '0.75rem',
                  marginBottom: '0.5rem',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px'
                }}
              >
                <div>{message.text}</div>
                <small style={{ color: '#666' }}>
                  {new Date(message.created_at).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
