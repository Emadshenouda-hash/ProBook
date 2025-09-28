import React, { useState, useEffect, useRef } from 'react';
import styled from '../utils/styled';

/**
 * A simple AI‑like chat widget. It floats in the bottom corner of the
 * viewport and toggles open/closed when the user clicks the button. When
 * open, it displays a list of messages and an input box. For a real
 * application you would integrate with a backend chat service or AI API.
 * Here we simulate canned responses on a slight delay to demonstrate
 * interactivity.
 */

const ChatButton = styled('button')`
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: none;
  background-color: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 1000;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const ChatContainer = styled('div')`
  position: fixed;
  right: 1rem;
  bottom: 4.5rem;
  width: 320px;
  max-height: 60vh;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;
`;

const ChatHeader = styled('div')`
  padding: 0.75rem 1rem;
  background-color: var(--color-primary);
  color: #fff;
  font-weight: 600;
`;

const ChatMessages = styled('div')`
  flex: 1;
  padding: 0.5rem 1rem;
  overflow-y: auto;
  background-color: var(--color-surface);
`;

const ChatMessage = styled('div')< { from: 'user' | 'bot' } >`
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: ${({ from }) => (from === 'user' ? 'flex-end' : 'flex-start')};
  & > span {
    max-width: 80%;
    padding: 0.5rem 0.75rem;
    border-radius: 12px;
    font-size: 0.875rem;
    line-height: 1.25;
    background-color: ${({ from, theme }) => (from === 'user' ? theme.colors.primary : theme.colors.background)};
    color: ${({ from, theme }) => (from === 'user' ? '#fff' : theme.colors.text)};
  }
`;

const ChatInputWrapper = styled('div')`
  border-top: 1px solid var(--color-border);
  padding: 0.5rem;
  background-color: var(--color-surface);
`;

const ChatInput = styled('input')`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 0.875rem;
  outline: none;
  background: var(--color-background);
  color: var(--color-text);
  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(109, 40, 217, 0.3);
  }
`;

interface ChatMessageItem {
  id: number;
  from: 'user' | 'bot';
  text: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageItem[]>([{
    id: 0,
    from: 'bot',
    text: 'Hi! How can we help you today?'
  }]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: ChatMessageItem = { id: Date.now(), from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    try {
      // Call the serverless chat API. The message is passed in the
      // request body, and the backend will forward it to the configured
      // external API using environment variables. It returns a JSON
      // object with a `reply` property containing the chatbot’s response.
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text })
      });
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      const botMessage: ChatMessageItem = { id: Date.now() + 1, from: 'bot', text: data.reply || 'Sorry, I did not understand that.' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const botMessage: ChatMessageItem = { id: Date.now() + 1, from: 'bot', text: 'Sorry, we encountered an error. Please try again later.' };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <ChatButton
        aria-label={open ? 'Close chat widget' : 'Open chat widget'}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? '×' : '💬'}
      </ChatButton>
      {open && (
        <ChatContainer>
          <ChatHeader>Chat with us</ChatHeader>
          <ChatMessages>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} from={msg.from}>
                <span>{msg.text}</span>
              </ChatMessage>
            ))}
            <div ref={messagesEndRef} />
          </ChatMessages>
          <ChatInputWrapper>
            <ChatInput
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Chat message input"
            />
          </ChatInputWrapper>
        </ChatContainer>
      )}
    </>
  );
}