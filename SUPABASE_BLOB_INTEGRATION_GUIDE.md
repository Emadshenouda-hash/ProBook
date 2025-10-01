# 🚀 Supabase & Vercel Blob Integration Guide

**Status:** You have BOTH set up! ✅  
**Supabase:** `supabase-violet-park`  
**Vercel Blob:** `pro-book-blob`  

---

## 🎯 What You Have

### 1. Supabase Database
**Name:** `supabase-violet-park`  
**Purpose:** Store structured data (forms, content, user data)

### 2. Vercel Blob Storage
**Name:** `pro-book-blob`  
**Purpose:** Store files (photos, PDFs, documents)

**Together they give you a complete backend!** 🎉

---

## 📊 How They Work Together

```
┌─────────────────────────────────────────────────┐
│ YOUR WEBSITE                                     │
│                                                  │
│ Forms → Supabase (database)                     │
│ Photos → Vercel Blob (file storage)             │
│ Content → Supabase (editable via CMS)           │
│                                                  │
└─────────────────────────────────────────────────┘

┌──────────────┐         ┌──────────────┐
│  SUPABASE    │         │ VERCEL BLOB  │
│  (Database)  │         │ (Files)      │
│              │         │              │
│ • Forms      │         │ • Photos     │
│ • Content    │         │ • PDFs       │
│ • Users      │         │ • Documents  │
│ • Settings   │         │ • Assets     │
└──────────────┘         └──────────────┘
```

---

## 🗄️ SUPABASE - Database Setup

### Step 1: Get Your Credentials

**Go to:** [supabase.com](https://supabase.com) → `supabase-violet-park` project

**Find these values:**

**Settings → API:**
```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
```

**Add to `.env.local`:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
```

---

### Step 2: Create Database Tables

**Go to:** Supabase → SQL Editor → New Query

**Paste and run:**

```sql
-- Contact form submissions
CREATE TABLE contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (for form submissions)
CREATE POLICY "Anyone can insert" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Policy: Only authenticated users can view (for admin)
CREATE POLICY "Authenticated users can view" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');
```

```sql
-- Consultation requests
CREATE TABLE consultation_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text NOT NULL,
  company_size text,
  industry text,
  country text,
  services text[],
  systems text[],
  budget text,
  urgency text,
  goals text,
  notes text,
  attachment_url text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text
);

ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert" ON consultation_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view" ON consultation_requests
  FOR SELECT USING (auth.role() = 'authenticated');
```

```sql
-- Website content (for CMS)
CREATE TABLE website_content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  page varchar(100) NOT NULL,
  section varchar(100) NOT NULL,
  field varchar(100) NOT NULL,
  content_en text,
  content_ar text,
  updated_by varchar(255)
);

ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can manage content
CREATE POLICY "Authenticated users can manage" ON website_content
  FOR ALL USING (auth.role() = 'authenticated');
```

```sql
-- Photo URLs (for CMS photo manager)
CREATE TABLE website_photos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  photo_type varchar(100) NOT NULL UNIQUE,
  url text NOT NULL,
  filename varchar(255),
  size_bytes integer,
  width integer,
  height integer,
  uploaded_by varchar(255)
);

ALTER TABLE website_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage" ON website_photos
  FOR ALL USING (auth.role() = 'authenticated');
```

**Click "Run" → Tables created!** ✅

---

### Step 3: Verify Tables

**Go to:** Supabase → Table Editor

**You should see:**
- ✅ `contact_submissions`
- ✅ `consultation_requests`
- ✅ `website_content`
- ✅ `website_photos`

**Status:** Database ready! 🎉

---

## 📤 VERCEL BLOB - File Storage Setup

### Step 1: Get Your Token

**Go to:** [vercel.com](https://vercel.com) → Your Project → Storage → Blob

**You should see:** `pro-book-blob` (already created!)

**Find:** "Create Token" or "Access Token"

**Copy token:**
```
vercel_blob_rw_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Add to `.env.local`:**
```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### Step 2: Test Upload (Optional)

**Create test file:** `/workspace/test-blob-upload.js`

```javascript
const { put } = require('@vercel/blob');

async function testUpload() {
  const blob = await put('test.txt', 'Hello from ProBook!', {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN
  });
  
  console.log('✅ Upload successful!');
  console.log('URL:', blob.url);
  // URL will be: https://xxxxx.blob.vercel-storage.com/test.txt
}

