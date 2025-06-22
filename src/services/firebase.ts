import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyABtZ_IxvlVfYxuClRnTSK40o7-P4HeOHo",
  authDomain: "puusti-3dce9.firebaseapp.com",
  projectId: "puusti-3dce9",
  storageBucket: "puusti-3dce9.firebasestorage.app",
  messagingSenderId: "905755735143",
  appId: "1:905755735143:web:fdbfa2f41d1ba6350e90c2",
  measurementId: "G-25H9V5GBBK"
};

export const app = initializeApp(firebaseConfig);
console.log('Firebase app initialized:', app.name);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);

onAuthStateChanged(auth, user => {
    console.log('Auth state changed, currentUser =', user);
  });