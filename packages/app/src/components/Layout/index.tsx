import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';

import { ExternalLink } from '../Link';

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 1rem;
  margin: 0 auto;
  max-width: 30rem;
`;

const Header = styled.header`
  margin-bottom: 2rem;
`;

const AppName = styled.h1`
  display: inline-block;
  margin: 0;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px white;

  ::first-letter {
    color: white;
  }
`;

const Content = styled.main`
  margin-bottom: 3rem;
`;

const Footer = styled.footer`
  text-align: center;
`;

const Copyright = styled.span`
  margin-right: 0.5rem;
`;

export type LayoutProps = {
  title?: string;
};

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const fullTitle = React.useMemo(
    () => `${title ? `${title} | ` : ''}Todos`,
    [title],
  );

  return (
    <Wrapper>
      <Helmet>
        <title>{fullTitle}</title>
      </Helmet>
      <Header>
        <RouterLink to="/">
          <AppName>Todos</AppName>
        </RouterLink>
      </Header>
      <Content>{children}</Content>
      <Footer>
        <Copyright>&copy; {new Date().getFullYear()}</Copyright>
        <ExternalLink
          href="https://github.com/rkrupinski"
          target="_blank"
          rel="noopener noreferrer"
        >
          rkrupinski
        </ExternalLink>
      </Footer>
    </Wrapper>
  );
};