testUpload();
```

**Run:**
```bash
BLOB_READ_WRITE_TOKEN=your_token node test-blob-upload.js
```

**If successful:** You'll see a URL like:
```
https://xxxxxxxxx.blob.vercel-storage.com/test.txt
```

**Visit that URL → See "Hello from ProBook!"** ✅

---

## 🔌 Integration with Your Website

### What Needs Integration:

**1. Form Submissions → Supabase** ✅ (Already coded!)

Your forms already have code to save to Supabase:
```typescript
// pages/api/contact.ts (line 17-19)
const supabase = getSupabaseAdmin();
if (supabase) {
  await supabase.from('contact_submissions').insert({ name, email, message, ... });
}
```

**Status:** Will work once you add environment variables!

---

**2. Photo Uploads → Vercel Blob** (Needs integration)

**Current:** CMS shows upload UI, but saves to localStorage  
**Needed:** Connect to Vercel Blob API

**Create:** `/workspace/pages/api/admin/upload-photo.ts`

```typescript
import { put } from '@vercel/blob';
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const form = formidable();
    const [fields, files] = await form.parse(req);
    
    const file = files.file?.[0];
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const photoType = fields.photoType?.[0] || 'unknown';
    const fileBuffer = fs.readFileSync(file.filepath);
    
    // Upload to Vercel Blob
    const blob = await put(`${photoType}.jpg`, fileBuffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN
    });

    // Save URL to Supabase
    const { getSupabaseAdmin } = await import('../../../utils/supabase');
    const supabase = getSupabaseAdmin();
    
    if (supabase) {
      await supabase
        .from('website_photos')
        .upsert({
          photo_type: photoType,
          url: blob.url,
          filename: file.originalFilename,
          size_bytes: file.size
        });
    }

    return res.status(200).json({ 
      success: true, 
      url: blob.url 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Upload failed' });
  }
}
```

---

**3. CMS Content → Supabase** (Needs integration)

**Current:** Saves to JSON files  
**Better:** Save to Supabase database

**Update:** `/workspace/pages/api/admin/update-content.ts`

Add Supabase save:
```typescript
// After saving to JSON files, also save to database:
const { getSupabaseAdmin } = await import('../../utils/supabase');
const supabase = getSupabaseAdmin();

if (supabase) {
  await supabase
    .from('website_content')
    .upsert({
      page: 'homepage',
      section: 'hero',
      field: 'title',
      content_en: content.homepage.en.title,
      content_ar: content.homepage.ar.title,
      updated_by: 'admin'
    });
}
```

---

## 🔧 Quick Setup (Connect Everything)

### Step-by-Step Integration:

**1. Add Environment Variables:**

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

**Add these:**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxx
```

**Also add to `.env.local` for development**

---

**2. Redeploy Your Site:**

```bash
# Your site will now:
# ✅ Save form submissions to Supabase
# ✅ Can upload photos to Vercel Blob (when API is hooked up)
# ✅ Store all data persistently
```

---

**3. Test Form Submissions:**

Go to your website → Contact form → Submit

**Then check Supabase:**
1. Go to supabase.com → `supabase-violet-park`
2. Table Editor → `contact_submissions`
3. Should see your submission! ✅

---

**4. Test Photo Upload (After API Integration):**

Go to `/admin/photos` → Upload → Choose file

**Then check Vercel Blob:**
1. Vercel Dashboard → Storage → Blob → `pro-book-blob`
2. Should see uploaded file! ✅

---

## 💡 How They Work

### Supabase (Database):

**What It Stores:**
```
├── contact_submissions          (Contact form data)
├── consultation_requests        (Consultation bookings)
├── website_content             (CMS editable text)
└── website_photos              (Photo URLs from Blob)
```

**How to View Data:**
1. Go to supabase.com
2. Click `supabase-violet-park`
3. Table Editor
4. Click any table
5. See all your data!

**Features:**
- ✅ Real-time updates
- ✅ SQL queries
- ✅ Row-level security
- ✅ Automatic backups
- ✅ Free tier: 500MB storage

---

### Vercel Blob (File Storage):

**What It Stores:**
```
├── emad-shenouda-headshot.jpg   (Your photo)
├── hero-background.jpg          (Custom hero if you want)
├── case-study-1.jpg             (Case study image)
└── document-uploads/            (Client uploads from forms)
```

**How to View Files:**
1. Go to vercel.com → Your project
2. Storage → Blob → `pro-book-blob`
3. See all uploaded files!

**Features:**
- ✅ CDN distribution (fast globally)
- ✅ Automatic optimization
- ✅ Presigned URLs (security)
- ✅ Free tier: 1GB storage

---

## 🔗 Integration Workflow

### Current Workflow (Without Integration):

**Forms:**
```
User submits → API receives → Email sent → Data lost
```

**Photos:**
```
You upload via CMS → Preview shows → Not saved anywhere
```

**Content:**
```
Edit in CMS → Save to JSON files → Manual rebuild needed
```

---

### NEW Workflow (With Integration):

**Forms:**
```
User submits → API receives → 
  ├─ Email sent (Resend)
  ├─ Save to Supabase ✅
  ├─ CRM updated (HubSpot/Pipedrive)
  └─ Data persisted forever!
```

