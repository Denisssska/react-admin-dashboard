import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Footer, Menu, Navbar } from './components';
import { Home, Login, Products, Users } from './pages';
import './styles/global.scss';
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
						<Outlet />
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
					path: 'users',
					element: <Users />,
				},
				{
					path: 'products',
					element: <Products />,
				},
			],
		},{
      path:'login',
      element:<Login/>
    }
	])
	return <RouterProvider router={router} />
}

export default App
