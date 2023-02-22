import React from 'react';
import { NavLink as RouterNavLink } from "react-router-dom";
import { Box, NavLink } from '@mantine/core';
import {
  IconAppWindow,
  IconHome2,
  Icon,
} from '@tabler/icons-react';

const DefaultNavigationProps = {
  size: 16,
  stroke: 1.5,
}

const routes: [string, string, Icon, string?][] = [
  ['/', 'Home', IconHome2],
  ['/page', 'Page', IconAppWindow, 'Example of a page'],
];

export default function Navigation({ closeDrawer }: { closeDrawer: () => void }) {
  return (
    <Box>
      {routes.map(([to, label, Icon, description]) => (
        <RouterNavLink key={to} style={{ textDecoration: 'none' }} to={to}>{
          ({ isActive }) => (
            <NavLink onClick={isActive ? undefined : closeDrawer} label={label} icon={<Icon/>} description={description} active={isActive} />
          )
        }</RouterNavLink>
      ))}
    </Box>
  );
}
