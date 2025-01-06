import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import rb from '../assets/rb.png';
import RouteLoader from '../components/shared/RouteLoader';
import { days, months } from '../utils/date';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const intialValues = {
	fullname: '',
	email: '',
	whatsapp_no: '',
	dob: { day: '', month: '' },
	age: '',
	education: '',
	previousKnowledge: '',
	techProficiency: '',
	bootcampCommitment: '',
	videoConferencingComfort: '',
	preferredClassTime: '',
	purpose: '',
	currentProfession: '',
	applicationReason: '',
};
function OnboardingScreen() {
	const [loadingScreen, setIsLoadingScreen] = useState(true);
	const [formValues, setFormValues] = useState(intialValues);
	const [step, setStep] = useState(1);
	const [formError, setFormError] = useState({});

	const navigate = useNavigate();
	const { user } = useAuth();

	useEffect(() => {
		if (user && user.hasCompletedOnboarding) {
			navigate('/me');
		}
	}, [user, navigate]);

	function validateForm() {
		const newErrors = {};
		if (step === 1) {
			if (!formValues.fullname.trim())
				newErrors.fullname = 'Full name is required.';

			if (!formValues.whatsapp_no.trim())
				newErrors.whatsapp_no = 'WhatsApp number is required.';
			if (!formValues.dob.day || !formValues.dob.month)
				newErrors.dob = 'Date of birth  is required.';
			if (!formValues.age) newErrors.age = 'Age  is required.';
			if (!formValues.education)
				newErrors.education = 'Educcation is required.';
		}
		if (step === 2) {
			if (!formValues.previousKnowledge)
				newErrors.previousKnowledge = ' Filed is required';
			if (!formValues.techProficiency)
				newErrors.techProficiency = ' Filed is required';
			if (!formValues.bootcampCommitment)
				newErrors.bootcampCommitment = ' Filed is required';
			if (!formValues.videoConferencingComfort)
				newErrors.videoConferencingComfort = ' Filed is required';
			if (!formValues.preferredClassTime)
				newErrors.preferredClassTime = ' Filed is required';
		}

		if (step === 3) {
			if (!formValues.purpose) newErrors.purpose = ' Filed is required';
			if (!formValues.currentProfession)
				newErrors.currentProfession = ' Filed is required';
			if (!formValues.applicationReason)
				newErrors.applicationReason = ' Filed is required';
		}

		setFormError(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	function handleNext(event) {
		event.preventDefault();
		if (validateForm()) {
			setStep((prev) => prev + 1);
		}
	}
	function handleBack(event) {
		event.preventDefault();
		setStep((prev) => prev - 1);
	}
	useEffect(() => {
		// Simulate loading time
		const timer = setTimeout(() => {
			setIsLoadingScreen(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name.includes('dob.')) {
			const dobField = name.split('.')[1];
			setFormValues((prevValues) => ({
				...prevValues,
				dob: {
					...prevValues.dob,
					[dobField]: value,
				},
			}));
		} else {
			setFormValues((prevValues) => ({
				...prevValues,
				[name]: value,
			}));
		}
	};

	function handleSubmit(event) {
		event.preventDefault();
		if (validateForm()) {
			console.log(formValues);
		}
	}

	if (loadingScreen) {
		// Loading screen content
		return <RouteLoader />;
	}

	return (
		<main className='py-8 md:w-screen md:flex md:justify-center md:h-screen md:overflow-hidden'>
			<div className='hidden md:block md:h-screen md:w-[50%]'>
				<motion.img
					animate={{ x: [0, -5, 5, -5, 5, 0] }}
					transition={{ duration: 0.8, ease: 'easeInOut' }}
					src={rb}
					alt='Illustration'
					className='h-full'
				/>
			</div>
			<div className='w-full md:w-[50%] rounded-lg py-8 px-10 md:overflow-y-auto'>
				<header className='mb-8'>
					<h1 className='text-2xl text-center text-[#1c1d1d] font-bold'>
						Welcome to Digitally Virtual Academy – Your Gateway to Learning 🚀
					</h1>
					<h3 className='text-sm text-center text-[#1c1d1d] font-medium mt-3'>
						Discover, Learn, and Grow – All in one place.
					</h3>
				</header>
				<section>
					<p className='text-sm text-center text-[#1c1d1d] font-normal'>
						{' '}
						Started Let’s get you set up quickly so you can start learning right
						away! complet the steps to get started
					</p>
					<div className='flex items-center gap-4 mt-8 justify-center md:justify-start'>
						<div
							className={` w-12 h-12 rounded-full ${
								step === 1 ? 'bg-sky-900 text-white' : 'bg-slate-200'
							}  flex justify-center items-center `}
						>
							1
						</div>
						<div
							className={` w-12 h-12 rounded-full ${
								step === 2 ? 'bg-sky-900  text-white' : 'bg-slate-200'
							}  flex justify-center items-center `}
						>
							2
						</div>
						<div
							className={` w-12 h-12 rounded-full ${
								step === 3 ? 'bg-sky-900  text-white' : 'bg-slate-200'
							}  flex justify-center items-center `}
						>
							3
						</div>
					</div>
					<form className='mt-4 flex flex-col gap-6' onSubmit={handleSubmit}>
						{/* Section 1: Personal and Contact Information */}
						{step === 1 && (
							<fieldset className='mt-4 flex flex-col gap-4'>
								<legend className='text-lg font-semibold text-[#1c1d1d] mb-4'>
									Personal and Contact Information
								</legend>
								<div className='flex flex-col gap-2'>
									<label className='text-sm font-semibold text-[#1c1d1d]'>
										Full name (for certificate purposes)
										<span className='text-xs font-normal text-red-600'>*</span>
									</label>
									<input
										name='fullname'
										type='text'
										placeholder='Enter full name'
										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
										value={formValues.fullname}
										onChange={handleChange}
									/>
									{formError.fullname && (
										<span className='text-xs font-normal text-red-600'>
											{formError.fullname}
										</span>
									)}
								</div>
								<div className='flex flex-col gap-2'>
									<label className='text-sm font-semibold text-[#1c1d1d]'>
										Email (for certificate purposes)
										<span className='text-xs font-normal text-red-600'>*</span>
									</label>
									<input
										name='email'
										type='text'
										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
										value={formValues.email || 'text@gmail.com'}
										onChange={handleChange}
										readOnly
									/>
									{/* {formError.email && (
										<span className='text-xs font-normal text-red-600'>
											{formError.email}
										</span>
									)} */}
								</div>
								<div className='flex flex-col gap-2'>
									<label className='text-sm font-semibold text-[#1c1d1d]'>
										WhatsApp NO{' '}
										<span className='text-xs font-normal text-red-600'>*</span>
									</label>
									<input
										name='whatsapp_no'
										type='text'
										placeholder='Enter WhatsApp number'
										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
										value={formValues.whatsapp_no}
										onChange={handleChange}
									/>
									{formError.whatsapp_no && (
										<span className='text-xs font-normal text-red-600'>
											{formError.whatsapp_no}
										</span>
									)}
								</div>
								<div className='flex flex-col gap-2'>
									<label className='text-sm font-semibold text-[#1c1d1d]'>
										Date of birth
									</label>
									<div>
										<select
											className='w-1/2  h-10 px-3 rounded-md border border-[#CACFD6]'
											name='dob.day'
											value={formValues.dob.day}
											onChange={handleChange}
										>
											{days.map((day) => (
												<option key={day}>{day}</option>
											))}
										</select>
										<select
											className='w-1/2 h-10 px-3 rounded-md border border-[#CACFD6]'
											name='dob.month'
											value={formValues.dob.month}
											onChange={handleChange}
										>
											{months.map((month) => (
												<option key={month.month}>{month.label}</option>
											))}
										</select>
										{formError.dob && (
											<span className='text-xs font-normal text-red-600'>
												{formError.dob}
											</span>
										)}
									</div>
								</div>
								<div className='flex flex-col gap-2'>
									<label className='text-sm font-semibold text-[#1c1d1d]'>
										Select your age range
									</label>
									<select
										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
										name='age'
										value={formValues.age}
										onChange={handleChange}
									>
										<option>Select an option</option>
										<option>Below 20</option>
										<option>21-29</option>
										<option>30-39</option>
										<option>40-49</option>
										<option>Above 50</option>
									</select>
									{formError.age && (
										<span className='text-xs font-normal text-red-600'>
											{formError.age}
										</span>
									)}
								</div>
								<div className='flex flex-col gap-2'>
									<label className='text-sm font-semibold text-[#1c1d1d]'>
										Highest Education Level
									</label>
									<select
										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
										name='education'
										value={formValues.education}
										onChange={handleChange}
									>
										<option>Select an option</option>
										<option>Secondary School Certificate</option>
										<option>Currently an undergraduate</option>
										<option>Bachelor's Degree</option>
										<option>Masters / Post Graduate Degree</option>
									</select>
									{formError.education && (
										<span className='text-xs font-normal text-red-600'>
											{formError.education}
										</span>
									)}
								</div>
							</fieldset>
						)}

						{/* Section 2: Bootcamp Readiness and Preferences */}
						{step === 2 && (
							<fieldset className='mt-4 flex flex-col gap-4'>
								<legend className='text-lg font-semibold text-[#1c1d1d] mb-4'>
									Bootcamp Readiness and Preferences
								</legend>
								<div className='flex flex-col gap-2'>
									<label className='text-sm font-semibold text-[#1c1d1d]'>
										Do you have any previous knowledge of the course?
									</label>
									<select
										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
										name='previousKnowledge'
										value={formValues.previousKnowledge}
										onChange={handleChange}
									>
										<option>Select an option</option>
										<option>Yes</option>
										<option>No</option>
									</select>
									{formError.previousKnowledge && (
										<span className='text-xs font-normal text-red-600'>
											{formError.previousKnowledge}
										</span>
									)}
								</div>

								<div className='flex flex-col gap-2'>
									<label className=' text-sm font-semibold text-[#1c1d1d'>
										How would you rate your overall tech proficiency?
									</label>

									<div className='flex items-center gap-2'>
										<select
											type='text'
											placeholder='Enter full name'
											className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
											name='techProficiency'
											value={formValues.techProficiency}
											onChange={handleChange}
										>
											<option>Select an option</option>
											<option>Beginner</option>
											<option>Intermediate</option>
											<option>Expert</option>
										</select>
									</div>
									{formError.techProficiency && (
										<span className='text-xs font-normal text-red-600'>
											{formError.techProficiency}
										</span>
									)}
								</div>
								<div className='flex flex-col gap-2'>
									<label className='text-sm font-semibold text-[#1c1d1d]'>
										Are you ready to commit to the full bootcamp duration (6
										weeks)?
									</label>
									<select
										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
										name='bootcampCommitment'
										value={formValues.bootcampCommitment}
										onChange={handleChange}
									>
										<option>Select an option</option>
										<option>Yes</option>
										<option>No</option>
									</select>
									{formError.bootcampCommitment && (
										<span className='text-xs font-normal text-red-600'>
											{formError.bootcampCommitment}
										</span>
									)}
								</div>
								<div className='flex flex-col gap-2'>
									<label className='text-sm font-semibold text-[#1c1d1d]'>
										How comfortable are you with using video conferencing
										platforms?
									</label>
									<select
										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
										name='videoConferencingComfort'
										value={formValues.videoConferencingComfort}
										onChange={handleChange}
									>
										<option>Select an option</option>
										<option>Not comfortable</option>
										<option>Very comfortable</option>
									</select>
									{formError.videoConferencingComfort && (
										<span className='text-xs font-normal text-red-600'>
											{formError.videoConferencingComfort}
										</span>
									)}
								</div>
								<div className='flex flex-col gap-2'>
									<label className='text-sm font-semibold text-[#1c1d1d]'>
										Your preferred time for the class?
									</label>
									<select
										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
										name='preferredClassTime'
										value={formValues.preferredClassTime}
										onChange={handleChange}
									>
										<option>Select an option</option>
										<option>7PM WAT - 9PM WAT</option>
										<option>8PM WAT - 10PM WAT</option>
									</select>
									{formError.preferredClassTime && (
										<span className='text-xs font-normal text-red-600'>
											{formError.preferredClassTime}
										</span>
									)}
								</div>
							</fieldset>
						)}

						{/* Section 3: Additional Insights */}
						{step === 3 && (
							<fieldset className='mt-4 flex flex-col gap-4'>
								<legend className='text-lg font-semibold text-[#1c1d1d] mb-4'>
									Additional Insights
								</legend>
								<div className='flex flex-col gap-2'>
									<lable className=' text-sm font-semibold text-[#1c1d1d'>
										What is your purpose of taking this course?{' '}
										<span className='text-xs  font-normal'>
											We want to understand your needs
											<span className='text-red-600'>*</span>
										</span>
									</lable>
									<select
										type='text'
										placeholder='Enter full name'
										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
										value={formValues.purpose}
										name='purpose'
										onChange={handleChange}
									>
										<option>Select an option</option>
										<option>To transition into Tech</option>
										<option>To land a new job</option>
										<option>To upkill my what i already know</option>
										<option>LinkedIn</option>
										<option>Career switch</option>
									</select>
									{formError.purpose && (
										<span className='text-xs font-normal text-red-600'>
											{formError.purpose}
										</span>
									)}
								</div>
								<div className='flex flex-col gap-2'>
									<label className='text-sm font-semibold text-[#1c1d1d]'>
										What do you do currently?
									</label>
									<input
										type='text'
										placeholder='Enter profession'
										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
										value={formValues.currentProfession}
										name='currentProfession'
										onChange={handleChange}
									/>
									{formError.currentProfession && (
										<span className='text-xs font-normal text-red-600'>
											{formError.currentProfession}
										</span>
									)}
								</div>
								<div className='flex flex-col gap-2'>
									<label className='text-sm font-semibold text-[#1c1d1d]'>
										Why should we accept your application?
									</label>
									<textarea
										className='w-full h-20 px-3 rounded-md border border-[#CACFD6]'
										placeholder='Write here'
										value={formValues.applicationReason}
										name='applicationReason'
										onChange={handleChange}
									></textarea>
									{formError.applicationReason && (
										<span className='text-xs font-normal text-red-600'>
											{formError.applicationReason}
										</span>
									)}
								</div>
							</fieldset>
						)}

						<div className='flex justify-between mt-4'>
							{step > 1 && (
								<motion.button
									initial={{ scale: 0.9, backgroundColor: '#F4F4F6' }}
									whileHover={{ scale: 1, backgroundColor: '#F4F4F6' }}
									transition={{ duration: 0.3 }}
									className='border border-[#CACFD6] py-2 px-4 rounded-lg flex justify-center items-center gap-2 bg-[#F4F4F6]'
									onClick={handleBack}
								>
									<span className='text-[#1c1d1d] font-bold'>Back</span>
								</motion.button>
							)}
							{step < 3 ? (
								<motion.button
									disabled={!Object.keys(formError).length === 0}
									initial={{ scale: 0.9, backgroundColor: '#1c1d1d' }}
									whileHover={{ scale: 1, backgroundColor: '#0B0C11' }}
									transition={{ duration: 0.3 }}
									className='border border-[#CACFD6] py-2 px-4 rounded-lg flex justify-center items-center gap-2 bg-[#F4F4F6]'
									onClick={handleNext}
								>
									<span className='text-[#fff] font-bold'>Continue</span>
								</motion.button>
							) : (
								''
							)}
						</div>

						{step === 3 && (
							<motion.button
								initial={{ scale: 0.9, backgroundColor: '#1c1d1d' }}
								whileHover={{ scale: 1, backgroundColor: '#0B0C11' }}
								transition={{ duration: 0.3 }}
								className='border border-[#CACFD6] py-2 rounded-lg flex justify-center items-center gap-2 bg-[#F4F4F6]'
							>
								<span className='text-[#fff] font-bold'>Get Started</span>
							</motion.button>
						)}
					</form>
				</section>
			</div>
		</main>
	);
}

export default OnboardingScreen;
