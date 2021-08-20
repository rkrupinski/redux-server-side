import * as React from 'react';

import { RouteComponent } from '../../types';
import { Layout } from '../../components/Layout';
import { Link } from '../../components/Link';

export const NotFound: RouteComponent = () => (
  <Layout title="Not found">
    <p>Nope 😭</p>
    <p>
      <Link to="/">View all todos</Link>
    </p>
  </Layout>
);
