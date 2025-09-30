import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { getAuth } from 'firebase-admin/auth';

/**
 * Firebase Admin SDK initialization
 * Used for server-side operations: storage, database, auth
 */

let firebaseAdmin: ReturnType<typeof initializeApp> | null = null;

export function initFirebase() {
  if (firebaseAdmin) return firebaseAdmin;
  
  // Check if already initialized
  if (getApps().length > 0) {
    firebaseAdmin = getApps()[0]!;
    return firebaseAdmin;
  }

  try {
    // Get credentials from environment variable
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
    
    if (!serviceAccount) {
      console.warn('Firebase not configured: FIREBASE_SERVICE_ACCOUNT missing');
      return null;
    }

    // Parse the JSON service account
    const credentials = JSON.parse(serviceAccount);

    // Initialize Firebase Admin
    firebaseAdmin = initializeApp({
      credential: cert(credentials),
      storageBucket: `${credentials.project_id}.appspot.com`
    });

    console.log('✅ Firebase Admin initialized successfully');
    return firebaseAdmin;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return null;
  }
}

/**
 * Get Firestore database instance
 */
export function getFirebaseDB() {
  const app = initFirebase();
  if (!app) return null;
  
  try {
    return getFirestore(app);
  } catch (error) {
    console.error('Firestore error:', error);
    return null;
  }
}

/**
 * Get Firebase Storage instance
 */
export function getFirebaseStorage() {
  const app = initFirebase();
  if (!app) return null;
  
  try {
    return getStorage(app);
  } catch (error) {
    console.error('Storage error:', error);
    return null;
  }
}

/**
 * Get Firebase Auth instance
 */
export function getFirebaseAuth() {
  const app = initFirebase();
  if (!app) return null;
  
  try {
    return getAuth(app);
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

/**
 * Upload file to Firebase Storage
 */
export async function uploadToFirebase(file: Buffer, path: string, contentType: string = 'image/jpeg') {
  const storage = getFirebaseStorage();
  if (!storage) throw new Error('Firebase Storage not initialized');

  const bucket = storage.bucket();
  const fileRef = bucket.file(path);

  await fileRef.save(file, {
    metadata: { contentType },
    public: true
  });

  // Get public URL
  const publicUrl = `https://storage.googleapis.com/${bucket.name}/${path}`;
  
  return { url: publicUrl, path };
}

/**
 * Save data to Firestore
 */
export async function saveToFirestore(collection: string, data: any) {
  const db = getFirebaseDB();
  if (!db) throw new Error('Firestore not initialized');

  const docRef = await db.collection(collection).add({
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  return { id: docRef.id, ...data };
}

/**
 * Get documents from Firestore
 */
export async function getFromFirestore(collection: string, limit: number = 100) {
  const db = getFirebaseDB();
  if (!db) return [];

  const snapshot = await db.collection(collection).limit(limit).orderBy('createdAt', 'desc').get();
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
