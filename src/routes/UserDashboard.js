import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
	const { user, isCurrentUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user && !user.hasCompletedOnboarding) {
			navigate('/onboarding');
		}
	}, [user, navigate]);

	console.log(user);
	if (!user) {
		return (
			<div className='h-screen flex justify-center items-cente'>
				<span>Loading user data...</span>
			</div>
		); // Loading indicator
	}
	return (
		<div>
			<div className=' w-full bg-zinc-800 rounded-lg p-6 '>
				<div className=' md:flex md:items-center space-x-6'>
					<div className='flex flex-col  space-y-1 bg-blue-600 rounded-lg p-6'>
						<span>Current Batch</span>
						<strong className='text-2xl'>BATCH A 2024</strong>
					</div>
					<div>
						<h1 className='text-white text-2xl'>
							<span>Weclome,</span>
							<span className=' uppercase'>{user?.fullname}</span>
						</h1>
						<span className='text-sm text-zinc-400'>
							STUDENT ID: DVA-IT-0451290
						</span>
					</div>
				</div>
				<div className='mt-6 space-y-2'>
					<span className=' uppercase text-xs text-white'>your progress</span>
					<div className='h-2 bg-white rounded-md'>
						<div className='bg-green-700 rounded-md h-2 w-1/4'></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserDashboard;
