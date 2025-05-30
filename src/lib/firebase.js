import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  get,
  child,
  onValue,
  query,
  orderByChild,
  limitToLast,
} from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

// console.log("🔥 DATABASE_URL:", process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL);

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export { ref, get, child, onValue, query, orderByChild, limitToLast };
