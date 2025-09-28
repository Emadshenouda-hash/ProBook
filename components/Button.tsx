import React from 'react';
import styled from '../utils/styled';

type Variant = 'primary' | 'ghost';

interface ButtonProps extends React.ComponentProps<'a'> {
  variant?: Variant;
}

const Base = styled('a')<{ variant: Variant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  line-height: 1;
  border: 1px solid transparent;
  /*
   * Micro‑interaction enhancements:
   * Add a base shadow and scale/translate the button on hover. These
   * transitions provide immediate feedback and improve perceived
   * responsiveness【681102692010060†L69-L83】.
   */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 150ms ease, background-color 150ms ease, border-color 150ms ease, color 150ms ease, box-shadow 150ms ease;
  will-change: transform;
  ${({ variant, theme }) =>
    variant === 'primary'
      ? `background-color: ${theme.colors.primary}; color: #fff;
         &:hover{
           background-color: ${theme.colors.primaryHover};
           transform: translateY(-2px) scale(1.03);
           box-shadow: 0 4px 8px rgba(0,0,0,0.15);
         }
         &:active{
           transform: translateY(0) scale(1);
           box-shadow: 0 2px 4px rgba(0,0,0,0.1);
         }
        `
      : `background-color: transparent; color: #fff; border-color: rgba(255,255,255,0.6);
         &:hover{
           border-color: #fff;
           transform: translateY(-2px) scale(1.03);
           box-shadow: 0 4px 8px rgba(0,0,0,0.15);
         }
         &:active{
           transform: translateY(0) scale(1);
           box-shadow: 0 2px 4px rgba(0,0,0,0.1);
         }
        `}
`;

export default function Button({ variant = 'primary', ...props }: ButtonProps) {
  return <Base variant={variant} {...props} />;
}

