// import React, { useEffect, useState } from 'react';
// import RouteLoader from '../../components/shared/RouteLoader';
// import {
// 	BookPlus,
// 	BookUser,
// 	GraduationCap,
// 	House,
// 	LogOut,
// 	MenuIcon,
// 	Rocket,
// 	SquareChartGantt,
// 	TvMinimal,
// } from 'lucide-react';
// import { Link, NavLink, Outlet } from 'react-router-dom';
// import { useDeviceType } from '../../hooks/useDeviceType';

// function DashboardLayout() {
// 	const [loadingScreen, setLoadingScreen] = useState(true);
// 	const [openMenu, setOpenMenu] = useState(false);
// 	const deviceType = useDeviceType();

// 	useEffect(() => {
// 		const timer = setTimeout(() => {
// 			setLoadingScreen(false);
// 		}, 1500);
// 		return () => clearTimeout(timer);
// 	}, []);

// 	if (loadingScreen) {
// 		return <RouteLoader />;
// 	}

// 	const handleToggleMenue = (e) => {
// 		e.stopPropagation();
// 		setOpenMenu(!openMenu);
// 	};
// 	return (
// 		<div>
// 			<nav className='h-20 w-full shadow-lg bg-white fixed  md:hidden flex justify-between items-center px-4'>
// 				<MenuIcon
// 					size={32}
// 					onClick={(e) => {
// 						e.stopPropagation();
// 						handleToggleMenue(e);
// 					}}
// 					className=' cursor-pointer'
// 				/>
// 			</nav>
// 			<div className='grid grid-cols-1 md:grid md:grid-cols-[2fr_10fr]'>
// 				<aside
// 					className={` transform ${
// 						openMenu ? 'translate-y-0' : '-translate-x-full'
// 					} transition-transform duration-500 ease-in-out md:translate-x-0  md:block md:w-full md:h-screen  bg-black/10 md:bg-white border-r border-r-[#CACFD6] fixed top-0 md:static md:top-0 w-full  h-screen shadow-lg`}
// 					onClick={handleToggleMenue}
// 				>
// 					<div
// 						className={`links flex flex-col justify-between bg-white w-[85%] h-full pl-6 ${
// 							deviceType === 'iOS' ? 'pt-12 pb-44' : 'pt-8'
// 						} md:pl-6 pb-32 `}
// 						onClick={(e) => e.stopPropagation()}
// 					>
// 						<div className='flex flex-col gap-8'>
// 							<NavLink
// 								to='/me'
// 								onClick={handleToggleMenue}
// 								className={`flex items-start gap-2`}
// 							>
// 								<House /> Dashboard
// 							</NavLink>
// 							<NavLink
// 								to='/launch-pad'
// 								onClick={handleToggleMenue}
// 								className={`flex items-start gap-2`}
// 							>
// 								<Rocket />
// 								Lauch Pad
// 							</NavLink>
// 							<NavLink
// 								to='/courses'
// 								onClick={handleToggleMenue}
// 								className={`flex items-start gap-2`}
// 							>
// 								<BookUser />
// 								Courses
// 							</NavLink>
// 							<NavLink
// 								to='/lessions'
// 								onClick={handleToggleMenue}
// 								className={`flex items-start gap-2`}
// 							>
// 								<TvMinimal />
// 								Lessions
// 							</NavLink>
// 							<NavLink
// 								to='/assesements'
// 								onClick={handleToggleMenue}
// 								className={`flex items-start gap-2`}
// 							>
// 								<SquareChartGantt />
// 								Assesements
// 							</NavLink>
// 							<NavLink
// 								to='/certification'
// 								onClick={handleToggleMenue}
// 								className={`flex items-start gap-2`}
// 							>
// 								<GraduationCap />
// 								Certification
// 							</NavLink>
// 						</div>
// 						<div>
// 							<NavLink
// 								to='/logout'
// 								onClick={handleToggleMenue}
// 								className={`flex items-start gap-2`}
// 							>
// 								<LogOut />
// 								Logout
// 							</NavLink>
// 						</div>
// 					</div>
// 				</aside>
// 				<section className='w-full bg-white  md:h-screen md:overflow-y-scroll pb-9 px-6  pt-40 md:pt-4   '>
// 					<div className='bg-white   '>
// 						<Outlet />
// 					</div>
// 				</section>
// 			</div>
// 		</div>
// 	);
// }

// export default DashboardLayout;

