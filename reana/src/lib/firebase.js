import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const clientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  defaultUserId: process.env.NEXT_PUBLIC_FIREBASE_DEFAULT_USER_ID
};

let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(clientConfig);
} else {
  firebaseApp = getApps()[0];
}

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export default firebaseApp;
