import React, { ReactNode, Suspense } from 'react';

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
  ActionIcon,
  Stack,
  Group,
  Box,
} from '@mantine/core';

import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconLayoutSidebarRightExpand,
  IconLayoutSidebarRightCollapse,
} from '@tabler/icons-react';

import Navigation from './Navigation';
import { useDisclosure } from '@mantine/hooks';

const DEFAULT_PAGE_TITLE = '${ pageTitleHtml }';
const NAVIGATION_DRAWERS_BREAKPOINT = 'sm';

const AsideIcon = ({ opened, open, close }: { opened: boolean, open: () => void, close: () => void }) => (
  opened
    ? <ActionIcon onClick={close}><IconLayoutSidebarRightCollapse /></ActionIcon>
    : <ActionIcon onClick={open}><IconLayoutSidebarRightExpand /></ActionIcon>
);

const HideWhenSmall = ({ children }: { children: ReactNode }) => (
  <MediaQuery smallerThan={NAVIGATION_DRAWERS_BREAKPOINT} styles={{ display: 'none' }}>
    {children}
  </MediaQuery>
);
const HideWhenLarge = ({ children }: { children: ReactNode }) => (
  <MediaQuery largerThan={NAVIGATION_DRAWERS_BREAKPOINT} styles={{ display: 'none' }}>
    {children}
  </MediaQuery>
);

export default function Layout({ children, aside, title = DEFAULT_PAGE_TITLE }: { children: ReactNode, aside?: ReactNode, title?: ReactNode }) {
  const theme = useMantineTheme();
  const [menuOpened, { open: openMenu, close: closeMenu, toggle: toggleMenu }] = useDisclosure(false);
  const [asideOpened, { open: openAside, close: closeAside, toggle: toggleAside }] = useDisclosure(false);

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
      navbarOffsetBreakpoint={NAVIGATION_DRAWERS_BREAKPOINT}
      asideOffsetBreakpoint={NAVIGATION_DRAWERS_BREAKPOINT}
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint={NAVIGATION_DRAWERS_BREAKPOINT}
          hidden={!menuOpened}
          width={menuOpened ? { sm: 200, lg: 300 } : { sm: 80 }}
        >
          <Stack justify="space-between" h="100%">
            <Navigation iconsOnly={!menuOpened} closeDrawer={closeMenu} />
            <HideWhenSmall>
              <Group position="right">
                {menuOpened
                  ? <ActionIcon onClick={closeMenu}><IconLayoutSidebarLeftCollapse /></ActionIcon>
                  : <ActionIcon onClick={openMenu}><IconLayoutSidebarLeftExpand /></ActionIcon>
                }
              </Group>
            </HideWhenSmall>
          </Stack>
        </Navbar>
      }
      aside={
        aside
          ? (
            <Aside p="md" hiddenBreakpoint={NAVIGATION_DRAWERS_BREAKPOINT} hidden={!asideOpened} width={asideOpened ? { sm: 200, lg: 300 } : { sm: 50 }}>
              <Stack justify="space-between" h="100%">
                <Box style={{ flexGrow: 1 }}>
                  {asideOpened ? aside : null}
                </Box>
                <AsideIcon opened={asideOpened} open={openAside} close={closeAside} />
              </Stack>
            </Aside>
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
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <HideWhenLarge>
                <Burger
                  opened={menuOpened}
                  onClick={toggleMenu}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </HideWhenLarge>

              <Box>{title}</Box>
            </div>
            {aside
              ? (
                <HideWhenLarge>
                  <AsideIcon opened={asideOpened} open={openAside} close={closeAside} />
                </HideWhenLarge>
              )
              : null}
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
