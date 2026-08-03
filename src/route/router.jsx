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
  {
    path: '/order',
    lazy: lazyPage(() => import('../pages/order/Order.jsx')),
  },
  {
    path: '/store',
    lazy: lazyPage(() => import('../pages/store/StoreList.jsx')),
  },
  {
    path: '/store/sns',
    lazy: lazyPage(() => import('../pages/store/StoreSNS.jsx')),
  },
  {
    path: '/store-sns',
    lazy: lazyPage(() => import('../pages/store/StoreSNS.jsx')),
  },
  {
    path: '/store/info=:info',
    lazy: lazyPage(() => import('../pages/store/StoreInfo.jsx')),
  },
  {
    path: '/store/:info=:infoValue$menu=:menuValue',
    lazy: lazyPage(() => import('../pages/store/StoreMenu.jsx')),
  },
]);

export default router;