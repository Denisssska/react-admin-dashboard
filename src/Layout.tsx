import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Outlet } from 'react-router-dom';

import { Footer, Menu, Navbar } from './components';

import { ToasterProvider } from './providers/ToasterProvider';
const queryClient = new QueryClient();

const Layout = () => {
  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </div>
      </div>
      <Footer />
      <ToasterProvider />
    </div>
  );
};
export default Layout;
