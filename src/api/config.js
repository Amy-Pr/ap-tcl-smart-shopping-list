import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// My configuration
const firebaseConfig = {
	apiKey: 'AIzaSyC2gYe75Qnno_rwBsWMNtuBqoC5hZrilFg',
	authDomain: 'ap-tcl-smart-shopping-list.firebaseapp.com',
	projectId: 'ap-tcl-smart-shopping-list',
	storageBucket: 'ap-tcl-smart-shopping-list.appspot.com',
	messagingSenderId: '588431735651',
	appId: '1:588431735651:web:ac3dc2408ba9ef4a99b156',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
