import React, { FC, Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export enum PageType {
  INDEX = '/',
  LOGIN = '/login',
  MANAGE = '/manage',
}

const routes = [
  {
    path: PageType.LOGIN,
    element: lazy(() => import('./pages/Login')),
  },
  {
    path: PageType.MANAGE,
    element: lazy(() => import('./pages/Manage')),
  },
];

const App: FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={<route.element />} />
            ))}
            <Route path="*" element={<Navigate to={PageType.LOGIN} />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
