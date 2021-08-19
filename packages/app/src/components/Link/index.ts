import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link as _Link } from 'react-router-dom';

const linkStyles = css`
  color: royalblue;
  text-decoration: underline;
  text-decoration-color: gold;
  text-decoration-style: solid;
  text-decoration-thickness: 3px;

  :hover {
    text-decoration-style: wavy;
  }
`;

export const Link = styled(_Link)`
  ${linkStyles}
`;

export const ExternalLink = styled.a`
  ${linkStyles}
`;
