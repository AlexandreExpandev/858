import { Outlet } from 'react-router-dom';

/**
 * @component RootLayout
 * @summary The root layout component for the entire application.
 * @domain core
 * @type layout-component
 * @category layout
 */
export const RootLayout = () => {
  return (
    <div className="root-layout">
      <Outlet />
    </div>
  );
};
