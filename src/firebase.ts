import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyCebvmsccLVl75ci5Abr7QP1UIEvg6FyfQ',
  authDomain: 'anonimuschat-133c1.firebaseapp.com',
  projectId: 'anonimuschat-133c1',
  storageBucket: 'anonimuschat-133c1.appspot.com',
  messagingSenderId: '923891462008',
  appId: '1:923891462008:web:872a24174e95b0cdfbe28d',
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
