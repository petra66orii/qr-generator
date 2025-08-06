// lib/database.ts
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  setDoc,
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Types for our database collections
export interface QRCode {
  id?: string;
  userId: string;
  type: 'url' | 'wifi' | 'contact' | 'phone' | 'text';
  data: string;
  title?: string;
  description?: string;
  customizations?: {
    size: number;
    foregroundColor: string;
    backgroundColor: string;
    errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
    logoUrl?: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isPublic: boolean;
  scanCount: number;
}

export interface UserProfile {
  id?: string;
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  subscription: {
    plan: 'free' | 'premium';
    status: 'active' | 'cancelled' | 'expired';
    currentPeriodEnd?: Timestamp;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    defaultQRSettings: {
      size: number;
      foregroundColor: string;
      backgroundColor: string;
      errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
    };
  };
  usage: {
    qrCodesCreated: number;
    aiRequestsUsed: number;
    lastResetDate: Timestamp;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface AIUsage {
  id?: string;
  userId: string;
  type: 'logo-generation' | 'design-advice';
  prompt?: string;
  result?: string;
  tokens?: number;
  cost?: number;
  createdAt: Timestamp;
}

// Collection references
export const collections = {
  qrCodes: 'qr-codes',
  users: 'users',
  aiUsage: 'ai-usage',
} as const;

// Helper function to remove undefined values from objects
const cleanUndefinedValues = (obj: any): any => {
  const cleaned: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Recursively clean nested objects
        cleaned[key] = cleanUndefinedValues(value);
      } else {
        cleaned[key] = value;
      }
    }
  }
  return cleaned;
};

// QR Code CRUD operations
export class QRCodeService {
  static async create(qrCode: Omit<QRCode, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, collections.qrCodes), {
      ...qrCode,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  }

  static async getById(id: string): Promise<QRCode | null> {
    const docRef = doc(db, collections.qrCodes, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as QRCode;
    }
    return null;
  }

  static async getByUserId(userId: string, limitCount = 50): Promise<QRCode[]> {
    const q = query(
      collection(db, collections.qrCodes),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as QRCode));
  }

  static async update(id: string, updates: Partial<QRCode>): Promise<void> {
    const docRef = doc(db, collections.qrCodes, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  }

  static async delete(id: string): Promise<void> {
    const docRef = doc(db, collections.qrCodes, id);
    await deleteDoc(docRef);
  }

  static async incrementScanCount(id: string): Promise<void> {
    const qrCode = await this.getById(id);
    if (qrCode) {
      await this.update(id, { 
        scanCount: (qrCode.scanCount || 0) + 1 
      });
    }
  }
}

// User Profile CRUD operations
export class UserService {
  static async createOrUpdate(userProfile: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    const userRef = doc(db, collections.users, userProfile.uid);
    const userDoc = await getDoc(userRef);
    
    // Clean undefined values from the user profile
    const cleanedProfile = cleanUndefinedValues(userProfile);
    
    if (userDoc.exists()) {
      // Update existing user
      await updateDoc(userRef, cleanUndefinedValues({
        ...cleanedProfile,
        updatedAt: serverTimestamp(),
      }));
    } else {
      // Create new user with defaults
      const newUserData = {
        ...cleanedProfile,
        subscription: cleanedProfile.subscription || {
          plan: 'free',
          status: 'active',
        },
        preferences: cleanedProfile.preferences || {
          theme: 'system',
          defaultQRSettings: {
            size: 256,
            foregroundColor: '#000000',
            backgroundColor: '#ffffff',
            errorCorrectionLevel: 'M',
          },
        },
        usage: cleanedProfile.usage || {
          qrCodesCreated: 0,
          aiRequestsUsed: 0,
          lastResetDate: serverTimestamp(),
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      await setDoc(userRef, cleanUndefinedValues(newUserData));
    }
  }

  static async getById(uid: string): Promise<UserProfile | null> {
    const docRef = doc(db, collections.users, uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as UserProfile;
    }
    return null;
  }

  static async updateSubscription(uid: string, subscription: UserProfile['subscription']): Promise<void> {
    const userRef = doc(db, collections.users, uid);
    await updateDoc(userRef, {
      subscription,
      updatedAt: serverTimestamp(),
    });
  }

  static async incrementUsage(uid: string, type: 'qrCodesCreated' | 'aiRequestsUsed'): Promise<void> {
    const user = await this.getById(uid);
    if (user) {
      const currentCount = user.usage[type] || 0;
      await updateDoc(doc(db, collections.users, uid), {
        [`usage.${type}`]: currentCount + 1,
        updatedAt: serverTimestamp(),
      });
    }
  }
}

// AI Usage tracking
export class AIUsageService {
  static async logUsage(usage: Omit<AIUsage, 'id' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, collections.aiUsage), {
      ...usage,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  }

  static async getByUserId(userId: string, limitCount = 100): Promise<AIUsage[]> {
    const q = query(
      collection(db, collections.aiUsage),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as AIUsage));
  }
}

// Database initialization and security rules helpers
export const initializeUserProfile = async (uid: string, email: string, displayName?: string) => {
  const userProfileData: any = {
    uid,
    email,
    subscription: {
      plan: 'free',
      status: 'active',
    },
    preferences: {
      theme: 'system',
      defaultQRSettings: {
        size: 256,
        foregroundColor: '#000000',
        backgroundColor: '#ffffff',
        errorCorrectionLevel: 'M',
      },
    },
    usage: {
      qrCodesCreated: 0,
      aiRequestsUsed: 0,
      lastResetDate: serverTimestamp(),
    },
  };

  // Only add displayName if it's not undefined
  if (displayName) {
    userProfileData.displayName = displayName;
  }

  await UserService.createOrUpdate(userProfileData);
};
