import React from 'react';
import { Routing } from 'services/routing/helpers';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'views/Layout';
import { Home } from 'views/home';
import { Wallets } from 'views/wallets';
import { Wallet } from 'views/wallet';
import { CreateWallet } from 'views/createWallet';
import { NotFound } from 'views/notFound';

const Container = styled.div`
  height: 100%;
`;

export function Router() {
  return (
    <Container>

      <Routes>
        <Route path={Routing.Root} element={<Layout />}>
          <Route path={Routing.Root} element={<Home />} />
          <Route path={Routing.Wallets} element={<Wallets />} />
          <Route path={Routing.Wallet} element={<Wallet />} />
          <Route path={Routing.WalletNew} element={<CreateWallet />} />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
      </Routes>

    </Container>
  );
}
