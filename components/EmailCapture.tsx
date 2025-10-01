import React, { useState } from 'react';
import styled from '../utils/styled';
import { emailMarketing, trackEmailSignup, EmailCaptureProps } from '../utils/emailMarketing';
import type { DefaultTheme } from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: var(--color-text);
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  font-size: 1rem;
  background: var(--color-background);
  color: var(--color-text);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(11, 94, 215, 0.1);
  }
  
  &::placeholder {
    color: var(--color-mutedText);
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(11, 94, 215, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

interface MessageProps {
  type: 'success' | 'error';
}

const Message = styled.div<MessageProps>`
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
  background: ${({ type }: MessageProps) => 
    type === 'success' 
      ? 'rgba(34, 197, 94, 0.1)' 
      : 'rgba(239, 68, 68, 0.1)'
  };
  color: ${({ type }: MessageProps) => 
    type === 'success' 
      ? 'rgb(34, 197, 94)' 
      : 'rgb(239, 68, 68)'
  };
  border: 1px solid ${({ type }: MessageProps) => 
    type === 'success' 
      ? 'rgba(34, 197, 94, 0.2)' 
      : 'rgba(239, 68, 68, 0.2)'
  };
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default function EmailCapture({
  placeholder = 'Enter your email address',
  buttonText = 'Subscribe',
  source = 'website',
  tags = [],
  onSuccess,
  onError,
  className
}: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const result = await emailMarketing.subscribe({
        email,
        firstName: firstName || undefined,
        source,
        tags: [...tags, 'newsletter']
      });

      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        trackEmailSignup(source, true);
        onSuccess?.(email);
        setEmail('');
        setFirstName('');
      } else {
        setMessage({ type: 'error', text: result.message });
        trackEmailSignup(source, false);
        onError?.(result.message);
      }
    } catch (error) {
      const errorMessage = 'Failed to subscribe. Please try again.';
      setMessage({ type: 'error', text: errorMessage });
      trackEmailSignup(source, false);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <FormContainer onSubmit={handleSubmit} className={className}>
      <InputGroup>
        <Label htmlFor="firstName">First Name (Optional)</Label>
        <Input
          id="firstName"
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
          placeholder="Your first name"
        />
      </InputGroup>
      
      <InputGroup>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder={placeholder}
          required
        />
      </InputGroup>

      <Button type="submit" disabled={loading}>
        {loading ? (
          <>
            <LoadingSpinner />
            <span style={{ marginLeft: '0.5rem' }}>Subscribing...</span>
          </>
        ) : (
          buttonText
        )}
      </Button>

      {message && (
        <Message type={message.type}>
          {message.text}
        </Message>
      )}
    </FormContainer>
  );
}