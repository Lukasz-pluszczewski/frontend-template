import React, { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useHotkeys } from '@mantine/hooks';
import {
  MantineProvider,
  createTheme,
  localStorageColorSchemeManager,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core';

import Routes from './Routes';
import { ComposeContextProviders } from './shared/utility/ComposeContextProviders';

import '@mantine/core/styles.css';

const queryClient = new QueryClient();

// Set colors from before https://github.com/mantinedev/mantine/releases/tag/7.3.0
const theme = createTheme({
  colors: {
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5c5f66",
      "#373A40",
      "#2C2E33",
      "#25262b",
      "#1A1B1E",
      "#141517",
      "#101113"
    ],
  }
});
const colorSchemeManager = localStorageColorSchemeManager({ key: 'mantine-color-scheme' });

const ColorSchemeControls = ({ children }: { children: ReactNode }) => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('dark');

  const toggleColorScheme = () =>
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return children;
};
function App() {
  return (
    <ComposeContextProviders
      providers={[
        [
          MantineProvider,
          {
            theme,
            colorSchemeManager,
            defaultColorScheme: 'dark',
          },
        ],
        [ColorSchemeControls, {}],
        [QueryClientProvider, { client: queryClient }],
        [Router, {}],
      ]}
    >
      <Routes />
    </ComposeContextProviders>
  );
}

export default App;
