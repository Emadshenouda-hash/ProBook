import type { NextApiRequest, NextApiResponse } from 'next';
import { initFirebase, getFirebaseDB, getFirebaseStorage, getFirebaseAuth } from '../../utils/firebase';

/**
 * Firebase Integration Test Endpoint
 * Visit /api/test-firebase to verify Firebase Admin SDK is working
 * 
 * ⚠️ SECURITY: Remove or protect this endpoint in production
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const results = {
    environment: {
      hasServiceAccount: !!process.env.FIREBASE_SERVICE_ACCOUNT,
      serviceAccountLength: process.env.FIREBASE_SERVICE_ACCOUNT?.length || 0,
      nodeEnv: process.env.NODE_ENV
    },
    initialization: {
      app: false,
      firestore: false,
      storage: false,
      auth: false
    },
    projectInfo: {} as any,
    errors: [] as string[],
    warnings: [] as string[]
  };

  try {
    // Test Firebase initialization
    const app = initFirebase();
    results.initialization.app = !!app;

    if (!app) {
      results.errors.push('Firebase app failed to initialize');
      results.warnings.push('Check FIREBASE_SERVICE_ACCOUNT environment variable');
    }

    if (app) {
      try {
        // Get project info from service account
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
        results.projectInfo = {
          projectId: serviceAccount.project_id,
          clientEmail: serviceAccount.client_email,
          storageBucket: `${serviceAccount.project_id}.appspot.com`,
          hasPrivateKey: !!serviceAccount.private_key
        };
      } catch (e: any) {
        results.errors.push(`Project info parse error: ${e.message}`);
      }

      // Test Firestore
      try {
        const db = getFirebaseDB();
        results.initialization.firestore = !!db;
        
        if (db) {
          // Try to list collections (Admin SDK can do this)
          const collections = await db.listCollections();
          results.projectInfo.collections = collections.map(c => c.id);
        }
      } catch (e: any) {
        results.errors.push(`Firestore error: ${e.message}`);
      }

      // Test Storage
      try {
        const storage = getFirebaseStorage();
        results.initialization.storage = !!storage;
        
        if (storage) {
          const bucket = storage.bucket();
          results.projectInfo.bucketName = bucket.name;
        }
      } catch (e: any) {
        results.errors.push(`Storage error: ${e.message}`);
      }

      // Test Auth
      try {
        const auth = getFirebaseAuth();
        results.initialization.auth = !!auth;
      } catch (e: any) {
        results.errors.push(`Auth error: ${e.message}`);
      }
    }
  } catch (error: any) {
    results.errors.push(`Initialization error: ${error.message}`);
  }

  // Determine overall status
  const allOk = results.initialization.app && 
                results.initialization.firestore && 
                results.initialization.storage;

  const status = allOk ? 'OK' : 'ERROR';

  // Add recommendations
  if (!results.environment.hasServiceAccount) {
    results.warnings.push('⚠️ FIREBASE_SERVICE_ACCOUNT not found in environment variables');
    results.warnings.push('📝 Add it in Vercel: Settings → Environment Variables');
  }

  if (results.errors.length === 0 && allOk) {
    results.warnings.push('✅ Firebase Admin SDK is fully configured and working!');
  }

  return res.status(status === 'OK' ? 200 : 500).json({
    status,
    timestamp: new Date().toISOString(),
    message: status === 'OK' 
      ? '✅ Firebase integration is working correctly'
      : '❌ Firebase integration has errors - check details below',
    ...results
  });
}
