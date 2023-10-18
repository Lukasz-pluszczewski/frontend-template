import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { Box, NavLink } from '@mantine/core';
import { IconCat, IconHome2, Icon } from '@tabler/icons-react';

const routes: [url: string, title: string, icon: Icon, description?: string][] =
  [
    ['/', 'Home', IconHome2],
    ['/cat', 'Cat', IconCat, 'Meow!'],
  ];

export default function Navigation({
  iconsOnly,
  closeDrawer,
}: {
  iconsOnly: boolean;
  closeDrawer: () => void;
}) {
  return (
    <Box>
      {routes.map(([to, label, Icon, description]) => (
        <RouterNavLink key={to} style={{ textDecoration: 'none' }} to={to}>
          {({ isActive }) =>
            iconsOnly ? (
              <NavLink
                component="span"
                onClick={isActive ? undefined : closeDrawer}
                leftSection={<Icon />}
                active={isActive}
              />
            ) : (
              <NavLink
                component="span"
                onClick={isActive ? undefined : closeDrawer}
                leftSection={<Icon />}
                active={isActive}
                label={label}
                description={description}
              />
            )
          }
        </RouterNavLink>
      ))}
    </Box>
  );
}
