import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Header } from 'fragments/header';
import { ResetGlobalStyle } from 'styles/globals';

const Content = styled.main`
  
`;

const Container = styled.div`
  padding: 16px;
`;

export function Layout() {
  return (
    <Container>
      <ResetGlobalStyle />

      <Header />
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
}
