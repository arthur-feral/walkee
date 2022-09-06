import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { grayColor, grayLight15Color, grayLight2Color, grayLight40Color, whiteColor } from 'styles/colors';
import { inputResetStyle } from 'styles/globals';
import { bodySmallRegularTypography } from 'styles/index';

const InputComponent = styled.input`
  ${bodySmallRegularTypography};
  ${inputResetStyle()}

  border-radius: 8px;
  padding: 8px 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${grayLight2Color};
  color: ${grayColor};
  border: 1px solid ${grayColor};
  transition: all 100ms ease;
  &:hover {
    background-color: ${whiteColor};
    border: 1px solid ${grayLight15Color};
  }
  &:focus, &:active {
    background-color: ${whiteColor};
    border: 1px solid ${grayLight40Color};
    box-shadow: 0 0 16px 0px ${whiteColor};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

type Props = {
  readonly id?: string;
  readonly onSubmit?: () => void;
  readonly onChange?: (newValue: string) => void;
  readonly type: 'email' | 'text' | 'password';
  readonly value: string;
  readonly placeholder?: string;
  readonly autoComplete?: string;
  readonly name?: string;
};

export function Input({
  id,
  onSubmit,
  onChange,
  type = 'text',
  value,
  placeholder = '',
  autoComplete = 'off',
  name,
}: Props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (onChange) {
      onChange(newValue);

    }
  };

  return (
    <Container>
      <InputComponent
        id={id}
        name={name}
        autoComplete={autoComplete}
        type={type}
        onSubmit={onSubmit}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
      />
    </Container>
  );
}
