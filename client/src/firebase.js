// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Correct Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-project-7505e.firebaseapp.com",
  projectId: "mern-project-7505e",
  storageBucket: "mern-project-7505e.firebasestorage.app",
  messagingSenderId: "553242120358",
  appId: "1:553242120358:web:451d0f0d87e11a4581a467"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

