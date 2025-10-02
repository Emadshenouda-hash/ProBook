import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { getAuth } from 'firebase-admin/auth';

/**
 * Firebase Admin SDK initialization
 * Used for server-side operations: storage, database, auth
 */

let firebaseAdmin: ReturnType<typeof initializeApp> | null = null;

/**
 * Normalize various bucket formats to the canonical bucket name
 * Accepts values like:
 *  - probooksolution-b724f.appspot.com
 *  - gs://probooksolution-b724f.appspot.com
 *  - https://storage.googleapis.com/probooksolution-b724f.appspot.com
 *  - probooksolution-b724f.firebasestorage.app (console UI hostname) → maps to appspot.com bucket
 */
function normalizeBucketName(input?: string): string | undefined {
  if (!input) return undefined;
  let name = input.trim();
  // Strip gs:// or https:// prefixes
  name = name.replace(/^gs:\/\//, '').replace(/^https?:\/\//, '');
  // If it's a storage.googleapis.com URL, take the path part
  if (name.startsWith('storage.googleapis.com')) {
    const parts = name.split('/');
    name = parts[1] || '';
  }
  // Accept firebasestorage.app hostnames as-is (newer Firebase UI shows this)
  // No conversion to appspot.com; use provided bucket exactly
  return name;
}

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
    const raw = JSON.parse(serviceAccount);

    // Ensure private key newlines are correct when coming from env vars
    const projectId = raw.project_id;
    const clientEmail = raw.client_email;
    const privateKey = (raw.private_key || '').replace(/\\n/g, '\n');

    // Initialize Firebase Admin with explicit fields
    const rawEnvBucket = process.env.FIREBASE_STORAGE_BUCKET;
    const envBucket = normalizeBucketName(rawEnvBucket);
    firebaseAdmin = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey
      }),
      storageBucket: envBucket || `${projectId}.appspot.com`
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

  // Prefer explicit bucket from env if provided
  const envBucket = normalizeBucketName(process.env.FIREBASE_STORAGE_BUCKET);
  const defaultBucket = storage.bucket();
  const defaultBucketName = defaultBucket.name;

  const candidates: string[] = [];
  if (envBucket) {
    candidates.push(envBucket);
    if (envBucket.endsWith('.firebasestorage.app')) {
      const project = envBucket.replace('.firebasestorage.app', '');
      candidates.push(`${project}.appspot.com`);
    }
    if (envBucket.endsWith('.appspot.com')) {
      const project = envBucket.replace('.appspot.com', '');
      candidates.push(`${project}.firebasestorage.app`);
    }
  }
  if (!candidates.includes(defaultBucketName)) {
    candidates.push(defaultBucketName);
    if (defaultBucketName.endsWith('.appspot.com')) {
      const project = defaultBucketName.replace('.appspot.com', '');
      candidates.push(`${project}.firebasestorage.app`);
    }
    if (defaultBucketName.endsWith('.firebasestorage.app')) {
      const project = defaultBucketName.replace('.firebasestorage.app', '');
      candidates.push(`${project}.appspot.com`);
    }
  }

  let bucket = defaultBucket;
  let found = false;
  let tried: string[] = [];
  for (const name of candidates) {
    const b = storage.bucket(name);
    tried.push(name);
    try {
      const [exists] = await b.exists();
      if (exists) {
        bucket = b;
        found = true;
        break;
      }
    } catch {
      // ignore and try next
    }
  }
  if (!found) {
    throw new Error(`Storage bucket not found. Tried: ${tried.join(', ')}. Ensure Cloud Storage is enabled and set FIREBASE_STORAGE_BUCKET to your bucket name (e.g., ${defaultBucketName}).`);
  }
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
