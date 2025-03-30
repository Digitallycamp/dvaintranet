import React from 'react';

function AppSetting() {
	return (
		<div className='p-8 max-w-lg mx-auto bg-white border rounded-lg '>
			<h3 className='text-2xl font-bold mb-6'>Start New Batch</h3>
			<form className='space-y-4'>
				<div>
					<label className='block text-gray-700 font-medium mb-2'>
						Enter batch name
					</label>
					<input
						type='text'
						placeholder='Create new batch name'
						className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
					<span className='text-red-500 text-sm'></span>
				</div>
				<button className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
					Create
				</button>
			</form>

			<hr className='my-8' />

			<form className='space-y-4'>
				<h3 className='text-2xl font-bold mb-6'>Set New Batch</h3>
				<div>
					<input
						type='text'
						placeholder='App Name'
						className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
					<span className='text-red-500 text-sm'></span>
				</div>
				<div>
					<select className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
						<option>--Set Current Batch--</option>
						<option>batchA2025</option>
					</select>
					<span className='text-red-500 text-sm'></span>
				</div>
				<button className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600'>
					Update
				</button>
			</form>
		</div>
	);
}

export default AppSetting;
