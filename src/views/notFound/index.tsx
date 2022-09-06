import React from 'react';
import { Link } from 'react-router-dom';
import { getRoute, Routing } from 'services/routing/helpers';
import styled from 'styled-components';

const Container = styled.div`

`;

export function NotFound() {
  return (
    <Container>
      Oops, are you lost?
      <Link to={getRoute(Routing.Root)}>Go back to home</Link>
    </Container>
  );
}
