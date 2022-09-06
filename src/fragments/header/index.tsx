import React from 'react';
import { Link } from 'react-router-dom';
import { getRoute, Routing } from 'services/routing/helpers';
import styled from 'styled-components';
import { headingLargeTypography } from 'styles';
import { grayColor } from 'styles/colors';

const Name = styled.div`
  ${headingLargeTypography}
  color: ${grayColor}
`;

const NavLink = styled.div`
  padding: 8px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Container = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export function Header() {
  return (
    <Container>
      <Name>Walkee</Name>

      <Nav>
        <NavLink>
          <Link to={getRoute(Routing.Wallets)}>My Wallets</Link>
        </NavLink>

        <NavLink>
          <Link to={getRoute(Routing.WalletNew)}>Create a wallet</Link>
        </NavLink>
      </Nav>
    </Container>
  );
}
