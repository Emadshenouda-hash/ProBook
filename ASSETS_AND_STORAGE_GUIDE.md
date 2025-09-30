# 📁 Assets & Storage Guide - Where Everything is Saved

**Your Question:** Where are photos/assets saved?  
**Answer:** `/public/` folder (static files) + Future: Cloud storage (Vercel Blob/Supabase)

---

## 📂 Current File Structure

### Public Folder: `/workspace/public/`

**Current Assets:**
```
/public/
├── favicon.svg                    (Website icon)
├── hero.jpg                       (Homepage background - OLD, not used)
├── bimi.svg                       (Email authentication logo)
├── case-studies.json              (Case study data)
└── logos/                         (Partner/software logos)
    ├── quickbooks.svg
    ├── xero.svg
    ├── zoho-books.svg
    └── netsuite.svg
```

**What's Missing (Needs to be Added):**
```
/public/
├── emad-shenouda-headshot.jpg     (Your professional photo) ← UPLOAD THIS
├── case-study-1.jpg               (Case study featured image) ← OPTIONAL
├── case-study-2.jpg               (Case study featured image) ← OPTIONAL
├── apple-touch-icon.png           (iOS home screen icon) ← RECOMMENDED
└── favicon.ico                    (Fallback favicon) ← RECOMMENDED
```

---

## 📸 Where to Save YOUR Photos

### 1. Your Professional Headshot

**Save as:**
```
/workspace/public/emad-shenouda-headshot.jpg
```

**Specifications:**
- Size: 800x1066 pixels (3:4 portrait)
- Format: JPG
- File size: Under 500KB
- Quality: 80-85%

**Shows on:** About page (automatically!)

**How to Add:**
1. **Option A:** Manually copy to `/public/` folder
2. **Option B:** Use CMS Photo Manager (`/admin/photos`)
3. **Option C:** Upload via FTP/SFTP to production server

---

### 2. Homepage Hero Image

**Currently Using:**
```
https://images.unsplash.com/photo-1486406146926-c627a92ad1ab
```

**This is hosted on Unsplash CDN** (external, free, fast)

**To Use Your Own:**
```
Save as: /workspace/public/hero-custom.jpg
Size: 2000x1200 pixels (16:9)
Format: JPG or WebP
File size: Under 500KB
```

**Then update code in** `pages/index.tsx`:
```typescript
// Change from:
src="https://images.unsplash.com/photo-..."

// To:
src="/hero-custom.jpg"
```

---

### 3. Case Study Images

**Save as:**
```
/workspace/public/case-study-ecommerce.jpg
/workspace/public/case-study-saas.jpg
/workspace/public/case-study-nonprofit.jpg
```

**Specifications:**
- Size: 1200x675 pixels (16:9)
- Format: JPG, WebP, or PNG (for charts)
- File size: Under 300KB each
- Use: Before/after charts, dashboards, client logos

---

### 4. Software Logos

**Current Location:**
```
/workspace/public/logos/
├── quickbooks.svg
├── xero.svg
├── zoho-books.svg
└── netsuite.svg
```

**To Add More:**
```
Save as: /public/logos/[software-name].svg
Example: /public/logos/stripe.svg
Format: SVG (scalable, small file size)
```

---

## 💾 Storage Options

### Current: Local Files (Development)

**Location:** `/workspace/public/`

**How it works:**
- Files in `/public/` are served statically
- Access via `yoursite.com/filename.jpg`
- No processing, just direct serve

**Pros:**
- ✅ Simple
- ✅ Fast
- ✅ Free
- ✅ No configuration

**Cons:**
- ⚠️ Files stored in Git repo (increases repo size)
- ⚠️ No automatic optimization
- ⚠️ No CDN (unless using Vercel)

---

### Recommended: Cloud Storage (Production)

**Option 1: Vercel Blob Storage** ⭐ (Recommended)

**Why:**
- ✅ Built into Vercel (same provider as hosting)
- ✅ Automatic CDN distribution (fast globally)
- ✅ Simple API
- ✅ Generous free tier (1GB)

