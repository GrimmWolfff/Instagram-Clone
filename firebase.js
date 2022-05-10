import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyA99aOIQ_2m7hQPuE1z-AbB7aBI6fCCxsM",
    authDomain: "instagramclone-da815.firebaseapp.com",
    projectId: "instagramclone-da815",
    storageBucket: "instagramclone-da815.appspot.com",
    messagingSenderId: "548736939566",
    appId: "1:548736939566:web:48c3c2dcab4c27d6d011bf"
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore();
export const storage = getStorage();
