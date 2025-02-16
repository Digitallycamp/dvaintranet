import {
	setDoc,
	doc,
	Timestamp,
	updateDoc,
	onSnapshot,
	serverTimestamp,
	arrayUnion,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

// const currentBatch = 'batchA2025';
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
		batches: {},
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
		batches: {},
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

/*****ADD COURSE TO USER BATCH COURSE */
export async function addCourseToBatch(userId, batchName, courseId) {
	// Prepare the course object
	const newCourse = {
		courseID: courseId,
		approved: false,
	};

	// Reference the user document
	const userRef = doc(db, 'users', userId);

	// Update the specific batch with the new course
	await updateDoc(userRef, {
		[`batches.${batchName}`]: arrayUnion(newCourse),
	});

	console.log(`Course ${courseId} added to batch ${batchName} with status `);
}
// const docData = {
// 	fullname: formValues.fullname,
// 	whatsapp_no: formValues.whatsapp_no,
// 	dob: { day: formValues.dob.day, month: formValues.dob.day },
// 	age: formValues.age,
// 	education: formValues.education,
// 	previousKnowledge: formValues.previousKnowledge,
// 	techProficiency: formValues.techProficiency,
// 	bootcampCommitment: formValues.bootcampCommitment,
// 	videoConferencingComfort: formValues.videoConferencingComfort,
// 	preferredClassTime: formValues.preferredClassTime,
// 	purpose: formValues.purpose,
// 	currentProfession: formValues.currentProfession,
// 	applicationReason: formValues.applicationReason,
// 	isSuspended: false,
// 	isCertIssued: false,
// 	hasCompletedOnboarding: false,
// 	timestamp: serverTimestamp(),
// 	batch1: {
// 		course1: {
// 			courseID456: {
// 				title: 'Firebase for Beginners',
// 				lessons: { lessonID789: { title: 'Introduction to Firebase' } },
// 			},
// 		},
// 		course2: {
// 			courseID101: {
// 				title: 'Advanced Firebase',
// 				lessons: { lessonID202: { title: 'Firebase Security' } },
// 			},
// 		},
// 	},
// 	batch2: {
// 		course1: {
// 			courseID456: {
// 				title: 'Firebase for Beginners',
// 				lessons: { lessonID789: { title: 'Introduction to Firebase' } },
// 			},
// 		},
// 		course2: {
// 			courseID101: {
// 				title: 'Advanced Firebase',
// 				lessons: { lessonID202: { title: 'Firebase Security' } },
// 			},
// 		},
// 	},
// };

// User colections

// {
// 	"users": {
// 	  "userID123": {
// 		"fullname": "John Doe",
// 		"batches": {
// 		  "batchA2025": ["courseID456", "courseID789"],
// 		  "batchB2025": ["courseID101"]
// 		}
// 	  }
// 	}
//   }

// courses collection

// {
// 	"courses": {
// 	  "courseID456": {
// 		"title": "HTML, CSS, JavaScript",
// 		"lessons": ["lessonID1", "lessonID2"]
// 	  },
// 	  "courseID789": {
// 		"title": "Full-Stack Development",
// 		"lessons": ["lessonID3"]
// 	  },
// 	  "courseID101": {
// 		"title": "UI/UX",
// 		"lessons": ["lessonID4"]
// 	  }
// 	}
//   }

// Lessons collections

// {
// 	"lessons": {
// 	  "lessonID1": { "title": "Introduction to HTML" },
// 	  "lessonID2": { "title": "CSS Basics" },
// 	  "lessonID3": { "title": "Backend Development" },
// 	  "lessonID4": { "title": "Introduction to UI/UX" }
// 	}
//   }

// import React, { useState, useEffect } from 'react';
// import db from './firebase';

// const BatchSelector = () => {
//   const [batches, setBatches] = useState([]);
//   const [selectedBatch, setSelectedBatch] = useState('');
//   const [courses, setCourses] = useState([]);
//   const [lessons, setLessons] = useState([]);

//   const userId = 'userID123'; // Replace with actual user ID

//   useEffect(() => {
//     const fetchBatches = async () => {
//       const userDoc = await db.collection('users').doc(userId).get();
//       if (userDoc.exists) {
//         const userData = userDoc.data();
//         setBatches(Object.keys(userData.batches));
//       }
//     };
//     fetchBatches();
//   }, [userId]);

//   useEffect(() => {
//     if (selectedBatch) {
//       const fetchCourses = async () => {
//         const userDoc = await db.collection('users').doc(userId).get();
//         if (userDoc.exists) {
//           const userData = userDoc.data();
//           const batchCourses = userData.batches[selectedBatch];

//           const coursePromises = batchCourses.map(courseId =>
//             db.collection('courses').doc(courseId).get()
//           );

//           const courseDocs = await Promise.all(coursePromises);
//           const courseList = courseDocs.map(doc => ({ id: doc.id, ...doc.data() }));
//           setCourses(courseList);
//         }
//       };
//       fetchCourses();
//     }
//   }, [selectedBatch, userId]);

//   const handleBatchChange = (event) => {
//     setSelectedBatch(event.target.value);
//     setLessons([]);
//   };

//   const handleCourseClick = (courseId) => {
//     const selectedCourse = courses.find(course => course.id === courseId);
//     if (selectedCourse) {
//       const fetchLessons = async () => {
//         const lessonPromises = selectedCourse.lessons.map(lessonId =>
//           db.collection('lessons').doc(lessonId).get()
//         );

//         const lessonDocs = await Promise.all(lessonPromises);
//         const lessonList = lessonDocs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setLessons(lessonList);
//       };
//       fetchLessons();
//     }
//   };

//   return (
//     <div>
//       <h2>Select Batch</h2>
//       <select onChange={handleBatchChange} value={selectedBatch}>
//         <option value="">--Select Batch--</option>
//         {batches.map(batch => (
//           <option key={batch} value={batch}>{batch}</option>
//         ))}
//       </select>

//       {courses.length > 0 && (
//         <div>
//           <h3>Courses</h3>
//           <ul>
//             {courses.map(course => (
//               <li key={course.id} onClick={() => handleCourseClick(course.id)}>
//                 {course.title}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {lessons.length > 0 && (
//         <div>
//           <h3>Lessons</h3>
//           <ul>
//             {lessons.map(lesson => (
//               <li key={lesson.id}>{lesson.title}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BatchSelector;

// UPDATE USER COURSE

// import { doc, updateDoc, arrayUnion } from "firebase/firestore";

// const firestore = firebase.firestore(); // Initialize Firestore

// // Update user's registered courses in batch A 2025
// async function updateUserCourses(userID, newCourseID) {
//   const userRef = doc(firestore, 'users', userID);

//   try {
//     await updateDoc(userRef, {
//       'batches.batchA2025': arrayUnion(newCourseID)
//     });
//     console.log("Course registered successfully.");
//   } catch (error) {
//     console.error("Error updating course: ", error);
//   }
// }

// // Usage example
// const userID = "userID123";
// const newCourseID = "courseID112";
// updateUserCourses(userID, newCourseID);

// proper way of UPDATE USER COURSE

// const docData = {
//     'batches.batchA2025': arrayUnion(newCourseID),
// };

// const docReference = doc(db, 'users', userId);

// updateDoc(docReference, docData)
//     .then(() => {
//         console.log("Course registered successfully.");
//     })
//     .catch((error) => {
//         console.error("Error updating course: ", error);
//     });

/****THE DFFERENCE Ah, let me clarify! Using updateDoc with arrayUnion specifically helps to add a new course ID to the existing array without overriding it. The approach you suggested will replace the array with the new newCourseID value, potentially removing existing course IDs in batchA2025.

If you want to make sure you are only adding to the set of courses without overwriting them, here's the correct way: */
