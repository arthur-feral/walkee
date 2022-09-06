import React from 'react';
import styled, { css } from 'styled-components';
import {
  grayColor,
  grayLight10Color,
  grayLight30Color,
  grayLight40Color,
  grayLight5Color,
  redColor,
  whiteColor
} from 'styles/colors';
import { buttonResetStyle } from 'styles/globals';
import { captionTypography } from 'styles/index';

const Container = styled.div`
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const ButtonComponent = styled.button<{ accent: TButtonAccent }>`
  ${buttonResetStyle()}

  ${captionTypography}
  border-radius: 8px;
  padding: 8px 16px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 100ms ease;
  &:disabled {
    cursor: not-allowed;
  }

  ${({ accent }) => {
  switch (accent) {
    case 'danger':
      return css`
        color: ${String(whiteColor)};
        background-color: ${String(redColor)};
        &:disabled {
          color: ${String(grayLight5Color)};
          background-color: ${String(redColor)};
        }
      `;
    default:
      return css`
        color: ${String(grayColor)};
        background-color: ${String(grayLight10Color)};
        border: 1px solid ${String(grayLight30Color)};
        &:disabled {
          color: ${String(grayLight40Color)};
          background-color: ${String(grayLight5Color)};
        }
      `;
  }
}}
`;

type TButtonAccent = 'action' | 'danger';

type TProps = {
  readonly children: React.ReactNode;
  readonly onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  readonly type?: 'submit' | 'button';
  readonly disabled?: boolean;
  readonly accent?: TButtonAccent;
};

export function Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
  accent = 'action',
}: TProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  };
  return (
    <Container>
      <ButtonComponent
        type={type}
        onClick={handleClick}
        disabled={disabled}
        accent={accent}
      >
        {children}
      </ButtonComponent>
    </Container>
  );
}
