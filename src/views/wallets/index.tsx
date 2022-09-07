import React from 'react';
import { Link } from 'react-router-dom';
import { getRoute, Routing } from 'services/routing/helpers';
import { getWallets } from 'services/wallets/helpers';
import styled from 'styled-components';
import { bodySmallRegularTypography, headingLargeTypography } from 'styles';
import { grayColor } from 'styles/colors';
import { WalletPreview } from 'views/wallets/WalletPreview';


const Title = styled.div`
  ${headingLargeTypography}
  color: ${grayColor};
  margin: 32px auto;
  text-align: center;
`;

const Empty = styled.div`
  ${bodySmallRegularTypography}
  color: ${grayColor};
  padding: 12px;
  text-align: center;
`;

const ListItemInner = styled.div`
  padding: 0 4px;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding: 8px 0;
  width: 50%;
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding: 64px 0;
`;

export function Wallets() {
  const wallets = getWallets();
  const walletsList = Object.values(wallets);
  return (
    <Container>
      <Title>My wallets</Title>

      {walletsList.length === 0 && (
        <Empty>
          You dont have any wallet yet
          <br />
          <Link to={getRoute(Routing.WalletNew)}>Create a wallet</Link>
        </Empty>
      )}
      <List>
        {walletsList.map((wallet) => (
          <ListItem
            key={wallet.address}
          >
            <ListItemInner>
              <WalletPreview wallet={wallet} />
            </ListItemInner>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