**Photos:**
```
Upload via CMS → 
  ├─ Upload to Vercel Blob ✅
  ├─ Get public URL
  ├─ Save URL to Supabase ✅
  ├─ Site uses URL immediately
  └─ Photo visible on site!
```

**Content:**
```
Edit in CMS → 
  ├─ Save to Supabase ✅
  ├─ Update JSON files
  ├─ Site reads from Supabase
  └─ Changes live instantly!
```

---

## 🎯 What You Can Do RIGHT NOW

### 1. View Form Submissions in Supabase

**Already Working!** Your forms save to Supabase when environment variables are set.

**Check it:**
```
1. Go to supabase.com
2. Open `supabase-violet-park`
3. Table Editor → contact_submissions
4. See all form submissions! 📊
```

**Query data:**
```sql
-- All submissions from last 7 days
SELECT * FROM contact_submissions 
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- Count by utm_source
SELECT utm_source, COUNT(*) 
FROM consultation_requests 
GROUP BY utm_source;
```

---

### 2. Upload Files to Vercel Blob

**Via Code:**
```typescript
import { put } from '@vercel/blob';

const blob = await put('my-photo.jpg', file, {
  access: 'public',
  token: process.env.BLOB_READ_WRITE_TOKEN
});

console.log('Photo URL:', blob.url);
// https://xxxxx.blob.vercel-storage.com/my-photo.jpg
```

**Via Dashboard:**
```
1. Vercel → Storage → Blob → pro-book-blob
2. Click "Upload"
3. Choose file
4. Get public URL
5. Use URL in your site!
```

---

## 📸 CMS Photo Upload Integration (Next Step)

### To Enable Photo Uploads in CMS:

**File:** `/workspace/pages/api/admin/upload-photo.ts` (create this)

```typescript
import { put } from '@vercel/blob';
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const form = formidable();
    const [fields, files] = await form.parse(req);
    
    const file = files.file?.[0];
    const photoType = fields.photoType?.[0];
    
    if (!file) return res.status(400).json({ error: 'No file' });

    // Read file
    const fileBuffer = fs.readFileSync(file.filepath);
    
    // Upload to Vercel Blob
    const blob = await put(`${photoType}.jpg`, fileBuffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN
    });

    // Save URL to Supabase
    const { getSupabaseAdmin } = await import('../../../utils/supabase');
    const supabase = getSupabaseAdmin();
    
    if (supabase) {
      await supabase
        .from('website_photos')
        .upsert({
          photo_type: photoType,
          url: blob.url,
          filename: file.originalFilename,
          size_bytes: file.size
        });
    }

    return res.json({ success: true, url: blob.url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Upload failed' });
  }
}
```

---

### Update CMS to Use This API:

**File:** `/workspace/pages/admin/photos.tsx`

Update the `handleFileSelect` function:
```typescript
const handleFileSelect = async (key: keyof typeof photos, file: File | null) => {
  if (!file) return;
  
  setPhotos((prev) => ({ ...prev, [key]: file }));
  
  // Upload to Vercel Blob
  const formData = new FormData();
  formData.append('file', file);
  formData.append('photoType', key);
  
  try {
    const res = await fetch('/api/admin/upload-photo', {
      method: 'POST',
      body: formData
    });
    
    const data = await res.json();
    
    if (data.success) {
      alert(`✅ Photo uploaded! URL: ${data.url}`);
      // Photo is now live at data.url
    }
  } catch (error) {
    alert('❌ Upload failed. Check console.');
    console.error(error);
  }
};
```

---

## 🎯 Benefits Once Integrated

### Supabase Benefits:

**1. Form Data Persistence:**
- ✅ All submissions saved forever
- ✅ Query and analyze data
- ✅ Export to CSV/Excel
- ✅ Track conversion rates

**2. CMS Content Storage:**
- ✅ Edit content via admin panel
- ✅ Changes save to database
- ✅ Version history possible
- ✅ Multi-user support

**3. Analytics:**
```sql
-- Monthly consultation requests
SELECT DATE_TRUNC('month', created_at) as month, COUNT(*) 
FROM consultation_requests 
GROUP BY month;

-- Most requested services
SELECT services, COUNT(*) 
FROM consultation_requests 
GROUP BY services;
```

---

### Vercel Blob Benefits:

**1. Photo Management:**
- ✅ Upload from CMS
- ✅ Automatic CDN distribution
- ✅ Fast loading worldwide
- ✅ No repo bloat

**2. Client Uploads:**
- ✅ Consultation form attachments
- ✅ Secure storage
- ✅ Public or private access
- ✅ Automatic cleanup (optional)

