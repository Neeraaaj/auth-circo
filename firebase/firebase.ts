import {initializeApp, getApp, getApps} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAGXcaR7JIvM0oUHjp8pjVjMhK7i2eSk-E",
  authDomain: "fir-auth-f9f6b.firebaseapp.com",
  projectId: "fir-auth-f9f6b",
  storageBucket: "fir-auth-f9f6b.appspot.com",
  messagingSenderId: "843740460260",
  appId: "1:843740460260:web:194127f0895fbde30a28f1",
  measurementId: "G-8NEET5DQE8"
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);

export {auth, firestore, app};