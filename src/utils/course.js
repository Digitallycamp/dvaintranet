/****fetch user data **/
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export async function getCourses() {
	let courses = [];
	console.log(courses);
	try {
		/**Get all doc in a colection**/
		const collectionRef = collection(db, 'courses');
		/** This login is getting all the courses doc  */
		const querysnapshot = await getDocs(collectionRef);
		querysnapshot.forEach((doc) => {
			courses.push({ id: doc.id, ...doc.data() });
		});

		return courses;
	} catch (error) {
		console.log(error);
	}
}