**Setup:**
```bash
# Already configured in your .env.example:
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxx
```

**Usage (from CMS):**
```typescript
import { put } from '@vercel/blob';

// Upload photo
const blob = await put('emad-headshot.jpg', file, {
  access: 'public',
});

// URL: blob.url
// Example: https://abc123.blob.vercel-storage.com/emad-headshot.jpg
```

**Pricing:**
- Free: 1GB storage, 100GB bandwidth
- Pro: $20/mo for 1TB storage

---

**Option 2: Supabase Storage**

**Why:**
- ✅ Already using Supabase for database
- ✅ Generous free tier (1GB)
- ✅ Image transformation (resize, crop)
- ✅ CDN included

**Setup:**
```bash
# Create a storage bucket in Supabase:
# 1. Go to supabase.com
# 2. Project → Storage
# 3. Create bucket: "website-assets"
# 4. Set to public
```

**Usage:**
```typescript
import { getSupabaseAdmin } from '@/utils/supabase';

const { data } = await supabaseAdmin
  .storage
  .from('website-assets')
  .upload('emad-headshot.jpg', file);

// URL: data.publicUrl
```

**Pricing:**
- Free: 1GB storage, 2GB bandwidth
- Pro: $25/mo for 100GB

---

**Option 3: Cloudinary**

**Why:**
- ✅ Automatic image optimization
- ✅ On-the-fly transformations
- ✅ Format conversion (WebP, AVIF)
- ✅ Lazy loading

**Pricing:**
- Free: 25GB storage, 25GB bandwidth
- Paid: $99/mo+

---

## 📸 CMS Photo Manager - How It Works

### Current Implementation (Development):

**When you upload via CMS:**
```
1. You click "Upload Photo"
2. File selector opens
3. You choose file (e.g., headshot.jpg)
4. Preview shows in browser (JavaScript)
5. Saved to localStorage (temporary)
```

**For Production (Phase 2):**
```
1. You click "Upload Photo"
2. File selector opens
3. You choose file
4. File uploads to Vercel Blob (or Supabase)
5. URL returned (e.g., https://...blob.vercel-storage.com/...)
6. URL saved to database
7. Site uses this URL for <Image> src
```

---

## 🔧 How to Add Photos NOW

### Method 1: Direct File Copy (Simplest)

**Steps:**
1. Prepare your photo (compress, resize)
2. Rename to exact filename:
   - `emad-shenouda-headshot.jpg` (for About page)
   - `hero-custom.jpg` (for homepage, if not using Unsplash)
3. Copy file to `/workspace/public/`
4. Rebuild: `npm run build`
5. Deploy to Vercel
6. Photo appears on site!

**Pros:** ✅ Simple, no configuration  
**Cons:** ⚠️ Manual process

---

### Method 2: Vercel Dashboard Upload

**Steps:**
1. Deploy your site to Vercel
2. Go to Vercel dashboard → Your project
3. Go to Storage → Blob
4. Click "Upload"
5. Choose your photos
6. Copy the URLs
7. Update image src in code OR use CMS

**Pros:** ✅ CDN, ✅ Fast  
**Cons:** ⚠️ Requires Vercel account

---

### Method 3: Via CMS (Phase 2 - Coming Soon)

**Steps:**
1. Go to `/admin/photos`
2. Click "Upload Photo" on any card
3. Choose file
4. Automatically uploads to cloud storage
5. URL saved to database
6. Photo appears on site instantly

**Pros:** ✅ No technical knowledge, ✅ Instant  
**Status:** 🔧 Needs integration with Vercel Blob API

---

## 📋 Asset Management Best Practices

### Image Optimization Workflow:

**Before Upload:**
```
1. Resize to correct dimensions
   - Headshot: 800x1066px
   - Hero: 2000x1200px
   - Case studies: 1200x675px

2. Compress (TinyJPG.com or Squoosh.app)
   - Target: Under 500KB for hero
   - Target: Under 300KB for headshot
   - Target: Under 200KB for case studies

3. Save in correct format
   - Photos: JPG (best compression)
   - Charts: PNG (crisp text)
   - Logos: SVG (scalable, tiny file)

4. Rename descriptively
   - emad-shenouda-headshot.jpg
   - case-study-ecommerce.jpg
   - logo-quickbooks.svg
```

