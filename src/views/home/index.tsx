import React from 'react';
import { Link } from 'react-router-dom';
import { Routing } from 'services/routing/helpers';
import styled from 'styled-components';
import { headingLargeTypography } from 'styles';
import { grayColor } from 'styles/colors';

const Title = styled.div`
  ${headingLargeTypography}
  color: ${grayColor};
  margin: 32px auto;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 64px 0;
`;

export function Home() {
  return (
    <Container>
      <Title>Welcome!</Title>

      <Link to={Routing.Wallets}>View my wallets</Link>
      <Link to={Routing.WalletNew}>Create a wallet</Link>
    </Container>
  );
}
