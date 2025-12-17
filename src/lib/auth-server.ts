import "server-only";
import { cookies } from "next/headers";
import { initializeApp, getApps, getApp, App, cert } from "firebase-admin/app";
import { getAuth, DecodedIdToken } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { UserProfile } from "@/lib/database";

// --- 1. Initialize Firebase Admin (Singleton) ---
// This enables server-side access with full privileges (bypassing Firestore rules)
function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApp();
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  
  // For local development, you might need a service account key if ADC isn't set up.
  // In production (Firebase App Hosting/Vercel), standard initialization often works via env vars.
  return initializeApp({
    projectId,
    // credential: cert(process.env.FIREBASE_SERVICE_ACCOUNT_KEY), // Uncomment if using a key file
  });
}

// --- 2. Authenticate User ---
export async function getCurrentUser(): Promise<DecodedIdToken | null> {
  const cookieStore = await cookies();
  // We look for a cookie named 'session' containing the Firebase ID Token
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }

  try {
    const app = getAdminApp();
    const auth = getAuth(app);
    
    // Verify the ID token passed via cookie
    // Note: If you implement robust session cookies later, switch to verifySessionCookie()
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Server Auth Error:", error);
    return null;
  }
}

// --- 3. Fetch User Profile (Admin Privilege) ---
// We use Admin SDK here because the Client SDK (UserService) won't be authenticated on the server
export async function getServerUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const app = getAdminApp();
    const db = getFirestore(app);
    
    const doc = await db.collection("users").doc(uid).get();
    
    if (!doc.exists) {
      return null;
    }

    return { id: doc.id, ...doc.data() } as UserProfile;
  } catch (error) {
    console.error("Error fetching server profile:", error);
    return null;
  }
}