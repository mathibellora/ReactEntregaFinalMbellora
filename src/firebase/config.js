import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGPm-h-KLMJzWkaSJUzkUtCvV0RKRMQj0",
  authDomain: "reactentregafinalmbellora-db.firebaseapp.com",
  projectId: "reactentregafinalmbellora-db",
  storageBucket: "reactentregafinalmbellora-db.firebasestorage.app",
  messagingSenderId: "178107413370",
  appId: "1:178107413370:web:4bd721b2c0a2d50c991cc3"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);