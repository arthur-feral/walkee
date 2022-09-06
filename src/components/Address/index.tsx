import React from 'react';
import { truncAddress } from 'services/wallets/helpers';
import styled, { keyframes } from 'styled-components';
import { captionTypography } from 'styles';
import { grayLight10Color, grayLight30Color, redColor } from 'styles/colors';


const copiedAnimation = keyframes`
  0% {
    transform: translateY(0);
    opacity: 0.8;
  }
  100% {
    transform: translateY(-30px);
    opacity: 0;
  }
`;
const Copied = styled.div`
  position: absolute;
  display: flex;
  right: 0;
  justify-content: center;
  align-items: center;
  top: 0;
  padding: 2px 6px;
  border-radius: 4px;
  background: #2bd982;
  text-align: center;
  font-size: 14px;
  color: white;
  transform: translateY(-30px);
  opacity: 0;
  pointer-events: none;
  animation: ${copiedAnimation} 1.5s ease-out;
  z-index: 1;
`;
const Container = styled.span`
  ${captionTypography}
  background-color: ${grayLight10Color};
  border: 1px solid ${grayLight30Color};
  color: ${redColor};
  font-weight: 700;
  padding: 4px;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
`;

type TProps = Readonly<{ value: string }>;

export function Address({ value }: TProps) {
  const [copied, setCopied] = React.useState(false);

  const handleClick = () => {
    const addressToCopy = `0x${value.replace('0x', '')}`;
    navigator.clipboard.writeText(addressToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Container
      onClick={handleClick}
    >
      {copied && <Copied>Copied!</Copied>}
      {truncAddress(value)}
    </Container>
  );
}