import React, { useEffect, useState, useContext } from 'react';
import RouteLoader from '../../components/shared/RouteLoader';
import {
	BookPlus,
	BookUser,
	GraduationCap,
	House,
	LogOut,
	MenuIcon,
	Rocket,
	SquareChartGantt,
	TvMinimal,
	Settings,
} from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDeviceType } from '../../hooks/useDeviceType';
import { useAuth } from '../../context/AuthContext';

function DashboardLayout() {
	const [loadingScreen, setLoadingScreen] = useState(true);
	const [openMenu, setOpenMenu] = useState(false);
	const deviceType = useDeviceType();

	const navigate = useNavigate();
	const { user, isCurrentUser, signOutUser } = useAuth();

	useEffect(() => {
		if (user && !user.hasCompletedOnboarding) {
			navigate('/onboarding');
		}
	}, [user, navigate]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoadingScreen(false);
		}, 1500);
		return () => clearTimeout(timer);
	}, []);

	if (loadingScreen) {
		return <RouteLoader />;
	}

	const handleToggleMenu = (e) => {
		e.stopPropagation();
		setOpenMenu(!openMenu);
	};

	const handleSignOut = async () => {
		try {
			await signOutUser();
			navigate('/signin');
		} catch (error) {
			console.log('Failed to signOut');
		}
	};
	// Navigation Links
	const commonLinks = [
		{ to: '/me', icon: <House />, label: 'Dashboard' },
		{ to: '/me/launch-pad', icon: <Rocket />, label: 'Launch Pad' },
		{ to: '/me/courses', icon: <BookUser />, label: 'Courses' },
		{ to: '/me/lessons', icon: <TvMinimal />, label: 'Lessons' },
		{ to: '/me/assessments', icon: <SquareChartGantt />, label: 'Assessments' },
		{
			to: '/me/certification',
			icon: <GraduationCap />,
			label: 'Certification',
		},
	];

	const adminLinks = [
		{ to: '/me/app-settings', icon: <Settings />, label: 'App Settings' },
		{ to: '/me/create-course', icon: <BookPlus />, label: 'Create Courses' },
		{ to: '/me/students', icon: <BookPlus />, label: 'Students' },
	];

	return (
		<div>
			{/* Mobile Navigation */}
			<nav className='h-20 w-full shadow-lg bg-white fixed md:hidden flex justify-between items-center px-4'>
				<MenuIcon
					size={32}
					onClick={handleToggleMenu}
					className='cursor-pointer'
				/>
			</nav>

			<div className='grid grid-cols-1 md:grid md:grid-cols-[2fr_10fr]'>
				{/* Sidebar */}
				<aside
					className={`transform ${
						openMenu ? 'translate-y-0 overflow-y-auto ' : '-translate-x-full'
					} transition-transform duration-500 ease-in-out md:translate-x-0 md:block md:w-full md:h-screen bg-black/10 md:bg-white border-r border-r-[#CACFD6] fixed top-0 md:static md:top-0 w-full h-screen shadow-lg overflow-y-auto`}
					onClick={handleToggleMenu}
				>
					<div
						className={`links flex flex-col justify-between bg-white w-[85%] h-full pl-6 ${
							deviceType === 'iOS' ? 'pt-12 pb-44' : 'pt-8'
						} md:pl-6 pb-32`}
						onClick={(e) => e.stopPropagation()}
					>
						<div className='flex flex-col gap-8'>
							{/* Render common links */}
							{commonLinks.map((link) => (
								<NavLink
									key={link.to}
									to={link.to}
									onClick={handleToggleMenu}
									className='flex items-start gap-2'
								>
									{link.icon} {link.label}
								</NavLink>
							))}

							{/* Render admin-specific links if role is admin */}
							{user?.role === 'admin' && (
								<>
									<hr></hr>
								</>
							)}
							{user?.role === 'admin' &&
								adminLinks.map((link) => (
									<NavLink
										key={link.to}
										to={link.to}
										onClick={handleToggleMenu}
										className='flex items-start gap-2'
									>
										{link.icon} {link.label}
									</NavLink>
								))}
						</div>
						<div className='pt-8'>
							<button
								onClick={handleSignOut}
								className='flex items-center gap-2'
							>
								<LogOut /> Logout
							</button>
						</div>
					</div>
				</aside>

				{/* Main Content Area */}
				<section className='w-full bg-white md:h-screen md:overflow-y-scroll pb-9 px-6 pt-40 md:pt-4'>
					<div className='bg-white'>
						<Outlet />
					</div>
				</section>
			</div>
		</div>
	);
}

export default DashboardLayout;
