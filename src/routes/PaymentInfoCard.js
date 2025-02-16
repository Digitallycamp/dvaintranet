import { X } from 'lucide-react';
import React from 'react';
import { Oval } from 'react-loader-spinner';

function PaymentInfoCard({
	handleClick,
	handleCourseRegistration,
	isSubmitting,
}) {
	return (
		<div className='bg-white p-6 rounded-lg max-w-[512px] h-fit shadow-lg space-y-3 '>
			<div className='flex justify-end'>
				<button onClick={handleClick}>
					<X />
				</button>
			</div>
			<h1 className='text-zinc-800 text-2xl font-semibold'>
				Full-Stack Engineer
			</h1>
			<div>
				<h3>Pay to:</h3>

				<div className='space-x-3'>
					<strong>Account Name:</strong>
					<small className='uppercase'>Onyearizo Chimezie Wisdom</small>
				</div>
				<div className='space-x-3'>
					<strong>Account Number:</strong>
					<small>098989898989</small>
				</div>
				<div className='space-x-3'>
					<strong>Bank:</strong>
					<small>Access Bank</small>
				</div>
			</div>
			<p className='text-sm'>
				After payment click on 'I have made payment' button bellow
			</p>
			<div>
				<button
					className='order-2 sm:order-none bg-zinc-900 text-zinc-300 font-semibold px-8 py-2 rounded-md mt-auto'
					onClick={handleCourseRegistration}
				>
					{isSubmitting ? (
						<Oval width={24} height={24} />
					) : (
						'I have made payment'
					)}
				</button>
			</div>
		</div>
	);
}

export default PaymentInfoCard;
