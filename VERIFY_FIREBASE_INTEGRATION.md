# 🔥 How to Verify Firebase Admin SDK is Completely Integrated

**Quick Answer:** Follow these 3 steps to verify everything is working.

---

## ⚡ QUICK VERIFICATION (2 minutes)

### Step 1: Check Environment Variable

**In Vercel Dashboard:**
1. Go to: https://vercel.com/[your-team]/[your-project]/settings/environment-variables
2. Search for: `FIREBASE_SERVICE_ACCOUNT`
3. ✅ Should exist with hidden value (dots: •••••)
4. ✅ Should be applied to: Production, Preview, Development

**If missing:** Follow setup instructions below.

---

### Step 2: Deploy Test Endpoint

**I've created a test endpoint for you:** `/pages/api/test-firebase.ts`

**Deploy it:**
```bash
git add pages/api/test-firebase.ts
git commit -m "Add Firebase test endpoint"
git push origin main
```

**Test it:**
```bash
# Visit in browser or curl:
https://yourdomain.com/api/test-firebase

# Expected response if working:
{
  "status": "OK",
  "message": "✅ Firebase integration is working correctly",
  "initialization": {
    "app": true,
    "firestore": true,
    "storage": true,
    "auth": true
  },
  "projectInfo": {
    "projectId": "probooksolution-b724f",
    "collections": ["contact_submissions", "consultation_requests", ...],
    "bucketName": "probooksolution-b724f.appspot.com"
  }
}
```

---

### Step 3: Test Real Functionality

**Test Contact Form:**
1. Go to: https://yourdomain.com/contact
2. Submit test message
3. Check Firebase Console:
   - Go to: https://console.firebase.google.com
   - Select project: `probooksolution-b724f`
   - Firestore Database → Data
   - Look for `contact_submissions` collection
   - ✅ New document should appear

**Test Photo Upload:**
1. Go to: https://yourdomain.com/admin
2. Login with admin password
3. Go to Photo Manager
4. Upload test image
5. Check Firebase Console:
   - Storage → Files
   - Look in `website/` folder
   - ✅ Image should be uploaded

---

## 🔧 IF NOT WORKING - SETUP INSTRUCTIONS

### Option A: Get Service Account from Firebase Console

**Step 1: Download Service Account (2 min)**

1. Go to: https://console.firebase.google.com
2. Select project: **probooksolution-b724f**
3. Click ⚙️ (Settings) → **Project settings**
4. Go to **Service accounts** tab
5. Click **"Generate new private key"**
6. Click **"Generate key"** → Downloads JSON file

**Step 2: Convert to Single Line (1 min)**

The JSON must be on ONE line. Use this script:

```bash
# If you have the downloaded file:
node -e "
const fs = require('fs');
const json = JSON.parse(fs.readFileSync('probooksolution-b724f-xxxxx.json', 'utf8'));
console.log(JSON.stringify(json));
" > firebase-oneline.txt

# Then copy the contents of firebase-oneline.txt
```

**Or manually:** Remove all line breaks EXCEPT in the `private_key` field (keep the `\n` characters there).

**Step 3: Add to Vercel (2 min)**

1. Go to: https://vercel.com → Your project
2. Settings → **Environment Variables**
3. Click **"Add New"**
4. Name: `FIREBASE_SERVICE_ACCOUNT`
5. Value: Paste the single-line JSON
6. Apply to: ✅ Production, ✅ Preview, ✅ Development
7. Click **Save**

**Step 4: Redeploy (1 min)**

```bash
# Trigger a new deployment to pick up env var
git commit --allow-empty -m "Trigger redeploy with Firebase"
git push origin main
```

**Step 5: Test Again**

Visit: `https://yourdomain.com/api/test-firebase`

Should return: `"status": "OK"` ✅

---

### Option B: I Already Have the Service Account

**If you have `FIREBASE_SERVICE_ACCOUNT` in Vercel but it's not working:**

1. **Check Format:**
   - Must be valid JSON on one line
   - Must include: `type`, `project_id`, `private_key`, `client_email`
   - Private key must have `\n` characters (not actual newlines)

2. **Re-generate:**
   - Sometimes keys get corrupted
   - Generate a new one from Firebase Console
   - Replace in Vercel
   - Redeploy

