import { Address } from 'components/Address';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getWallet, truncAddress } from 'services/wallets/helpers';
import styled from 'styled-components';
import { NotFound } from 'views/notFound';

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
      My wallet
      <Address
        value={storedWallet.address}
      />
    </Container>
  );
}
