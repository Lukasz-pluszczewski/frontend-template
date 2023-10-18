import React, { ReactNode, Suspense } from 'react';

import {
  AppShell,
  Text,
  Burger,
  Kbd,
  Loader,
  ActionIcon,
  Stack,
  Group,
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

const AsideIcon = ({
  opened,
  toggle,
  hiddenFrom,
  visibleFrom,
}: {
  opened: boolean;
  toggle: () => void;
  hiddenFrom?: string;
  visibleFrom?: string;
}) => (
  <ActionIcon
    hiddenFrom={hiddenFrom}
    visibleFrom={visibleFrom}
    variant="default"
    onClick={toggle}
  >
    {opened
      ? <IconLayoutSidebarRightCollapse />
      : <IconLayoutSidebarRightExpand />}
  </ActionIcon>
);

export default function Layout({
  children,
  aside,
  title = DEFAULT_PAGE_TITLE,
}: {
  children: ReactNode;
  aside?: ReactNode;
  title?: ReactNode;
}) {
  const [iconsOnly, { toggle: toggleIconsOnly }] = useDisclosure(false);

  const [menuOpened, { open: openMenu, close: closeMenu, toggle: toggleMenu }] =
    useDisclosure(false);
  // const [
  //   menuMobileOpened,
  //   { open: openMobileMenu, close: closeMobileMenu, toggle: toggleMobileMenu },
  // ] = useDisclosure(false);
  // const [
  //   menuDesktopOpened,
  //   {
  //     open: openDesktopMenu,
  //     close: closeDesktopMenu,
  //     toggle: toggleDesktopMenu,
  //   },
  // ] = useDisclosure(true);

  const [
    asideOpened,
    { open: openAside, close: closeAside, toggle: toggleAside },
  ] = useDisclosure(false);
  // const [
  //   asideMobileOpened,
  //   {
  //     open: openMobileAside,
  //     close: closeMobileAside,
  //     toggle: toggleMobileAside,
  //   },
  // ] = useDisclosure(false);
  // const [
  //   asideDesktopOpened,
  //   {
  //     open: openDesktopAside,
  //     close: closeDesktopAside,
  //     toggle: toggleDesktopAside,
  //   },
  // ] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{
        width: iconsOnly ? 80 : 250,
        breakpoint: 'sm',
        collapsed: { mobile: !menuOpened, desktop: !menuOpened },
        // collapsed: { mobile: !menuMobileOpened, desktop: !menuDesktopOpened },
      }}
      aside={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !asideOpened, desktop: !asideOpened },
        // collapsed: { mobile: !asideMobileOpened, desktop: !asideDesktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" justify="space-between">
          <Group px="md">
            <Burger opened={menuOpened} onClick={toggleMenu} size="sm" />
            {/*<Burger opened={menuMobileOpened} onClick={toggleMobileMenu} hiddenFrom="sm" size="sm" />*/}
            {/*<Burger opened={menuDesktopOpened} onClick={toggleDesktopMenu} visibleFrom="sm" size="sm" />*/}
            <Text>{title}</Text>
          </Group>
          <Group px="md">
            {aside ? <>
              <AsideIcon
                opened={asideOpened}
                toggle={toggleAside}
              />
              {/*<AsideIcon*/}
              {/*  opened={asideMobileOpened}*/}
              {/*  open={openMobileAside}*/}
              {/*  close={closeMobileAside}*/}
              {/*  hiddenFrom="sm"*/}
              {/*/>*/}
              {/*<AsideIcon*/}
              {/*  opened={asideDesktopOpened}*/}
              {/*  open={openDesktopAside}*/}
              {/*  close={closeDesktopAside}*/}
              {/*  visibleFrom="sm"*/}
              {/*/>*/}
            </> : null}
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Stack h="100%" justify="space-between">
          <Navigation iconsOnly={iconsOnly} closeDrawer={closeMenu} />
          <Group justify="right">
            {iconsOnly
              ? <ActionIcon variant="default" onClick={toggleIconsOnly}><IconLayoutSidebarLeftExpand /></ActionIcon>
              : <ActionIcon variant="default" onClick={toggleIconsOnly}><IconLayoutSidebarLeftCollapse /></ActionIcon>
            }
          </Group>
        </Stack>
      </AppShell.Navbar>
      {aside ? <AppShell.Aside p="md">{aside}</AppShell.Aside> : null}
      <AppShell.Footer p="md">
        <Kbd>⌘</Kbd> + <Kbd>j</Kbd> to toggle color scheme
      </AppShell.Footer>

      <AppShell.Main>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </AppShell.Main>
    </AppShell>
  );
}
