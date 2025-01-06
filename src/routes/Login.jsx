import React from 'react';
import { motion } from 'motion/react';
import google from '../assets/google.svg';
import github from '../assets/github.svg';
import brandLogo from '../assets/dva_logo.svg';
import illust from '../assets/side-view-man-using-personal-computer-home.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
	const { loginWithGoogle } = useAuth();
	const navigate = useNavigate();

	const handleSubmitWithGoogle = async () => {
		await loginWithGoogle();

		navigate('/me');
	};
	return (
		<main className=' w-screen h-screen overflow-hidden  bg-[#EEE6E3] '>
			<div className=' w-full md:flex'>
				<div className=' h-[40vh] md:h-screen md:w-[60%]'>
					<img src={illust} alt='Illustration' className='h-full' />
				</div>
				<div className='px-4 md:flex-1 md:flex md:flex-col md:justify-center'>
					<div className='flex justify-center mb-4 mt-6'>
						<img src={brandLogo} alt='Digitally Virtual Academy' />
					</div>
					<div className='w-full max-w-[512px] mx-auto  rounded-lg p-8'>
						<h1 className=' text-center font-bold text-2xl text-[#1c1d1d]'>
							Welcome Back
						</h1>
						<div className='flex flex-col space-y-6 mt-9'>
							<motion.button
								initial={{ scale: 0.9 }}
								whileHover={{ scale: 1 }}
								className='border border-[#CACFD6] py-2 rounded-lg flex justify-center items-center gap-2 bg-[#F4F4F6]'
								onClick={handleSubmitWithGoogle}
							>
								<img src={google} alt='google logo' width={32} height={32} />{' '}
								<span className=' text-[#1c1d1d] font-bold '>
									Continue with Google
								</span>
							</motion.button>
							<motion.button
								initial={{ scale: 0.9 }}
								whileHover={{ scale: 1 }}
								className='border border-[#CACFD6] py-2 rounded-lg flex justify-center items-center gap-2 bg-[#F4F4F6]'
							>
								<img src={github} alt='github logo' width={32} height={32} />{' '}
								<span className=' text-[#1c1d1d] font-bold '>
									Continue with Github
								</span>
							</motion.button>
						</div>
						<hr />
						<p className='text-center mt-8 font-bold space-x-2'>
							<span>Dont you have an account?</span>
							<a href='/signup' className='text-blue-900'>
								Sign up
							</a>
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Login;
