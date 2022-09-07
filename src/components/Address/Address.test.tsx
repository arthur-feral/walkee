import React from 'react';
import { render } from '@testing-library/react';
import { Address } from './';

describe('Address', () => {
  test('renders learn react link', () => {
    const { getByText } = render(
      <Address
        value={'0x13462890d5152381aee3932ac5d203f567ffb54f'}
      />
    );

    expect(getByText(/0x1346...b54f/i)).toBeInTheDocument();
  });
});
