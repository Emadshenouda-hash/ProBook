import React from 'react';
import styled from '../utils/styled';
import type { DefaultTheme } from 'styled-components';

const Banner = styled('div')`
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #fff;
  padding: 0.75rem 1rem;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  position: relative;
  z-index: 1001;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
`;

const Content = styled('div')`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Icon = styled('span')`
  font-size: 1.1rem;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;

const Text = styled('span')`
  flex: 1;
  min-width: 200px;
`;

const CloseButton = styled('button')`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export default function DevelopmentBanner() {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    // Check if user has previously dismissed the banner
    const dismissed = localStorage.getItem('dev-banner-dismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('dev-banner-dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <Banner role="banner" aria-live="polite">
      <Content>
        <Icon aria-hidden="true">🚧</Icon>
        <Text>
          <strong>Website Under Development:</strong> We're actively enhancing our platform with new features and improvements. Some functionality may be limited during this period.
        </Text>
        <CloseButton
          onClick={handleDismiss}
          aria-label="Dismiss development notice"
          title="Dismiss this notice"
        >
          ×
        </CloseButton>
      </Content>
    </Banner>
  );
}