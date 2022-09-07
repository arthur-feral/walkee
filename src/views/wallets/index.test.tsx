import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createWallet, truncAddress } from 'services/wallets/helpers';
import { WalletProvider } from 'services/wallets/WalletProvider';
import { Wallets } from './';

describe('Wallets', () => {
  test('renders the message for empty wallets list', () => {
    const { getByText } = render(
      <BrowserRouter>
        <WalletProvider>
          <Wallets />
        </WalletProvider>
      </BrowserRouter>
    );

    expect(getByText(/You dont have any wallet yet/i)).toBeInTheDocument();
  });

  test('renders the wallets list', async () => {
    const walletAddress = await createWallet('password');
    const { getByText } = render(
      <BrowserRouter>
        <WalletProvider>
          <Wallets />
        </WalletProvider>
      </BrowserRouter>
    );

    expect(getByText(truncAddress(walletAddress))).toBeInTheDocument();
  }, 10000);
});
