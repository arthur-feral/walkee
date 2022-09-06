import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { ResetGlobalStyle } from 'styles/globals';

const Container = styled.div`

`;

export function Layout() {
  return (
    <Container>
      <ResetGlobalStyle />

      <Outlet />
    </Container>
  );
}
