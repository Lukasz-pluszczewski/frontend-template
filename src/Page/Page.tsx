import React, { lazy } from 'react';

import {
  Container,
} from '@mantine/core';

import Layout from '../Layout';

const PageContent = lazy(() => import('./PageContent'));

function DiffPage() {
  return <Layout aside={<p>Some text to go in the sidebar</p>}>
    <Container fluid style={{ width: '100%' }}>
      <PageContent/>
    </Container>
  </Layout>;
}

export default DiffPage;
