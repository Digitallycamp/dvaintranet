import React from 'react';

function StudentsList() {
	return (
		<div>
			<h1>Students</h1>
			{Array.from({ length: 8 }).map((student, index) => {
				return <div>{index}</div>;
			})}
		</div>
	);
}

export default StudentsList;
