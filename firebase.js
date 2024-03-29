// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps, setLogLevel } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  experimentalForceLongPolling: true, // this line
  useFetchStreams: false, // and this line
};

// Initialize Firebase
// Checkin if no app is being used, init the app with the configuration else use the current App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
setLogLevel('debug');
console.log('##################################');
console.log('Logging from firebase configuration');
console.log('projectId :', process.env.NEXT_PUBLIC_PROJECT_ID);

export default app;
export { db, storage };
