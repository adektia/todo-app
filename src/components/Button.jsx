import React from 'react';
import styled from 'styled-components';

export default function Button({
  type = 'button',
  onClick,
  disabled,
  ariaLabel,
  children,
}) {
  return (
    <StyledButton
      role="button"
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  height: 27px;
  padding: ${(p) => p.theme.space?.(0.5) ?? '4px'};
  border-radius: ${(p) => p.theme.radii.md};
  border: 1px solid ${(p) => p.theme.colors.border};
  background: ${(p) => p.theme.colors.surface};
  color: ${(p) => p.theme.colors.text};
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: saturate(0.6);
  }
`;
