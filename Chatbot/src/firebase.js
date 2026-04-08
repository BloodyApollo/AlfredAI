import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "alfredai-31818.firebaseapp.com",
  projectId: "alfredai-31818",
  storageBucket: "alfredai-31818.firebasestorage.app",
  messagingSenderId: "527412585974",
  appId: "1:527412585974:web:9ece6143efd9c41a0893d7",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// optional test
export async function testAdd() {
  const docRef = await addDoc(collection(db, "users"), {
    email: "happyme@imtired.com",
  });
  console.log("ID:", docRef.id);
}