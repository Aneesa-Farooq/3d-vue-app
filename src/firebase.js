import "firebase/firestore";
//import firebase from "firebase/app"
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBDZ73adY0AdPQYXu8yCUE30EJY468KGoo",
  authDomain: "d-ar-ffab5.firebaseapp.com",
  projectId: "d-ar-ffab5",
  storageBucket: "d-ar-ffab5.appspot.com",
  messagingSenderId: "69821666254",
  appId: "1:69821666254:web:efa9897a147b829eded19f",
  measurementId: "G-XZECGE5JJQ"
  };
const app=initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
export { db, storage };