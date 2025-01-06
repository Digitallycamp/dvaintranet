import { createContext, useContext, useEffect, useState } from 'react';
import {
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { fetchUser } from '../utils/user';
import { doc, onSnapshot } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [role, setRole] = useState(null);
	const [isCurrentUser, setIsCurrentUser] = useState(null);
	const [authLoading, setAuthLoading] = useState(true);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			try {
				if (currentUser) {
					setIsCurrentUser(currentUser);

					const unsubscribeUser = fetchUser(currentUser.uid, (userData) => {
						setUser(userData);
					});

					// Cleanup the user snapshot listener when the component unmounts
					return () => unsubscribeUser();
					// Fetch role from Firestore or a custom claim
				} else {
					setIsCurrentUser(null);

					setUser(null);
				}
			} catch (error) {
				console.error('Error in onAuthStateChanged:', error);
			} finally {
				setAuthLoading(false);
			}
		});

		return unsubscribe;
	}, []);

	const loginWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		await signInWithPopup(auth, provider);
	};

	const signUpWithGoogle = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			return user;
		} catch (error) {
			console.error('Error during sign-up:', error.message);
		}
	};

	const signOutUser = async () => {
		await signOut(auth);
	};
	return (
		<AuthContext.Provider
			value={{
				user,
				role,
				loginWithGoogle,
				signUpWithGoogle,
				signOutUser,
				isCurrentUser,
				authLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw Error('UseAuth not used in a provider');
	}
	return context;
};
