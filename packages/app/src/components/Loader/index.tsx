import * as React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const Indicator = styled.div`
  font-size: 3rem;
  animation: ${spin} 1s linear infinite;
`;

export const LOADER_DELAY_MS = 500;

export type LoaderProps = {
  delayMs?: number;
};

export const Loader: React.FC<LoaderProps> = ({
  delayMs = LOADER_DELAY_MS,
}) => {
  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setRender(true), delayMs);

    return () => {
      clearTimeout(timer);
    };
  }, [delayMs]);

  return render ? (
    <Wrapper>
      <Indicator>꩜</Indicator>
    </Wrapper>
  ) : null;
};
