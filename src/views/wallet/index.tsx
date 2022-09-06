import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`

`;

export function Wallet() {
  const params = useParams();

  return (
    <Container>
      My wallet {params.walletId}
    </Container>
  );
}
