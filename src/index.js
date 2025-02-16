import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Settings from './routes/admin/Settings/Settings';
import OnboardingScreen from './routes/OnboardingScreen';
import { AuthProvider } from './context/AuthContext';
import StudentsList from './routes/admin/StudentsList/StudentsList';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import Courses from './routes/Courses';
import CourseDetails from './routes/CourseDetails';
import Lessons from './routes/Lessons';
import MyCourses from './routes/MyCourses';
const Login = lazy(() => import('./routes/Login'));
const SignUp = lazy(() => import('./routes/SignUp'));
const UserDashboardLayout = lazy(() =>
	import('./layout/shared/DashboardLayout')
);

const ProtectedRoute = lazy(() => import('./routes/ProtectedRoute'));

const UserDashboard = lazy(() => import('./routes/UserDashboard'));
const AppSettings = lazy(() => import('./routes/admin/AppSettings/AppSetting'));
const CreateCourse = lazy(() =>
	import('./routes/admin/CreateCourse/CreateCourse')
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<Suspense>
					<Routes>
						{/* public route for both user and admin */}

						<Route index element={<Login />} />
						<Route path='/signup' element={<SignUp />} />
						<Route path='/signin' element={<Login />} />
						<Route path='onboarding' element={<OnboardingScreen />} />
						{/* User routes */}
						<Route
							path='/me'
							element={
								<ProtectedRoute>
									<UserDashboardLayout />
								</ProtectedRoute>
							}
						>
							<Route index element={<UserDashboard />} />
							<Route path='settings' element={<h1>Setings</h1>} />
							<Route path='launch-pad' element={<h1>Launch pad</h1>} />
							<Route path='courses' element={<Courses />} />
							<Route path='my-courses' element={<MyCourses />} />
							<Route path='courses/:id' element={<CourseDetails />} />
							<Route path='lessons' element={<Lessons />} />

							<Route
								path='app-settings'
								element={
									<ProtectedRoute allowedRoles={['admin']}>
										<AppSettings />
									</ProtectedRoute>
								}
							/>
							<Route
								path='create-course'
								element={
									<ProtectedRoute allowedRoles={['admin']}>
										<CreateCourse />
									</ProtectedRoute>
								}
							/>
							<Route
								path='students'
								element={
									<ProtectedRoute allowedRoles={['admin']}>
										<StudentsList />
									</ProtectedRoute>
								}
							>
								<Route
									path='approved'
									element={
										<ProtectedRoute allowedRoles={['admin']}>
											<p>Approved</p>
										</ProtectedRoute>
									}
								/>
								<Route
									path='not-approved'
									element={
										<ProtectedRoute allowedRoles={['admin']}>
											<p>Not Approved</p>
										</ProtectedRoute>
									}
								/>
							</Route>
						</Route>
						<Route path='*' element={<h1>Not Found</h1>} />
					</Routes>
				</Suspense>
			</AuthProvider>

			<Toaster position='top-center' />
			<ToastContainer />
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
