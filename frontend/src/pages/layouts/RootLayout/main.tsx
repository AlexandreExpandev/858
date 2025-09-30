import { Outlet } from 'react-router-dom';

/**
 * @component RootLayout
 * @summary The top-level layout component that simply renders child routes.
 * @type layout-component
 * @category navigation
 */
export const RootLayout = () => {
  return <Outlet />;
};
