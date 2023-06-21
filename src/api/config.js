import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
//Original configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCp5Q7injiGTEKhPMBvq25n2CYzRegXPbQ",
//   authDomain: "tcl-57-smart-shopping-list.firebaseapp.com",
//   projectId: "tcl-57-smart-shopping-list",
//   storageBucket: "tcl-57-smart-shopping-list.appspot.com",
//   messagingSenderId: "218407207047",
//   appId: "1:218407207047:web:febc6b43d7acb01f43f822"
// };

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
