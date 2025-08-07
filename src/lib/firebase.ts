// lib/firebase.ts
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Lazy initialization to avoid build-time issues
let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

function getFirebaseApp(): FirebaseApp {
  if (!app && typeof window !== 'undefined') {
    // Only initialize on client side or when environment variables are available
    if (firebaseConfig.apiKey && firebaseConfig.projectId) {
      app = initializeApp(firebaseConfig);
    }
  }
  return app!;
}

function getFirebaseAuth(): Auth {
  if (!authInstance && typeof window !== 'undefined') {
    authInstance = getAuth(getFirebaseApp());
  }
  return authInstance!;
}

function getFirebaseDb(): Firestore {
  if (!dbInstance) {
    // Allow server-side initialization with valid config
    if (firebaseConfig.apiKey && firebaseConfig.projectId) {
      if (!app) {
        app = initializeApp(firebaseConfig);
      }
      dbInstance = getFirestore(app);
      
      // Connect to Firestore emulator in development
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true') {
        try {
          connectFirestoreEmulator(dbInstance, 'localhost', 8080);
        } catch (error) {
          console.log('Firestore emulator already connected');
        }
      }
    }
  }
  return dbInstance!;
}

// Export getters instead of instances
export { getFirebaseAuth as auth, getFirebaseDb as db };
