import React, { useEffect } from 'react';

import {
  Stack,
  Box,
  Container,
  ScrollArea,
  Accordion,
  Textarea,
} from '@mantine/core';

import Layout from '../Layout';

function Page() {
  useEffect(() => {
    console.log('mount');
    return () => console.log('unmount');
  });

  return <Layout>
    <Container fluid style={{ width: '100%' }}>
      This is a page
    </Container>
  </Layout>;
}

export default Page;
