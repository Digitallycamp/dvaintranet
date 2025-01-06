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
	return <div>UserDashboard {user?.email} </div>;
}

export default UserDashboard;
