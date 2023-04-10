import React from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import Home from './Home/Home';
import CatPage from './CatPage/CatPage';
import NotFound from './404';

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="cat" element={<CatPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </ReactRouterRoutes>
  );
}
