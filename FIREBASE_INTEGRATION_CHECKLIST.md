# 🔥 Firebase Admin SDK - Complete Integration Checklist

**Project:** probooksolution-b724f  
**Status:** Check each item below  
**Last Updated:** October 2, 2025

---

## ✅ INTEGRATION CHECKLIST

### 1. Environment Variable Setup

#### Required Environment Variable
- [ ] **FIREBASE_SERVICE_ACCOUNT** set in Vercel
  - Format: Single-line JSON string
  - Includes: `type`, `project_id`, `private_key`, `client_email`, etc.
  - Applied to: Production, Preview, Development

**How to Check:**
```bash
# In Vercel Dashboard
Settings → Environment Variables → Search "FIREBASE"
# Should see: FIREBASE_SERVICE_ACCOUNT (hidden value)
```

**How to Get Service Account:**
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Select project: `probooksolution-b724f`
3. Settings ⚙️ → Project settings → Service accounts
4. Click "Generate new private key"
5. Save the downloaded JSON file
6. Convert to single line (remove all `\n` except in private key)

---

### 2. Package Dependencies

- [x] **firebase-admin** installed ✅
  - Version: ^12.0.0 (in package.json)
  - Used for: Server-side operations

**Verify:**
```bash
npm list firebase-admin
# Should show: firebase-admin@12.0.0
```

---

### 3. Core Functions Implementation

Your codebase has these Firebase functions:

#### Storage Functions
- [x] `initFirebase()` - Initialize Firebase Admin SDK
- [x] `getFirebaseStorage()` - Get Storage instance
- [x] `uploadToFirebase()` - Upload files to Storage
- [x] `getFirebaseDB()` - Get Firestore instance
- [x] `getFirebaseAuth()` - Get Auth instance

#### Database Functions
- [x] `saveToFirestore()` - Save documents
- [x] `getFromFirestore()` - Query documents

**Location:** `/workspace/utils/firebase.ts`

---

### 4. Active Integrations

Check which parts of your app use Firebase:

#### ✅ Contact Form (Active)
- **File:** `/workspace/pages/api/contact.ts`
- **Uses:** `saveToFirestore('contact_submissions', ...)`
- **Stores:** Name, email, message, UTM params
- **Fallback:** Also saves to Supabase

#### ✅ Consultation Form (Active)
- **File:** `/workspace/pages/api/consultation.ts`
- **Uses:** `saveToFirestore('consultation_requests', ...)`
- **Stores:** Full consultation details, file attachments
- **Fallback:** Also saves to Supabase

#### ✅ Admin Photo Upload (Active)
- **File:** `/workspace/pages/api/admin/upload-photo.ts`
- **Uses:** 
  - `uploadToFirebase(buffer, path, contentType)`
  - `saveToFirestore('website_photos', metadata)`
- **Stores:** Hero images, headshots, case study photos

#### ✅ Admin Authentication (New!)
- **File:** `/workspace/utils/auth.ts`
- **Uses:** `getFirebaseAuth()` for token verification
- **Purpose:** Verify admin users (optional, password fallback available)

---

### 5. Firebase Console Configuration

#### Storage Rules
- [ ] Storage bucket exists: `probooksolution-b724f.appspot.com`
- [ ] Public read access enabled (for uploaded photos)
- [ ] Write access restricted to authenticated requests

**Check in Firebase Console:**
```
Storage → Rules tab
```

**Required Rule:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Public read for website photos
    match /website/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Private uploads
    match /uploads/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

#### Firestore Rules
- [ ] Firestore database created
- [ ] Collections exist: `contact_submissions`, `consultation_requests`, `website_photos`
- [ ] Write rules configured

**Check in Firebase Console:**
```
Firestore Database → Rules tab
```

