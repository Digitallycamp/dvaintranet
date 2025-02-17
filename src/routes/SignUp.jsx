import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import google from '../assets/google.svg';
import github from '../assets/github.svg';
import brandLogo from '../assets/dva_logo.svg';
import illust from '../assets/side-view-man-using-personal-computer-home.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { setUserFiledOnRegistration, setUser } from '../utils/user';
import { setDoc, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
function SignUp() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();
	const { signUpWithGoogle, user, isCurrentUser } = useAuth();

	const handleSignUp = async () => {
		try {
			setIsSubmitting(true);

			await new Promise((resolve) => setTimeout(resolve(), 500));
			const user = await signUpWithGoogle();

			//

			// const provider = new GoogleAuthProvider();
			// const result = await signInWithPopup(auth, provider);
			// const user = result.user;

			// const docReference = doc(db, 'users', user.uid);
			// await setDoc(docReference, {
			// 	userId: user.uid,
			// 	fullname: '',
			// 	email: user.email,
			// 	whatsapp_no: '',
			// 	dob: { day: '', month: '' },
			// 	age: '',
			// 	education: '',
			// 	previousKnowledge: '',
			// 	techProficiency: '',
			// 	bootcampCommitment: '',
			// 	videoConferencingComfort: '',
			// 	preferredClassTime: '',
			// 	purpose: '',
			// 	currentProfession: '',
			// 	applicationReason: '',
			// 	isSuspended: false,
			// 	isCertIssued: false,
			// 	hasCompletedOnboarding: false,
			// 	role: 'user',
			// 	registeredDate: Timestamp.now(),
			// });
			await setUser(user.uid, user.email);
			const student = setUserFiledOnRegistration(user.uid);
			if (student.hasCompletedOnboarding) {
				navigate('/me');
			}
			navigate('/onboarding');
		} catch (error) {
			console.error('Error during sign-up:', error.message);
		} finally {
			setIsSubmitting(false);
		}
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
							Register
						</h1>
						<div className='flex flex-col space-y-6 mt-9'>
							<motion.button
								initial={{ scale: 0.9 }}
								whileHover={{ scale: 1 }}
								className='border border-[#CACFD6] py-2 rounded-lg flex justify-center items-center gap-2 bg-[#F4F4F6]'
								onClick={handleSignUp}
							>
								<img src={google} alt='google logo' width={32} height={32} />{' '}
								<span className=' text-[#1c1d1d] font-bold '>
									{isSubmitting ? 'Submitting..' : 'Continue with Google'}
								</span>
							</motion.button>
							<motion.button
								disabled={isSubmitting}
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
							<span>Already have an account?</span>

							<Link to='/signin'>Sign in</Link>
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}

export default SignUp;
