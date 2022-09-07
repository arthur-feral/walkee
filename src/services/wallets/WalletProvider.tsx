import { ethers } from 'ethers';
import { AsyncStatus } from 'helpers';
import React from 'react';
import { ETHERSCAN_API_KEY, Network } from 'services/wallets/helpers';

export type WalletContextStore = {
  network: Network;
  changeNetwork: (network: Network) => void;
  providerStatus: AsyncStatus;
  provider: N<ethers.providers.EtherscanProvider>;
  getBalance: (address: string) => Promise<N<ethers.BigNumber>>;
};

export const WalletContext = React.createContext<M<WalletContextStore>>(undefined);

type Props = Readonly<{
  children: React.ReactNode;
}>;

export const WalletProvider = ({
  children,
}: Props) => {
  const [providerStatus, setProviderStatus] = React.useState<AsyncStatus>(AsyncStatus.Pending);
  const [network, setNetwork] = React.useState<Network>(Network.Testnet);
  const [provider, setProvider] = React.useState<N<ethers.providers.EtherscanProvider>>(null);

  const initializeProvider = async (network: Network) => {
    const args: string[] = [network];
    if (network === Network.Mainnet) {
      args.push(ETHERSCAN_API_KEY);
    }
    const newProvider = new ethers.providers.EtherscanProvider(...args);
    setProvider(newProvider);
    setProviderStatus(AsyncStatus.Idle);
  };

  const changeNetwork = (network: Network) => {
    initializeProvider(network);
    setNetwork(network);
  };

  const getBalance = async (address: string): Promise<N<ethers.BigNumber>> => {
    if (!provider) {
      return null;
    }

    return provider.getBalance(address);
  };

  const store = {
    changeNetwork,
    providerStatus,
    provider,
    getBalance,
    network,
  };

  React.useEffect(() => {
    initializeProvider(network);
  }, []);

  return (
    <WalletContext.Provider value={store}>
      {children}
    </WalletContext.Provider>
  );
};

export function useWalletProvider() {
  const context = React.useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet: WalletContext is missing.');
  }

  return context;
}
