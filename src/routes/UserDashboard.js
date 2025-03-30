import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAppSettings } from '../hooks/useAppSettings';

function UserDashboard() {
	const { appDocData, loading } = useAppSettings();
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user && !user.hasCompletedOnboarding) {
			navigate('/onboarding');
		}
	}, [user, navigate]);

	if (!user) {
		return (
			<div className='h-screen flex justify-center items-cente'>
				<span>Loading user data...</span>
			</div>
		); // Loading indicator
	}
	if (loading) {
		return <p>Loading app data</p>;
	}
	return (
		<div>
			<div className=' w-full bg-zinc-800 rounded-lg p-6 '>
				<div className=' md:flex md:items-center space-x-6'>
					<div className='flex flex-col  space-y-1 bg-blue-600 rounded-lg p-6'>
						<span>Current Batch</span>
						<strong className='text-2xl uppercase'>
							{appDocData.currentBatch}
						</strong>
					</div>
					<div>
						<h1 className='text-white text-2xl'>
							<span>Weclome,</span>
							<span className=' uppercase'>{user?.fullname}</span>
						</h1>
						<span className='text-sm text-zinc-400'>
							STUDENT ID: {user.studentID}
						</span>
					</div>
				</div>
				<div className='mt-6 space-y-2'>
					<span className=' uppercase text-xs text-white'>your progress</span>
					<div className='h-2 bg-white rounded-md'>
						<div className='bg-green-700 rounded-md h-2 w-1/12'></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserDashboard;
