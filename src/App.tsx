import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import './styles/global.scss';

import { Footer, Menu, Navbar } from './components';

import { Home, Login, Product, Products, SignUp, User, Users } from './pages';

const queryClient = new QueryClient();
const App = () => {
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
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,

      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/users',
          element: <Users />,
        },
        {
          path: '/products',
          element: <Products />,
        },
        {
          path: '/users/:id',
          element: <User />,
          // errorElement: <ErrorBoundary />,
        },
        {
          path: '/products/:id',
          element: <Product />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signup',
          element: <SignUp />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
