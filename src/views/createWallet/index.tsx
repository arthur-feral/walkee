import { AsyncStatus } from 'helpers';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getRoute, Routing } from 'services/routing/helpers';
import { createWallet } from 'services/wallets/helpers';
import styled from 'styled-components';
import { headingLargeTypography } from 'styles';
import { Button } from 'styles/atoms/Button';
import { Input } from 'styles/atoms/Input';
import { grayColor, grayLight10Color } from 'styles/colors';

const Message = styled.div`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${grayColor};
  background-color: ${grayLight10Color};
  color: ${grayColor};
  text-align: center;
  margin-top: 16px;
`;

const Title = styled.div`
  ${headingLargeTypography}
  color: ${grayColor};
  margin: 32px auto;
  text-align: center;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;
const InputLabel = styled.label`
  padding: 8px 0;
  display: block;
  color: ${grayColor};
`;
const InputContainer = styled.div`
  padding: 16px 0;
`;
const Form = styled.form`
  max-width: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  margin: 0 auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

export function CreateWallet() {
  const navigate = useNavigate();
  const [encryptionProgress, setEncryptionProgress] = React.useState(0);
  const [status, setStatus] = React.useState(AsyncStatus.Idle);
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');

  const isCreateButtonDisabled = (
    password === ''
    || password !== passwordConfirmation
    || status === AsyncStatus.Pending
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(AsyncStatus.Pending);
    if (password === '' || password !== passwordConfirmation) {
      return;
    }

    const walletAddress = await createWallet(password, setEncryptionProgress);
    setStatus(AsyncStatus.Idle);
    navigate(getRoute(Routing.Wallet, { walletAddress: walletAddress }));
  };

  return (
    <Container>
      <Title>
        Create a new wallet
      </Title>

      <Form
        onSubmit={handleSubmit}
      >
        <InputContainer>
          <InputLabel
            htmlFor={'input-password'}
          >
            Create a password
          </InputLabel>
          <InputWrapper>
            <Input
              id={'input-password'}
              name={'wallet[password]'}
              type={'password'}
              placeholder={'type a strong password'}
              value={password}
              onChange={setPassword}
            />
          </InputWrapper>
        </InputContainer>

        <InputContainer>
          <InputLabel
            htmlFor={'input-password-confirmation'}
          >
            Confirm your password
          </InputLabel>
          <InputWrapper>
            <Input
              id={'input-password-confirmation'}
              name={'wallet[password-confirmation]'}
              type={'password'}
              placeholder={'confirm the password'}
              value={passwordConfirmation}
              onChange={setPasswordConfirmation}
            />
          </InputWrapper>
        </InputContainer>

        <Button
          type={'submit'}
          disabled={isCreateButtonDisabled}
        >
          Create
        </Button>

        {status === AsyncStatus.Pending && (
          <Message>
            Creating and encrypting your wallet, please wait... {`${encryptionProgress}%`}
          </Message>
        )}
      </Form>
    </Container>
  );
}
