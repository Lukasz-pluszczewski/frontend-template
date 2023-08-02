import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import { loadConfig } from './config';

const container = document.getElementById('root');

const root = ReactDOMClient.createRoot(container as HTMLElement);

loadConfig().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
