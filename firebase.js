// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/firebase-storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDePiD9_lhNm1j52P5hfEalGAqwjVjeAIU",
  authDomain: "greatfaith-69041.firebaseapp.com",
  databaseURL: "https://greatfaith-69041-default-rtdb.firebaseio.com",
  projectId: "greatfaith-69041",
  storageBucket: "greatfaith-69041.appspot.com",
  messagingSenderId: "378785271957",
  appId: "1:378785271957:web:a03ac1627a82115343cb9c",
  measurementId: "G-8YMJJFGTTK"
};

// Initialize Firebase
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig): getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };