import React, { lazy } from 'react';

import {
  Container,
} from '@mantine/core';

import Layout from '../Layout';

const CatContent = lazy(() => import('./CatContent'));

function DiffPage() {
  return <Layout aside={<p>Here you have it! A CAT!</p>} title="A cat page">
    <Container fluid style={{ width: '100%' }}>
      <CatContent/>
    </Container>
  </Layout>;
}

export default DiffPage;