**Required Rule:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow server-side writes (via Admin SDK)
    match /{document=**} {
      allow read, write: if false; // Only allow via Admin SDK
    }
  }
}
```

#### Authentication (Optional)
- [ ] Authentication enabled
- [ ] Email/Password provider enabled (if using Firebase Auth)
- [ ] Admin user created

---

### 6. Testing & Verification

#### Test 1: Check Environment Variable (Local)
```bash
# Create test file: test-firebase.js
node -e "
const env = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!env) {
  console.log('❌ FIREBASE_SERVICE_ACCOUNT not set');
  process.exit(1);
}
try {
  const parsed = JSON.parse(env);
  console.log('✅ Firebase credentials valid');
  console.log('   Project:', parsed.project_id);
  console.log('   Email:', parsed.client_email);
} catch (e) {
  console.log('❌ Invalid JSON:', e.message);
}
"
```

#### Test 2: Check Initialization
```bash
# In Vercel deployment logs, search for:
"✅ Firebase Admin initialized successfully"
# OR warning:
"Firebase not configured: FIREBASE_SERVICE_ACCOUNT missing"
```

#### Test 3: Test Contact Form
1. Submit contact form on your website
2. Check Vercel logs:
   ```bash
   vercel logs | grep firebase
   # Should see: "Firebase save" or similar
   ```
3. Check Firebase Console → Firestore:
   - Go to `contact_submissions` collection
   - Verify document was created

#### Test 4: Test Photo Upload
1. Login to admin panel: `/admin`
2. Go to Photo Manager
3. Upload a test image
4. Check Firebase Console → Storage:
   - Go to `website/` folder
   - Verify file was uploaded

---

## 🚨 TROUBLESHOOTING

### Issue 1: "Firebase not configured"

**Error in logs:**
```
Firebase not configured: FIREBASE_SERVICE_ACCOUNT missing
```

**Fix:**
1. Verify environment variable is set in Vercel
2. Redeploy: `git push` (triggers new build with env vars)
3. Check variable name is exactly: `FIREBASE_SERVICE_ACCOUNT`

---

### Issue 2: "Firebase initialization error"

**Error in logs:**
```
Firebase initialization error: Invalid service account
```

**Common Causes:**
- JSON is malformed (extra quotes, line breaks)
- Private key is broken (contains actual `\n` instead of newlines)
- Missing required fields

**Fix:**
```bash
# Download service account again from Firebase Console
# Convert to single line using this Node script:

node -e "
const fs = require('fs');
const json = JSON.parse(fs.readFileSync('service-account.json', 'utf8'));
console.log(JSON.stringify(json));
" > service-account-oneline.txt

# Copy the output and paste into Vercel environment variable
```

---

### Issue 3: "Storage bucket not found"

**Error:**
```
Storage bucket does not exist
```

**Fix:**
1. Go to Firebase Console → Storage
2. Click "Get Started"
3. Choose location (e.g., us-central1)
4. Enable Storage

---

### Issue 4: Permission Denied (Firestore)

**Error:**
```
PERMISSION_DENIED: Missing or insufficient permissions
```

**Fix:**
- You're using Admin SDK, which bypasses rules
- Check that you're using `getSupabaseAdmin()` not client SDK
- Verify `FIREBASE_SERVICE_ACCOUNT` is correct

---

## 📊 VERIFICATION SCRIPT

Create this test API route to verify Firebase integration:

**File:** `/workspace/pages/api/test-firebase.ts`

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import { initFirebase, getFirebaseDB, getFirebaseStorage, getFirebaseAuth } from '../../utils/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const results = {
    environment: {
      hasServiceAccount: !!process.env.FIREBASE_SERVICE_ACCOUNT,
      serviceAccountLength: process.env.FIREBASE_SERVICE_ACCOUNT?.length || 0
    },
    initialization: {
      app: false,
      firestore: false,
      storage: false,
      auth: false
    },
    projectInfo: {} as any,
    errors: [] as string[]
  };

  try {
    // Test initialization
    const app = initFirebase();
    results.initialization.app = !!app;

    if (app) {
      // Get project info
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
      results.projectInfo = {
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        storageBucket: `${serviceAccount.project_id}.appspot.com`
      };

      // Test Firestore
      try {
        const db = getFirebaseDB();
        results.initialization.firestore = !!db;
      } catch (e: any) {
        results.errors.push(`Firestore: ${e.message}`);
      }

      // Test Storage
      try {
        const storage = getFirebaseStorage();
        results.initialization.storage = !!storage;
      } catch (e: any) {
        results.errors.push(`Storage: ${e.message}`);
      }

      // Test Auth
      try {
        const auth = getFirebaseAuth();
        results.initialization.auth = !!auth;
      } catch (e: any) {
        results.errors.push(`Auth: ${e.message}`);
      }
    }
  } catch (error: any) {
    results.errors.push(`Initialization: ${error.message}`);
  }

  const allOk = results.initialization.app && 
                results.initialization.firestore && 
                results.initialization.storage;

  return res.status(200).json({
    status: allOk ? 'OK' : 'ERROR',
    timestamp: new Date().toISOString(),
    ...results
  });
}
```

