import React from 'react';
import { NavLink as RouterNavLink } from "react-router-dom";
import { Box, NavLink } from '@mantine/core';
import {
  IconAppWindow,
  IconHome2,
  Icon,
} from '@tabler/icons-react';

const routes: [url: string, title: string, icon: Icon, description?: string][] = [
  ['/', 'Home', IconHome2],
  ['/page', 'Page', IconAppWindow, 'Example of a page'],
];

export default function Navigation({ iconsOnly, closeDrawer }: { iconsOnly: boolean, closeDrawer: () => void }) {
  return (
    <Box>
      {routes.map(([to, label, Icon, description]) => (
        <RouterNavLink key={to} style={{ textDecoration: 'none' }} to={to}>{
          ({ isActive }) => (
            iconsOnly
              ? <NavLink onClick={isActive ? undefined : closeDrawer} icon={<Icon/>} active={isActive} />
              : <NavLink onClick={isActive ? undefined : closeDrawer} label={label} icon={<Icon/>} description={description} active={isActive} />
          )
        }</RouterNavLink>
      ))}
    </Box>
  );
}
