import React, { ReactNode, Suspense } from 'react';
import { useState } from 'react';

import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  Kbd,
  Loader,
  useMantineTheme,
} from '@mantine/core';

import Navigation from './Navigation';

export default function Layout({ children, aside }: { children: ReactNode, aside?: ReactNode }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const closeDrawer = () => setOpened(false);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navigation closeDrawer={closeDrawer} />
        </Navbar>
      }
      aside={
        aside
          ? (
            <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
              <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
                {aside}
              </Aside>
            </MediaQuery>
          )
          : undefined
      }
      footer={
        <Footer height={60} p="md">
          <Kbd>⌘</Kbd> + <Kbd>j</Kbd> to toggle color scheme
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>${ pageTitleHtml }</Text>
          </div>
        </Header>
      }
    >
      <Suspense fallback={<Loader />}>
        {children}
      </Suspense>
    </AppShell>
  );
}