---

### File Naming Convention:

**✅ Good Names:**
```
emad-shenouda-headshot.jpg
hero-background.jpg
case-study-ecommerce.jpg
logo-quickbooks.svg
favicon-180x180.png
```

**❌ Bad Names:**
```
IMG_1234.jpg (not descriptive)
photo.jpg (too generic)
image-final-v2.jpg (confusing)
MyPhoto.JPG (inconsistent case)
```

**Rules:**
- Lowercase only
- Hyphens (not spaces or underscores)
- Descriptive
- Include dimensions if relevant

---

## 🗂️ Recommended Folder Structure

### Organize Your `/public/` Folder:

```
/public/
├── emad-shenouda-headshot.jpg       (Your photo)
├── hero-background.jpg              (Or use Unsplash URL)
├── favicon.svg                      (Existing)
├── favicon.ico                      (Add this)
├── apple-touch-icon.png             (Add this - iOS)
├── bimi.svg                         (Existing - email)
│
├── logos/                           (Software/partner logos)
│   ├── quickbooks.svg               (Existing)
│   ├── xero.svg                     (Existing)
│   ├── zoho-books.svg               (Existing)
│   ├── netsuite.svg                 (Existing)
│   ├── stripe.svg                   (Add if needed)
│   ├── shopify.svg                  (Add if needed)
│   └── ...
│
├── case-studies/                    (Case study images)
│   ├── ecommerce-featured.jpg
│   ├── saas-dashboard.jpg
│   ├── nonprofit-results.png
│   └── ...
│
├── team/                            (Team photos - future)
│   ├── emad-shenouda-casual.jpg
│   └── ...
│
└── case-studies.json                (Existing - data)
```

---

## 🎯 Photo Upload Checklist

### Your Headshot (About Page):

**Status:** ❌ Placeholder (needs real photo)

**To Add:**
1. Take or select professional headshot
2. Compress to under 500KB
3. Resize to 800x1066px (3:4)
4. Save as `/public/emad-shenouda-headshot.jpg`
5. Deploy
6. About page shows your photo!

**Current code already references it:**
```typescript
<Image src="/emad-shenouda-headshot.jpg" ... />
```

**Just add the file and it works!** ✅

---

### Homepage Hero:

**Status:** ✅ Using Unsplash (external URL)

**Current:**
```
https://images.unsplash.com/photo-1486406146926-c627a92ad1ab
```

**Benefits of Unsplash:**
- ✅ Free to use
- ✅ High quality
- ✅ CDN-hosted (fast)
- ✅ Auto-optimized (WebP format)
- ✅ No storage needed

**To Use Your Own:**
1. Save to `/public/hero-custom.jpg`
2. Update `pages/index.tsx` line 502
3. Deploy

**Recommendation:** Keep Unsplash for now (professional, fast, free)

---

## 🔄 CMS Photo Upload (How It Will Work)

### Phase 1 (Current - Development):

**When you upload via CMS:**
```
File chosen → Preview in browser → Saved to localStorage (temporary)
```

**Status:** UI built, backend pending

---

### Phase 2 (Production - Recommended):

**Full Implementation:**

**1. Install Vercel Blob:**
```bash
npm install @vercel/blob
```

**2. Create Upload API:**
```typescript
// pages/api/admin/upload-photo.ts
import { put } from '@vercel/blob';

export default async function handler(req, res) {
  const { file, photoType } = req.body;
  
  const blob = await put(`${photoType}.jpg`, file, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN
  });
  
  // Save URL to database
  await updatePhotoUrl(photoType, blob.url);
  
  return res.json({ url: blob.url });
}
```

**3. Update CMS to use API:**
```typescript
// In pages/admin/photos.tsx
const handleUpload = async (file, type) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('photoType', type);
  
  const res = await fetch('/api/admin/upload-photo', {
    method: 'POST',
    body: formData
  });
  
  const { url } = await res.json();
  // Photo now live at: url
};
```

