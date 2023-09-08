// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdth2OELTS0iUU8CMm55pmV4meWGp94fU",
  authDomain: "twitter-clone-yt-31782.firebaseapp.com",
  projectId: "twitter-clone-yt-31782",
  storageBucket: "twitter-clone-yt-31782.appspot.com",
  messagingSenderId: "992766205030",
  appId: "1:992766205030:web:3ae86147163aadd0b2e1a7",
};

// Initialize Firebase
// Checkin if no app is being used, init the app with the configuration else use the current App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
