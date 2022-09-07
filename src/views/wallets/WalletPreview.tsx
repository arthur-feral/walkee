import { ethers } from 'ethers';
import { AsyncStatus } from 'helpers';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getRoute, Routing } from 'services/routing/helpers';
import { safeAddress, truncAddress } from 'services/wallets/helpers';
import { useWalletProvider } from 'services/wallets/WalletProvider';
import styled from 'styled-components';
import { Button } from 'styles/atoms/Button';
import { grayColor, grayLight15Color, grayLight5Color, greenColor } from 'styles/colors';

const Balance = styled.div`
  color: ${greenColor};
  text-decoration: none;
  font-weight: 700;
`;

const Address = styled.div`
  font-weight: 700;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding: 8px;
  background-color: ${grayLight5Color};
  color: ${grayColor};
  border: 1px solid ${grayLight15Color};
  border-radius: 8px;
`;

type TProps = Readonly<{
  wallet: ethers.Wallet;
}>;

export function WalletPreview({ wallet }: TProps) {
  const navigate = useNavigate();
  const {
    getBalance,
    providerStatus,
  } = useWalletProvider();
  const [balance, setBalance] = React.useState<N<ethers.BigNumber>>(null);
  const [status, setStatus] = React.useState(AsyncStatus.Pending);

  const handleClickOpen = () => {
    navigate(getRoute(Routing.Wallet, { walletAddress: wallet.address }));
  };
  React.useEffect(() => {
    if (providerStatus === AsyncStatus.Idle) {
      (async () => {
        const newBalance = await getBalance(safeAddress(wallet.address));
        setBalance(newBalance);
        setStatus(AsyncStatus.Idle);
      })();
    }
  }, [providerStatus, getBalance, wallet.address]);

  return (
    <Container>
      <Content>
        <Address>
          {truncAddress(wallet.address)}
        </Address>

        <Balance>
          {status === AsyncStatus.Pending && ' sync... '}
          {!balance && '♢ -'}
          {balance && `♢ ${ethers.utils.formatEther(balance)}`}
        </Balance>
      </Content>
      <Button
        onClick={handleClickOpen}
      >
        Open
      </Button>
    </Container>
  );
}
