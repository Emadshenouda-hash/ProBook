# 🔥 How to Add Firebase JSON to Vercel Environment Variable

**Quick Guide:** 3 easy steps to add your Firebase service account to Vercel

---

## ✅ **METHOD 1: Using Helper Script (Easiest)**

I created a script to make this super easy:

### Step 1: Download Firebase Service Account

1. Go to: https://console.firebase.google.com
2. Select project: **probooksolution-b724f**
3. Click ⚙️ Settings → **Project settings**
4. Go to **Service accounts** tab
5. Click **"Generate new private key"**
6. Click **"Generate key"** → Downloads `probooksolution-b724f-xxxxx.json`

### Step 2: Run the Helper Script

```bash
# Navigate to your project
cd /workspace

# Run the script with your downloaded file
node scripts/prepare-firebase-env.js ~/Downloads/probooksolution-b724f-xxxxx.json
```

**The script will:**
- ✅ Validate your Firebase JSON
- ✅ Convert to single-line format
- ✅ Display the value ready to copy
- ✅ Save to `scripts/firebase-env-value.txt`
- ✅ Show you next steps

### Step 3: Copy and Paste to Vercel

**The script output will show:**
```
═══════════════════════════════════════════════════════════════
  📋 COPY THIS VALUE (starts below the line):
═══════════════════════════════════════════════════════════════
{"type":"service_account","project_id":"probooksolution-b724f",...}
═══════════════════════════════════════════════════════════════
```

**Then:**
1. Copy everything between the lines
2. Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables
3. Click **"Add New"**
4. Name: `FIREBASE_SERVICE_ACCOUNT`
5. Value: Paste the copied JSON
6. Select: ✅ Production, ✅ Preview, ✅ Development
7. Click **"Save"**

### Step 4: Redeploy

```bash
git add .
git commit -m "Add Firebase environment variable"
git push origin main
```

**Done!** ✅

---

## ✅ **METHOD 2: Manual (Without Script)**

If you prefer to do it manually:

### Step 1: Get Firebase Service Account

Same as Method 1 - download from Firebase Console.

### Step 2: Convert to Single Line

**Option A: Using Node.js**
```bash
node -e "const fs=require('fs'); console.log(JSON.stringify(JSON.parse(fs.readFileSync('your-file.json','utf8'))));"
```

**Option B: Using online tool**
- Go to: https://codebeautify.org/jsonminifier
- Paste your JSON
- Click "Minify"
- Copy result

**Option C: Using jq (if installed)**
```bash
jq -c . < probooksolution-b724f-xxxxx.json
```

### Step 3: Add to Vercel

Same as Method 1 Step 3.

---

## ✅ **METHOD 3: Using Vercel CLI**

For command-line lovers:

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login
vercel login

# Link your project (if not already linked)
vercel link

# Add environment variable
vercel env add FIREBASE_SERVICE_ACCOUNT production

# Paste your single-line JSON when prompted
# Then press Enter

# Also add for preview and development
vercel env add FIREBASE_SERVICE_ACCOUNT preview
vercel env add FIREBASE_SERVICE_ACCOUNT development

# Redeploy
vercel --prod
```

---

## 🎯 **VERIFICATION**

After adding the environment variable:

### 1. Check it's Added
- Vercel Dashboard → Settings → Environment Variables
- Look for: `FIREBASE_SERVICE_ACCOUNT` (value shows as `•••••`)

### 2. Deploy and Test
```bash
# Push to trigger deployment
git push origin main

# Once deployed, test the endpoint
curl https://yourdomain.com/api/test-firebase

# Should return:
# {"status":"OK","message":"✅ Firebase integration is working correctly",...}
```

### 3. Check Vercel Logs
```bash
vercel logs | grep -i firebase