---

## 💾 Data Storage (Content)

### Translation Files (Text Content):

**Location:**
```
/workspace/locales/en.json    (English content)
/workspace/locales/ar.json    (Arabic content)
```

**How CMS Updates Them:**
```
1. You edit in CMS
2. Click "Save Changes"
3. API endpoint: /api/admin/update-content
4. Writes to JSON files
5. Site reloads content
```

**Current Status:** ✅ API built, works in development

---

### Case Studies Data:

**Location:**
```
/workspace/public/case-studies.json
```

**Format:**
```json
{
  "list": [
    {
      "slug": "ecommerce-close-acceleration",
      "title": "eCommerce close accelerated from 10 days to 3",
      "industry": "eCommerce",
      ...
    }
  ]
}
```

**To Add Photos to Case Studies:**
```json
{
  "slug": "ecommerce-close-acceleration",
  "featuredImage": "/case-studies/ecommerce-featured.jpg",
  ...
}
```

---

## 🗄️ Database Storage (Future)

### Recommended: Supabase

**What Gets Stored:**
- ✅ Form submissions (contact, consultation)
- ✅ CMS content (editable text)
- ✅ Photo URLs (references to Vercel Blob)
- ✅ User sessions (if multi-user CMS)

**Tables to Create:**
```sql
-- Website Content
CREATE TABLE content (
  id uuid PRIMARY KEY,
  page varchar,
  section varchar,
  field varchar,
  content_en text,
  content_ar text,
  updated_at timestamp
);

-- Photo URLs
CREATE TABLE photos (
  id uuid PRIMARY KEY,
  photo_type varchar,  -- 'hero', 'headshot', 'case-study-1'
  url text,
  filename varchar,
  size integer,
  uploaded_at timestamp
);
```

**Benefits:**
- ✅ CMS changes persist
- ✅ Multi-user support
- ✅ Version history
- ✅ Real-time updates

---

## 🎯 Quick Reference

### Where Things Are Saved NOW:

| Asset Type | Current Location | Access URL | Status |
|------------|------------------|------------|--------|
| **Hero Image** | Unsplash CDN | https://images.unsplash.com/... | ✅ Active |
| **Your Headshot** | Not uploaded yet | /emad-shenouda-headshot.jpg | ❌ Placeholder |
| **Favicon** | /public/favicon.svg | /favicon.svg | ✅ Active |
| **Logos** | /public/logos/ | /logos/quickbooks.svg | ✅ Active |
| **Case Studies** | /public/case-studies.json | /case-studies.json | ✅ Active |
| **EN Content** | /locales/en.json | (server-side) | ✅ Active |
| **AR Content** | /locales/ar.json | (server-side) | ✅ Active |

---

## 📤 How to Upload YOUR Photos

### Quick Guide:

**1. Prepare Photos:**
```bash
# Compress images first:
# Visit tinyjpg.com or squoosh.app
# Resize to correct dimensions
# Reduce file size to under 500KB
```

**2. Rename Files:**
```bash
# Use exact names:
emad-shenouda-headshot.jpg
# (or whatever the code expects)
```

**3. Copy to /public/:**
```bash
# Option A: Via file system
cp ~/Downloads/headshot.jpg /workspace/public/emad-shenouda-headshot.jpg

# Option B: Via Git
# Copy file to /workspace/public/
git add public/emad-shenouda-headshot.jpg
git commit -m "Add professional headshot"
git push
```

**4. Deploy:**
```bash
# Vercel automatically picks up new files
# Or trigger rebuild manually
```

**5. Verify:**
```bash
# Visit: yoursite.com/emad-shenouda-headshot.jpg
# Should show your photo!
# Also check About page
```

---

## 🔒 Security & Privacy

### Public Files:

**⚠️ Important:**
- Files in `/public/` are **publicly accessible**
- Anyone can visit `yoursite.com/filename.jpg`
- Don't put sensitive documents here

**Safe to put in /public/:**
- ✅ Your professional headshot
- ✅ Hero/background images
- ✅ Company logo
- ✅ Case study images (sanitized)
- ✅ Software logos

