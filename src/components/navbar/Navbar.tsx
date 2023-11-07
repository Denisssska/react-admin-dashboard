import './navbar.scss';

export const Navbar = () => {
	return (
		<div className='navbar'>
			<div className='logo'>
				<img src='/logo.svg' alt='logo' />
				<span>denadmin</span>
			</div>
			<div className='icons'>
				<img src='/search.svg' alt='search' className='icon' />
				<img src='/app.svg' alt='app' className='icon' />
				<img src='/expand.svg' alt='expand' className='icon' />
				<div className='notification'>
					<img src='/notifications.svg' alt='notifications' className='icon' />
					<span>1</span>
				</div>
				<div className='user'>
					<img
						src='https://avatars.mds.yandex.net/get-music-misc/28052/img.651a9c02f910951de569b40c/orig'
						alt='user'
						className='icon'
					/>
					<span>Don</span>
				</div>
				<img src='/settings.svg' alt='settings' className='icon' />
			</div>
		</div>
	)
}
