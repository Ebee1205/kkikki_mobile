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
    lazy: lazyPage(() => import('../App.jsx')),
  },
]);

export default router;