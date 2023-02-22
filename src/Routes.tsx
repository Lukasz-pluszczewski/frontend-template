import React from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import Home from './Home/Home';
import Page from './Page/Page';
import NotFound from './404';

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="page" element={<Page />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </ReactRouterRoutes>
  );
}
