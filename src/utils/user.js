import {
	setDoc,
	doc,
	Timestamp,
	updateDoc,
	onSnapshot,
	serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

export async function setUser(userId, currentUserEmail) {
	const docData = {
		userId: userId,
		email: currentUserEmail,
		isSuspended: false,
		isCertIssued: false,
		hasCompletedOnboarding: false,
		role: 'user',
		registeredDate: Timestamp.now(),
		fullname: '',
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
	const docReference = doc(db, 'users', userId);
	await setDoc(docReference, docData);
}

export function onboardUser(userId, formValues) {
	const docData = {
		// userId: userId,
		fullname: formValues.fullname,
		// email: currentUserEmail,
		whatsapp_no: formValues.whatsapp_no,
		dob: { day: formValues.dob.day, month: formValues.dob.day },
		age: formValues.age,
		education: formValues.education,
		previousKnowledge: formValues.previousKnowledge,
		techProficiency: formValues.techProficiency,
		bootcampCommitment: formValues.bootcampCommitment,
		videoConferencingComfort: formValues.videoConferencingComfort,
		preferredClassTime: formValues.preferredClassTime,
		purpose: formValues.purpose,
		currentProfession: formValues.currentProfession,
		applicationReason: formValues.applicationReason,
		isSuspended: false,
		isCertIssued: false,
		hasCompletedOnboarding: false,

		timestamp: serverTimestamp(),
	};

	const docReference = doc(db, 'users', userId);
	const updatedData = updateDoc(docReference, docData);

	return updatedData;
}

export function hasCompletedOnboarding(userId, setComplete) {
	const docData = {
		hasCompletedOnboarding: setComplete,
	};

	const docReference = doc(db, 'users', userId);
	updateDoc(docReference, docData);
}
export async function fetchUserRole(userId) {
	console.log('0o0o0ikkj');
}

export async function setUserFiledOnRegistration(userId) {
	try {
		const docReference = doc(db, 'users', userId);
		const unsubscribe = onSnapshot(docReference, (doc) => {
			return doc.data();
		});

		return unsubscribe;
	} catch (error) {
		console.log('failed to fetch student info', error.message);
	}
}

export function fetchUser(userId, callback) {
	try {
		const docReference = doc(db, 'users', userId);
		const unsubscribe = onSnapshot(docReference, (docSnapshot) => {
			if (docSnapshot.exists()) {
				callback(docSnapshot.data());
			} else {
				console.error('No such user exists!');
				callback(null);
			}
		});

		// Return the unsubscribe function for cleanup
		return unsubscribe;
	} catch (error) {
		console.error('Failed to fetch user info:', error.message);
		callback(null);
		return () => {};
	}
}
