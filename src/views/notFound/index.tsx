import React from 'react';
import { Link } from 'react-router-dom';
import { getRoute, Routing } from 'services/routing/helpers';
import styled from 'styled-components';
import { headingLargeTypography } from 'styles';
import { grayColor } from 'styles/colors';

const Title = styled.h1`
  ${headingLargeTypography}
  color: ${grayColor};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 64px 0;
`;

export function NotFound() {
  return (
    <Container>
      <Title>
        Oops, are you lost?
      </Title>

      <Link to={getRoute(Routing.Root)}>Go back to home</Link>
    </Container>
  );
}
