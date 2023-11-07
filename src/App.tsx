import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Footer, Menu, Navbar } from './components';
import { Home, Login, Product, Products, User, Users } from './pages';
import './styles/global.scss';
import { ErrorBoundary } from './components/error/ErrorBoundary';

const scroll = {
	'::-webkit-scrollbar': { width: '4px', borderRadius: '10px', backgroundColor: '#f9f9fd' },
	'::-webkit-scrollbar-thumb': { borderRadius: '10px', backgroundColor: 'gray' },
	'::-webkit-scrollbar-track': {
		boxShadow: 'inset 0 0 6px rgba(0,0,0,0.2)',
		borderRadius: '10px',
		backgroundColor: '#f9f9fd',
	}
} as React.CSSProperties
const queryClient = new QueryClient;
const App = () => {
	const Layout = () => {
		return (
			<div className='main'>
				<Navbar />
				<div className='container'>
					<div className='menuContainer'>
						<Menu />
					</div>
					<div className='contentContainer'>
						<QueryClientProvider client={queryClient}>
							<Outlet />
						</QueryClientProvider>
					</div>
				</div>
				<Footer />
			</div>
		)
	}

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
			],
		},
		{
			path: '/login',
			element: <Login />,
		},
	])
	return <RouterProvider router={router} />
}

export default App
