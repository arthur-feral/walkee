import React from 'react';
import styled from 'styled-components';
import { Wallet } from 'services/wallets/helpers';

const Container = styled.div`

`;

type TProps = Readonly<{
  wallet: Wallet;
}>;

export function WalletPreview({ wallet }: TProps) {
  return (
    <Container>
      My Wallet {wallet.id}
    </Container>
  );
}
