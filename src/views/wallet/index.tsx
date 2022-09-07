import { Address } from 'components/Address';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getWallet } from 'services/wallets/helpers';
import styled from 'styled-components';
import { headingLargeTypography } from 'styles';
import { grayColor } from 'styles/colors';
import { NotFound } from 'views/notFound';


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

export function Wallet() {
  const params = useParams();
  const walletAddress = params.walletAddress;
  const storedWallet = getWallet(walletAddress?.replace('0x', '') ?? '');
  if (!storedWallet) {
    return (
      <NotFound />
    );
  }

  return (
    <Container>
      <Title>My wallet</Title>
      <Address
        value={storedWallet.address}
      />
    </Container>
  );
}