**3. Performance:**
- ✅ Serves from nearest edge location
- ✅ Compressed automatically
- ✅ HTTP/2 enabled
- ✅ Fast even in remote locations

---

## 📋 Complete Environment Variables

### Add to `.env.local` AND Vercel:

```bash
# Site
NEXT_PUBLIC_SITE_URL=https://www.probooksolutions.com

# Email
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_INBOX=contact@probooksolutions.com

# Supabase (from supabase-violet-park)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Vercel Blob (from pro-book-blob)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxx

# CMS Admin
NEXT_PUBLIC_ADMIN_PASSWORD=YourSecurePassword123!

# Optional but recommended:
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/consultation
```

---

## 🚀 Quick Start Guide

### To Enable EVERYTHING:

**Step 1: Get Credentials (5 min)**
```
Supabase:
1. Go to supabase.com
2. Open supabase-violet-park
3. Settings → API
4. Copy: URL, anon key, service_role key

Vercel Blob:
1. Go to vercel.com
2. Your project → Storage → Blob
3. pro-book-blob → Create token
4. Copy: token
```

**Step 2: Add to Environment (2 min)**
```
Local: Add to .env.local
Vercel: Add to environment variables in dashboard
```

**Step 3: Create Tables (3 min)**
```
Supabase → SQL Editor → Paste SQL from above → Run
```

**Step 4: Deploy (5 min)**
```bash
npm run build
git push
# Vercel auto-deploys
```

**Step 5: Test (5 min)**
```
Submit contact form → Check Supabase (should see data!)
Upload photo via CMS → Check Blob (should see file!)
```

**Total time: 20 minutes to full integration!** ⚡

---

## 📊 What You'll Get

### With Supabase:
- ✅ All form submissions saved and queryable
- ✅ CMS content stored in database
- ✅ Analytics and reporting
- ✅ Data export capabilities

### With Vercel Blob:
- ✅ Upload photos from CMS admin panel
- ✅ Automatic CDN delivery (fast worldwide)
- ✅ File management dashboard
- ✅ No storage limits (pay as you grow)

### Together:
- ✅ Complete backend (database + files)
- ✅ CMS works perfectly
- ✅ Forms persist data
- ✅ Photos upload easily
- ✅ Professional infrastructure

---

## 💡 Recommended Next Steps

### Immediate (Today):

**1. Add Environment Variables:**
```bash
# Copy credentials from Supabase & Vercel
# Add to .env.local
# Add to Vercel dashboard
```

**2. Create Database Tables:**
```sql
# Run the SQL scripts above in Supabase SQL Editor
# Creates: contact_submissions, consultation_requests, website_content, website_photos
```

**3. Redeploy:**
```bash
# Vercel picks up new environment variables
# Forms now save to Supabase! ✅
```

---

### This Week (Full Integration):

**4. Create Upload API:**
```bash
# Create pages/api/admin/upload-photo.ts
# Connects CMS to Vercel Blob
# Enables photo uploads from admin panel
```

**5. Test Everything:**
```
# Submit forms → Check Supabase ✅
# Upload photos → Check Vercel Blob ✅
# Edit content → Check Supabase ✅
```

---

## 📁 Current Status

### What Works NOW:
- ✅ Forms save to Supabase (when env vars added)
- ✅ Blob storage ready to use
- ✅ CMS UI built and ready

### What Needs Integration:
- ⏳ Photo upload API (20 minutes to build)
- ⏳ Content save to Supabase (optional, JSON works)

---

## 🎯 Summary

**Your Photos Save To:**
- **Current:** `/workspace/public/` folder (manual copy)
- **Future:** Vercel Blob `pro-book-blob` (via CMS upload)

**Your Data Saves To:**
- **Forms:** Supabase `supabase-violet-park` (already works!)
- **Content:** JSON files (works) + Supabase (optional)

**You Have:**
- ✅ Supabase database ready
- ✅ Vercel Blob storage ready
- ✅ Environment variables (just need to add them)
- ✅ CMS UI built
- ✅ 90% of the work done!

**Next:**
- Add environment variables (5 minutes)
- Create database tables (3 minutes)
- Redeploy (2 minutes)
- ✅ Everything works!

---

**Storage:** `/public/` (static) + Vercel Blob (cloud)  
**Database:** Supabase (already set up!)  
**Your Action:** Add credentials to environment variables  
**Time to Full Integration:** 20 minutes  

**YOU'RE ALMOST THERE!** 🚀

---

## 📞 Quick Answer

**Q: Where is my photo saved?**

**A: Add it here:**
```
/workspace/public/emad-shenouda-headshot.jpg
```

**Then deploy, and it appears on your About page!**

**For cloud storage (future):** Photos will upload to `pro-book-blob` via CMS!

**YOU ALREADY HAVE EVERYTHING SET UP!** Just need to connect it! ✅