**Test it:**
```bash
# After deployment, visit:
https://yourdomain.com/api/test-firebase

# Expected response:
{
  "status": "OK",
  "timestamp": "2025-10-02T...",
  "environment": {
    "hasServiceAccount": true,
    "serviceAccountLength": 2400
  },
  "initialization": {
    "app": true,
    "firestore": true,
    "storage": true,
    "auth": true
  },
  "projectInfo": {
    "projectId": "probooksolution-b724f",
    "clientEmail": "firebase-adminsdk-...",
    "storageBucket": "probooksolution-b724f.appspot.com"
  },
  "errors": []
}
```

---

## ✅ FINAL CHECKLIST

Before going to production, verify:

- [ ] **Environment Variable Set**
  - FIREBASE_SERVICE_ACCOUNT in Vercel
  - Correct format (single-line JSON)
  - Applied to all environments

- [ ] **Firebase Console Setup**
  - Storage bucket created
  - Firestore database created
  - Storage rules configured (public read for /website/)
  - Firestore rules configured (Admin SDK only)

- [ ] **Code Integration**
  - Contact form saves to Firestore ✅
  - Consultation form saves to Firestore ✅
  - Photo upload works ✅
  - Admin auth can use Firebase Auth (optional)

- [ ] **Testing Completed**
  - Test API route returns "OK"
  - Contact form submits successfully
  - Photos upload successfully
  - Data visible in Firebase Console

- [ ] **Monitoring**
  - Check Vercel logs for Firebase errors
  - Monitor Firebase Console → Usage
  - Set up alerts for quota limits

---

## 📞 NEED HELP?

### Quick Verification Commands

```bash
# 1. Check if environment variable exists
vercel env ls | grep FIREBASE

# 2. Check deployment logs
vercel logs | grep -i firebase

# 3. Test the integration
curl https://yourdomain.com/api/test-firebase
```

### Common Issues Reference

| Error | Cause | Fix |
|-------|-------|-----|
| "Firebase not configured" | Missing env var | Add FIREBASE_SERVICE_ACCOUNT to Vercel |
| "Invalid service account" | Malformed JSON | Re-download from Firebase Console |
| "Storage bucket not found" | Storage not enabled | Enable in Firebase Console |
| "Permission denied" | Using client SDK | Use Admin SDK functions |

---

## 📚 DOCUMENTATION

- **Firebase Docs:** [firebase.google.com/docs/admin/setup](https://firebase.google.com/docs/admin/setup)
- **Your Setup Guide:** `/workspace/FIREBASE_COMPLETE_SETUP.md`
- **Security Rules:** `/workspace/FIREBASE_SECURITY_RULES.md`

---

**Status:** Use this checklist to verify complete integration  
**Next:** Create test API route and verify all items  
**Support:** Check Vercel logs and Firebase Console for errors
