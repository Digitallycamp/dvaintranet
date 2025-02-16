import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function StudentsList() {
	return (
		<div>
			<nav className='w-full h-20 flex space-x-20  border-b-2 border-b-slate-50'>
				<NavLink to='/me/students' className={`font-bold`}>
					All
				</NavLink>
				<NavLink to='/me/students/approved' className={`font-bold`}>
					Approved
				</NavLink>
				<NavLink to='/me/students/not-approved' className={`font-bold`}>
					Not Approved
				</NavLink>
			</nav>
			<h1>Students</h1>
			<Outlet />
			{Array.from({ length: 8 }).map((student, index) => {
				return <div>{index}</div>;
			})}
		</div>
	);
}

export default StudentsList;
