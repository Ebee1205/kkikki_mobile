import { createBrowserRouter } from 'react-router';

const lazyPage = (importPage) => async () => {
  const module = await importPage();

  return {
    Component: module.default,
  };
};

const router = createBrowserRouter([
  {
    path: '/',
    lazy: lazyPage(() => import('./pages/HomePage.jsx')),
  },
  {
    path: '/search',
    lazy: lazyPage(() => import('./pages/SearchPage.jsx')),
  },
  {
    path: '/result',
    lazy: lazyPage(() => import('./pages/ResultPage.jsx')),
  },
]);

export default router;