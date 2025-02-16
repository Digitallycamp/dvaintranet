import React from 'react';

function Modal({ children }) {
	return (
		<div className='w-full h-full flex justify-center items-center  transition-all fixed left-1/2 -translate-x-1/2  top-0 z-50 bg-black/30'>
			{children}
		</div>
	);
}

export default Modal;