**DON'T put in /public/:**
- ❌ Client financial data
- ❌ Confidential documents
- ❌ Personal ID documents
- ❌ Contracts or agreements

---

## 📊 Storage Size Guidelines

### Keep It Light:

**Target Total Size:**
```
All /public/ assets: Under 5MB total
Individual photos: Under 500KB each
Logos (SVG): Under 20KB each
```

**Why:**
- Faster page loads
- Better SEO ranking
- Lower hosting costs
- Better mobile experience

**Compression Tools:**
- **TinyJPG.com** - JPG/PNG compression (free)
- **Squoosh.app** - All formats, advanced (free)
- **ImageOptim** - Mac app (free)
- **SVGOMG** - SVG optimization (free)

---

## 🚀 Production Deployment

### Static Files on Vercel:

**What Happens:**
```
1. You deploy to Vercel
2. Files in /public/ are served from CDN
3. Cached globally (fast everywhere)
4. Automatic compression (gzip/brotli)
5. HTTP/2 push (parallel loading)
```

**URL Pattern:**
```
Development: http://localhost:3000/filename.jpg
Production:  https://yoursite.com/filename.jpg
            (served from Vercel CDN)
```

---

## 🎯 Next Steps for Photo Management

### Immediate (Manual):

**1. Add Your Headshot:**
```bash
# Save to: /workspace/public/emad-shenouda-headshot.jpg
# Code already expects this file
# Just add it and deploy!
```

**2. Optimize Current Assets:**
```bash
# Compress logos (if needed)
# Keep under 20KB each
```

---

### Phase 2 (Automated via CMS):

**1. Enable Vercel Blob:**
```bash
# Add token to .env.local:
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx

# Get token from:
# Vercel Dashboard → Storage → Blob
```

**2. Update CMS Photo Manager:**
```typescript
// Connect upload button to Vercel Blob API
// Save URLs to database
// Update site automatically
```

**3. Benefits:**
```
✅ Upload from admin panel
✅ No manual file copying
✅ Instant preview and publish
✅ CDN delivery (fast)
✅ No repo bloat
```

---

## 📂 File Access Patterns

### How to Reference Files:

**In Code:**
```typescript
// Public files (no /public/ prefix):
<Image src="/emad-shenouda-headshot.jpg" ... />
<Image src="/logos/quickbooks.svg" ... />

// External URLs:
<Image src="https://images.unsplash.com/photo-..." ... />
<Image src="https://...blob.vercel-storage.com/..." ... />
```

**In CMS (Future):**
```
Upload button → File → API → Cloud storage → URL → Database → Site
```

---

## ✅ Summary

### Current Storage:

**Static Files:** `/workspace/public/`  
**Content:** `/locales/en.json`, `/locales/ar.json`  
**Data:** `/public/case-studies.json`  

**Your Photos:**
- Headshot: Add to `/public/emad-shenouda-headshot.jpg`
- Hero: Using Unsplash (external, fast, free)
- Case studies: Add to `/public/case-studies/` folder

**Access:**
- Direct URL: `yoursite.com/filename.jpg`
- In code: `/filename.jpg` (no /public/ prefix)

---

### Future Storage (Phase 2):

**Cloud:** Vercel Blob or Supabase Storage  
**Upload:** Via CMS admin panel  
**Benefits:** CDN, automatic optimization, no manual copying  

---

## 🎯 Quick Action

**To Add Your Headshot NOW:**
```bash
# 1. Compress your photo to under 500KB
# 2. Resize to 800x1066 pixels
# 3. Rename to: emad-shenouda-headshot.jpg
# 4. Copy to: /workspace/public/
# 5. Deploy
# 6. Your photo appears on About page!
```

**File Path:**
```
/workspace/public/emad-shenouda-headshot.jpg
```

**That's it!** ✅

---

**Photos:** Saved in `/public/` folder  
**Content:** Saved in `/locales/` JSON files  
**Future:** Cloud storage (Vercel Blob recommended)  
**Your Action:** Add headshot to `/public/`  

**SIMPLE AND READY TO USE!** 🚀
