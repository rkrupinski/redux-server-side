import * as React from 'react';
import styled from '@emotion/styled';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'primary' | 'secondary';
};

const _Button = styled.button`
  box-sizing: content-box;
  height: 2em;
  padding: 0 0.5em;
  margin: 0;
  border: 3px solid royalblue;
  border-radius: 3px;
  font-family: inherit;
  font-size: inherit;
  line-height: 2;
  background: transparent;
  appearance: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  &:not(:disabled):active {
    transform: translate(1px, 1px);
  }
`;

const PrimaryButton = styled(_Button)`
  background: royalblue;
  color: white;
`;

const SecondaryButton = styled(_Button)`
  color: royalblue;
`;

export const Button: React.FC<ButtonProps> = ({ variant, ...rest }) =>
  React.createElement(
    variant === 'primary' ? PrimaryButton : SecondaryButton,
    rest,
  );
