// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

console.log('apikey', process.env.REACT_APP_APIKEY);
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.REACT_APP_APIKEY,
	authDomain: process.env.REACT_APP_AUTHDOMAIN,
	projectId: process.env.REACT_APP_PROJECTID,
	storageBucket: process.env.REACT_APP_STORAGE,
	messagingSenderId: process.env.REACT_APP_MESSAGEINGSENDER,
	appId: process.env.REACT_APP_APPID,
};
// const firebaseConfig = {
// 	apiKey: 'AIzaSyBrsW-0kq5fSI45o_Q9_fXbMrZ9EfNRER8',

// 	authDomain: 'fullstack-classes.firebaseapp.com',

// 	projectId: 'fullstack-classes',

// 	storageBucket: 'fullstack-classes.firebasestorage.app',

// 	messagingSenderId: '331157899761',

// 	appId: '1:331157899761:web:98f0e3ef4a35b35f8e1c50',
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, auth, db };
