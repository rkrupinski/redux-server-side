import * as React from 'react';
import { Link } from 'react-router-dom';

import { RouteComponent } from '../../types';
import { Layout } from '../../components/Layout';

export const NotFound: RouteComponent = () => (
  <Layout title="Not found">
    <p>Nope 😭</p>
    <p>
      <Link to="/">View all todos</Link>
    </p>
  </Layout>
);
