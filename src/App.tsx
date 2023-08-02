import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core';

import Routes from './Routes';
import { ComposeContextProviders } from './shared/utility/ComposeContextProviders';

const queryClient = new QueryClient();

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-stackblitz-theme',
    defaultValue: 'dark',
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ComposeContextProviders
      providers={[
        [ColorSchemeProvider, { colorScheme, toggleColorScheme }],
        [MantineProvider, { theme: { colorScheme }, withGlobalStyles: true, withNormalizeCSS: true }],
        [QueryClientProvider, { client: queryClient }],
        [Router, {}],
      ]}
    >
      <Routes />
    </ComposeContextProviders>
  );
}

export default App;
