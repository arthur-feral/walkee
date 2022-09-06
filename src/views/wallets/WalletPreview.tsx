import React from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';

const Container = styled.div`

`;

type TProps = Readonly<{
  wallet: ethers.Wallet;
}>;

export function WalletPreview({ wallet }: TProps) {
  return (
    <Container>
      My Wallet {wallet.address}
    </Container>
  );
}
