import { Address } from 'components/Address';
import { ProgressMessage } from 'components/ProgressMessage';
import { ethers } from 'ethers';
import { AsyncStatus } from 'helpers';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getWallet, openWallet, safeAddress } from 'services/wallets/helpers';
import { useWalletProvider } from 'services/wallets/WalletProvider';
import styled from 'styled-components';
import { bodySmallRegularTypography, captionTypography, headingLargeTypography, headingSmallTypography } from 'styles';
import { Button } from 'styles/atoms/Button';
import { Input } from 'styles/atoms/Input';
import { grayColor, redColor } from 'styles/colors';
import { NotFound } from 'views/notFound';


const InputWrapper = styled.div`
  padding: 8px 0;
`;
const ErrorMessage = styled.div`
  padding: 8px 0;
  margin: 16px;
  background-color: ${redColor};
  color: ${grayColor};
`;

const PrivateKeyContainer = styled.div`
  ${bodySmallRegularTypography}
  color: ${grayColor};
  margin: 32px auto;
  text-align: center;
  max-width: 400px;
  width: 100%;
  margin 0 auto;
`;

const Title = styled.div`
  ${headingLargeTypography}
  color: ${grayColor};
  margin: 32px auto;
  text-align: center;
`;

const Subtitle = styled.div`
  ${headingSmallTypography}
  color: ${grayColor};
  margin: 32px auto;
  text-align: center;
`;

const PrivateKey = styled.div`
  ${captionTypography}
  color: ${grayColor};
  margin: 8px 0;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 64px 0;
`;

export function Wallet() {
  const {
    getBalance,
    providerStatus,
  } = useWalletProvider();
  const [decryptionProgress, setDecryptionProgress] = React.useState(0);
  const [decryptionStatus, setDecryptionStatus] = React.useState(AsyncStatus.Idle);

  const [balance, setBalance] = React.useState<N<ethers.BigNumber>>(null);
  const [error, setError] = React.useState<N<string>>(null);
  const [password, setPassword] = React.useState('');
  const [privateKey, setPrivateKey] = React.useState<N<string>>(null);
  const [status, setStatus] = React.useState(AsyncStatus.Pending);
  const params = useParams();
  const walletAddress = params.walletAddress;
  const storedWallet = getWallet(walletAddress?.replace('0x', '') ?? '');


  const handleClickDecrypt = async () => {
    if (!walletAddress) {
      return;
    }
    setDecryptionStatus(AsyncStatus.Pending);
    const wallet = await openWallet(
      walletAddress,
      password,
      setDecryptionProgress
    );

    if (wallet) {
      setError(null);
      setPrivateKey(wallet.privateKey);
      setTimeout(() => {
        setPrivateKey(null);
        setPassword('');
      }, 6000);
    } else {
      setError('Password incorrect');
    }
    setDecryptionStatus(AsyncStatus.Idle);
  };

  React.useEffect(() => {
    if (walletAddress && providerStatus === AsyncStatus.Idle) {
      (async () => {
        const newBalance = await getBalance(safeAddress(walletAddress));
        setBalance(newBalance);
        setStatus(AsyncStatus.Idle);
      })();
    }
  }, [providerStatus, getBalance, walletAddress]);

  return (
    <Container>

      {!storedWallet && (
        <NotFound />
      )}

      {walletAddress && (
        <>
          <Title>My wallet</Title>
          <Subtitle>
            {status === AsyncStatus.Pending && ' sync... '}
            {!balance && '♢ -'}
            {balance && `♢ ${ethers.utils.formatEther(balance)}`}
          </Subtitle>
          <Address
            value={walletAddress}
          />

          <PrivateKeyContainer>
            <PrivateKey>
              {privateKey && (
                <InputWrapper>
                  <Input
                    type={'text'}
                    value={privateKey}
                  />
                </InputWrapper>
              )}
            </PrivateKey>
            <InputWrapper>
              <Input
                type={'password'}
                value={password}
                placeholder={'type your password'}
                onChange={setPassword}
              />
            </InputWrapper>

            <InputWrapper>
              <Button
                onClick={handleClickDecrypt}
                disabled={decryptionStatus === AsyncStatus.Pending}
              >
                Reveal private key
              </Button>
            </InputWrapper>

            {decryptionStatus === AsyncStatus.Pending && (
              <ProgressMessage>
                Opening your wallet data, please wait... {`${decryptionProgress}%`}
              </ProgressMessage>
            )}
            {error && (
              <ErrorMessage>
                {error}
              </ErrorMessage>
            )}
          </PrivateKeyContainer>
        </>
      )}
    </Container>
  );
}