# Should see:
# ✅ Firebase Admin initialized successfully
```

### 4. Test Real Feature
- Submit contact form on your website
- Check Firebase Console → Firestore Database
- Look in `contact_submissions` collection
- Should see new document

---

## 🚨 **COMMON ISSUES & FIXES**

### Issue 1: "Invalid JSON" Error in Vercel

**Cause:** JSON has line breaks or special characters

**Fix:**
- Use the helper script (Method 1)
- OR re-download and convert carefully
- Make sure it's ONE continuous line

---

### Issue 2: "Firebase not configured" in Logs

**Cause:** Environment variable name is wrong

**Fix:**
- Name must be exactly: `FIREBASE_SERVICE_ACCOUNT`
- Not: `FIREBASE_CONFIG`, `FIREBASE_JSON`, etc.
- Case-sensitive!

---

### Issue 3: "Invalid service account"

**Cause:** JSON is corrupted or incomplete

**Fix:**
1. Re-download from Firebase Console
2. Don't edit the file manually
3. Use the helper script to validate

**Check if valid:**
```bash
# Should output "OK"
node -e "const j=JSON.parse(require('fs').readFileSync('your-file.json','utf8')); console.log(j.type === 'service_account' ? 'OK' : 'INVALID');"
```

---

### Issue 4: Private Key Issues

**Common problem:** Breaking the `\n` in `private_key`

**The private_key field should look like:**
```json
"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n"
```

**Keep the `\n` characters!** Don't convert them to actual newlines.

---

## 📋 **QUICK REFERENCE**

### What You Need:
- Firebase service account JSON file
- Vercel account with project access

### Environment Variable:
```
Name:  FIREBASE_SERVICE_ACCOUNT
Value: {"type":"service_account","project_id":"..."}  (single line)
Apply to: Production, Preview, Development
```

### After Adding:
1. Redeploy: `git push origin main`
2. Test: `https://yourdomain.com/api/test-firebase`
3. Verify: Check Firebase Console for activity

---

## 🎓 **EXAMPLE WALKTHROUGH**

Let's say you just downloaded: `probooksolution-b724f-abc123.json`

```bash
# 1. Use helper script
node scripts/prepare-firebase-env.js ~/Downloads/probooksolution-b724f-abc123.json

# Output shows:
# ✅ Valid Firebase service account JSON
#    Project: probooksolution-b724f
#    Email: firebase-adminsdk-fbsvc@probooksolution-b724f.iam.gserviceaccount.com
# 
# ✅ Converted to single-line format
#    Length: 2456 characters
#
# ═══════════════════════════════════════════════════════
#   📋 COPY THIS VALUE:
# ═══════════════════════════════════════════════════════
# {"type":"service_account","project_id":"probooksolution-b724f",...}
# ═══════════════════════════════════════════════════════

# 2. Copy the value

# 3. Open Vercel Dashboard
# 4. Add environment variable (paste value)
# 5. Save

# 6. Redeploy
git commit --allow-empty -m "Configure Firebase"
git push origin main

# 7. Wait for deployment (watch in Vercel Dashboard)

# 8. Test
curl https://probooksolutions.org/api/test-firebase
# {"status":"OK",...}

# 9. Done! ✅
```

---

## 💡 **PRO TIPS**

1. **Keep the JSON file secure:**
   - Don't commit to git
   - Store in password manager
   - Generate new key if compromised

2. **Test locally first:**
   ```bash
   # Add to .env.local
   FIREBASE_SERVICE_ACCOUNT='{"type":"service_account",...}'
   
   # Test locally
   npm run dev
   # Visit: http://localhost:3000/api/test-firebase
   ```

3. **Backup your key:**
   - Save the JSON file in a secure location
   - Can generate multiple keys if needed
   - Old keys stay valid until deleted

4. **Monitor usage:**
   - Firebase Console → Usage
   - Set up billing alerts
   - Check for unexpected activity

---

## 📞 **NEED HELP?**

### Quick Commands:

```bash
# Validate your JSON file
node -e "JSON.parse(require('fs').readFileSync('your-file.json','utf8')); console.log('✅ Valid JSON');"

# Convert to single line
node -e "console.log(JSON.stringify(JSON.parse(require('fs').readFileSync('your-file.json','utf8'))));"

# Check Vercel env vars
vercel env ls

# Pull Vercel env vars locally
vercel env pull .env.local
```

### Documentation:
- **Helper Script:** `/workspace/scripts/prepare-firebase-env.js`
- **Test Endpoint:** `/workspace/pages/api/test-firebase.ts`
- **Full Guide:** `/workspace/VERIFY_FIREBASE_INTEGRATION.md`

---

## ✅ **CHECKLIST**

- [ ] Downloaded Firebase service account JSON
- [ ] Converted to single line (using script or manually)
- [ ] Added to Vercel as `FIREBASE_SERVICE_ACCOUNT`
- [ ] Applied to all environments (Prod, Preview, Dev)
- [ ] Redeployed application
- [ ] Tested `/api/test-firebase` endpoint
- [ ] Verified in Firebase Console

**If all checked:** ✅ Firebase is fully integrated!

---

**Created:** October 2, 2025  
**Helper Script:** `/workspace/scripts/prepare-firebase-env.js`  
**Test Endpoint:** `https://yourdomain.com/api/test-firebase`