3. **Check Logs:**
   ```bash
   vercel logs | grep -i firebase
   
   # Look for:
   # ✅ "Firebase Admin initialized successfully"
   # ❌ "Firebase not configured"
   # ❌ "Firebase initialization error"
   ```

---

## 📊 WHAT'S INTEGRATED

Your codebase already uses Firebase in these places:

### 1. Contact Form ✅
**File:** `/pages/api/contact.ts`
```typescript
// Saves to Firestore collection: contact_submissions
await saveToFirestore('contact_submissions', { name, email, message, ... });
```

### 2. Consultation Form ✅
**File:** `/pages/api/consultation.ts`
```typescript
// Saves to Firestore collection: consultation_requests
await saveToFirestore('consultation_requests', { fullName, email, ... });
```

### 3. Photo Upload ✅
**File:** `/pages/api/admin/upload-photo.ts`
```typescript
// Uploads to Firebase Storage: /website/photos/
const { url } = await uploadToFirebase(buffer, filePath, contentType);
// Saves metadata to Firestore: website_photos
await saveToFirestore('website_photos', { url, photoType, ... });
```

### 4. Admin Authentication (New) ✅
**File:** `/utils/auth.ts`
```typescript
// Can verify Firebase Auth tokens
const auth = getFirebaseAuth();
const decodedToken = await auth.verifyIdToken(token);
```

---

## 🎯 EXPECTED RESULTS

### If Properly Configured:

**Vercel Logs:**
```
✅ Firebase Admin initialized successfully
```

**Test Endpoint:**
```json
{
  "status": "OK",
  "initialization": {
    "app": true,
    "firestore": true,
    "storage": true,
    "auth": true
  }
}
```

**Firebase Console:**
- Firestore has collections: `contact_submissions`, `consultation_requests`, `website_photos`
- Storage has folders: `website/headshot/`, `website/hero/`, etc.
- Usage shows activity

---

### If NOT Configured:

**Vercel Logs:**
```
⚠️ Firebase not configured: FIREBASE_SERVICE_ACCOUNT missing
```

**Test Endpoint:**
```json
{
  "status": "ERROR",
  "initialization": {
    "app": false,
    "firestore": false,
    "storage": false
  },
  "errors": ["Firebase app failed to initialize"],
  "warnings": ["⚠️ FIREBASE_SERVICE_ACCOUNT not found"]
}
```

**Behavior:**
- Forms still work (fallback to Supabase)
- Photos upload fails
- Admin auth uses password fallback

---

## 🚨 TROUBLESHOOTING

### Issue: Test endpoint returns 500 error

**Cause:** Invalid JSON in environment variable

**Fix:**
1. Re-download service account from Firebase Console
2. Convert to single line carefully
3. Test JSON is valid: `echo 'YOUR_JSON' | jq .`
4. Update in Vercel
5. Redeploy

---

### Issue: "Storage bucket not found"

**Cause:** Firebase Storage not enabled

**Fix:**
1. Go to Firebase Console → Storage
2. Click "Get started"
3. Choose location (e.g., us-central1)
4. Click "Done"

---

### Issue: Forms not saving to Firestore

**Cause:** Firestore not created

**Fix:**
1. Go to Firebase Console → Firestore Database
2. Click "Create database"
3. Choose production mode
4. Select location
5. Click "Enable"

---

## ✅ FINAL VERIFICATION CHECKLIST

- [ ] Environment variable `FIREBASE_SERVICE_ACCOUNT` exists in Vercel
- [ ] Test endpoint returns `"status": "OK"`
- [ ] Contact form creates document in Firestore
- [ ] Photo upload works in admin panel
- [ ] Firebase Console shows activity in Usage tab
- [ ] Storage bucket has files
- [ ] Firestore has collections with documents

**If all checked:** ✅ Firebase Admin SDK is completely integrated!

---

## 📞 QUICK HELP

**Where to check:**
- Vercel: https://vercel.com → Your project → Settings → Environment Variables
- Firebase: https://console.firebase.google.com → probooksolution-b724f
- Test: https://yourdomain.com/api/test-firebase
- Logs: `vercel logs | grep firebase`

**Documentation:**
- Full checklist: `/FIREBASE_INTEGRATION_CHECKLIST.md`
- Setup guide: `/FIREBASE_COMPLETE_SETUP.md`

---

**Status:** Use test endpoint to verify  
**Time to Fix:** 5-10 minutes if not configured  
**Test Endpoint:** `/api/test-firebase` (already created for you)
