import React from 'react';
import styled from '../utils/styled';

interface LogoProps {
  size?: number;
  title?: string;
}

const Svg = styled('svg')`
  display: block;
`;

export default function Logo({ size = 28, title = 'ProBook Solutions' }: LogoProps) {
  const s = size;
  return (
    <Svg
      width={s}
      height={s}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0b5ed7" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      {/* Book shape */}
      <rect x="8" y="12" width="44" height="40" rx="6" fill="url(#g)" />
      <path d="M14 18h20a8 8 0 0 1 8 8v18H22a8 8 0 0 0-8 8V18z" fill="#fff" opacity="0.15" />
      {/* P letter */}
      <path d="M22 22h12a8 8 0 0 1 0 16H26v8h-4V22zm4 4v8h8a4 4 0 0 0 0-8h-8z" fill="#ffffff" />
    </Svg>
  );
}

