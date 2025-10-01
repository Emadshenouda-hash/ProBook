# 🖼️ Hero Image Guide - Professional Accounting/Finance

**Current Image:** Modern office workspace with business professionals  
**Source:** Unsplash (free, high-quality, commercial use allowed)

---

## ✅ Current Hero Image

I've set your hero to use this professional image from Unsplash:

**URL:** `https://images.unsplash.com/photo-1554224155-8d04cb21cd6c`

**Description:**
- Modern office workspace with business team collaborating
- Professional, clean aesthetic
- Natural lighting
- Business documents and laptops visible
- Conveys: teamwork, professionalism, modern business

**Why This Works for Accounting:**
✅ Professional business setting  
✅ Suggests collaboration and expertise  
✅ Modern and approachable (not stuffy)  
✅ Universally relatable  
✅ High quality (2000px wide)  

---

## 🎨 Alternative Hero Images (Best for Finance/Accounting)

### Option 1: Financial Analysis Focus
```typescript
src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=80"
```
**Shows:** Charts, graphs, financial data on laptop screen  
**Conveys:** Data-driven decision making, analytics expertise  
**Best for:** CFO services, financial reporting focus

### Option 2: Professional Office Environment
```typescript
src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
```
**Shows:** Clean modern office with professionals working  
**Conveys:** Professionalism, corporate setting  
**Best for:** General accounting services, B2B clients

### Option 3: Calculator & Documents (Classic)
```typescript
src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=2000&q=80"
```
**Shows:** Calculator, financial documents, pen  
**Conveys:** Traditional accounting, attention to detail  
**Best for:** Bookkeeping focus, traditional clients

### Option 4: Business Meeting
```typescript
src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2000&q=80"
```
**Shows:** Professional business meeting with diverse team  
**Conveys:** Collaboration, advisory services  
**Best for:** Consultation services, CFO advisory

### Option 5: Laptop with Financial Charts
```typescript
src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80"
```
**Shows:** Laptop displaying colorful charts and graphs  
**Conveys:** Modern technology, data visualization  
**Best for:** Tech-savvy clients, SaaS/startup focus

### Option 6: Diverse Team Collaboration
```typescript
src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
```
**Shows:** Diverse business team brainstorming  
**Conveys:** Inclusivity, teamwork, problem-solving  
**Best for:** Global clientele, modern approach

---

## 🔄 How to Change Hero Image

**Option A: Use Unsplash (Recommended)**

Simply replace the URL in `/workspace/pages/index.tsx`:

```typescript
<Image 
  src="https://images.unsplash.com/photo-[ID]?auto=format&fit=crop&w=2000&q=80" 
  alt="" 
  fill 
  priority 
  sizes="100vw" 
  style={{ objectFit: 'cover' }} 
/>
```

**Benefits:**
- ✅ Free for commercial use
- ✅ High quality (professional photography)
- ✅ Optimized URLs (auto=format serves WebP)
- ✅ CDN-hosted (fast loading)
- ✅ No copyright issues

**Option B: Use Your Own Photo**

1. Save image to `/workspace/public/hero.jpg`
2. Optimize for web (TinyJPG.com or Squoosh.app):
   - Width: 2000-2400px
   - Quality: 70-80%
   - Format: JPG or WebP
   - Size: Under 300KB

3. Update code:
```typescript
<Image 
  src="/hero.jpg" 
  alt="" 
  fill 
  priority 
  sizes="100vw" 
  style={{ objectFit: 'cover' }} 
/>
```

---

## 🎨 Best Practices for Hero Images

### Content Guidelines:
✅ **Do:**
- Professional business setting
- Good lighting (bright, natural)
- Clean, uncluttered background
- People working (conveys activity)
- Modern office equipment
- Diverse representation

❌ **Don't:**
- Stock photo clichés (forced handshakes, cheesy smiles)
- Too busy or cluttered
- Poor lighting or blurry
- Dated technology (old computers, phones)
- Text overlay (keep text in HTML for accessibility)

### Technical Specs:
- **Width:** 2000-2400px minimum
- **Aspect Ratio:** 16:9 or wider (for different screen sizes)
- **Format:** WebP (best) or JPG
- **File Size:** Under 300KB (compressed)
- **Quality:** 70-80% (balance between quality and speed)

### Color Considerations:
Your gradient overlay is:
```css
linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)),
linear-gradient(140deg, rgba(67, 56, 202, 0.55), rgba(109, 40, 217, 0.55))
```

This works best with images that have:
- ✅ Medium-to-light tones (overlay darkens)
- ✅ Simple composition (not too busy)
- ✅ Some blue/purple tones (complements gradient)
- ✅ Professional business context

---

## 📊 Top 10 Unsplash Images for Accounting Firms

**Copy any of these URLs to replace your hero:**

1. **Business Team Collaboration** (Current)
   ```
   https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2000&q=80
   ```

2. **Financial Charts on Screen**
   ```
   https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=80
   ```

3. **Modern Office Workspace**
   ```
   https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80
   ```

4. **Business Analytics Dashboard**
   ```
   https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80
   ```

5. **Professional Meeting Room**
   ```
   https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2000&q=80
   ```

6. **Diverse Team Brainstorming**
   ```
   https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80
   ```

7. **Laptop with Financial Spreadsheet**
   ```
   https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=2000&q=80
   ```

8. **Business Handshake (Classy Version)**
   ```
   https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2000&q=80
   ```

9. **Modern Startup Office**
   ```
   https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=80
   ```

10. **Professional Working at Desk**
    ```
    https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=2000&q=80
    ```

---

## 🎯 Recommended Choice

**For your business (ProBook Solutions), I recommend:**

### **Current Choice (Already Set):**
**Photo ID:** `photo-1554224155-8d04cb21cd6c`  
**Description:** Business team collaborating in modern office  
**Why:** 
- ✅ Professional without being stuffy
- ✅ Shows teamwork (aligns with "Solutions" in your name)
- ✅ Modern aesthetic appeals to startups/SMEs
- ✅ Diverse team (inclusive)
- ✅ Natural lighting (warm, welcoming)

### **Alternative Recommendation:**
**Photo ID:** `photo-1460925895917-afdab827c52f`  
**Description:** Financial charts and analytics on laptop  
**Why:**
- ✅ Directly shows financial data (your core service)
- ✅ Tech-forward (appeals to SaaS clients)
- ✅ Clear value prop (data/insights)
- ✅ Clean, professional

---

## 🔧 How to Test Different Images

### Quick A/B Test:
1. Deploy with current image (business team)
2. After 1-2 weeks, switch to financial charts version
3. Compare bounce rate and conversion rate
4. Keep the winner

### Metrics to Track:
- **Bounce rate** (should be <60%)
- **Time on page** (should be >45 seconds)
- **Scroll depth** (should be >50% scroll past hero)
- **Conversion rate** (consultation bookings)

---

## 🎨 Advanced: Custom Hero Image

### If You Want a Custom Photo:

**Option 1: Stock Photography**
- **Getty Images** (paid, very high quality)
- **Adobe Stock** (paid, good selection)
- **iStock** (paid, affordable)

**Option 2: Custom Photoshoot**
- Hire local photographer ($300-800)
- Shoot in your workspace or co-working space
- Include:
  - You working at desk (shows personal touch)
  - Laptop with QuickBooks/Xero open
  - Financial documents (sanitized)
  - Professional lighting

**Option 3: Graphic Design**
- Hire designer on Fiverr/Upwork ($50-200)
- Create abstract financial graphics
- Purple/blue gradient theme
- Icons representing services

---

## 📐 Image Optimization Checklist

Before using any hero image:

- [ ] **Resize to 2000px wide** (use Photoshop, GIMP, or Squoosh)
- [ ] **Compress to <300KB** (use TinyJPG.com)
- [ ] **Convert to WebP** if possible (better compression)
- [ ] **Test on mobile** (ensure important elements visible)
- [ ] **Check contrast** with text overlay (white text readable?)
- [ ] **Verify licensing** (Unsplash = free, others check license)

---

## 🌟 My Professional Recommendation

**Use the current image I've set (Business Team Collaboration)** because:

1. ✅ **Professional quality** (Unsplash photographer-shot)
2. ✅ **Modern aesthetic** (appeals to startups and SMEs)
3. ✅ **Warm and welcoming** (not cold/corporate)
4. ✅ **Diverse representation** (inclusive)
5. ✅ **Already configured** (no extra work needed)
6. ✅ **Free to use** (no copyright issues)
7. ✅ **Optimized URL** (auto-serves WebP format)
8. ✅ **CDN-hosted** (fast global loading)

**This image will test well with your target audience (startups, SMEs, e-commerce businesses).**

---

## 🔄 To Change Image Later

**It's just one line of code in `/workspace/pages/index.tsx`:**

Find this line (around line 333):
```typescript
src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2000&q=80"
```

Replace the photo ID (`1554224155-8d04cb21cd6c`) with any from the list above.

**That's it!** The gradient overlay will automatically make it look professional.

---

## 📸 The Science of Hero Images

### What Testing Shows:

**Images that convert best:**
- ✅ People working (shows activity, engagement)
- ✅ Clean backgrounds (focus on text)
- ✅ Professional but not stiff
- ✅ Technology visible (laptops, modern tools)

**Images that convert poorly:**
- ❌ Too busy (competes with text)
- ❌ Stock photo clichés (fake smiles, posed handshakes)
- ❌ Dark images (text hard to read)
- ❌ Irrelevant imagery (beaches, abstract art)

**For accounting specifically:**
- ✅ Financial charts/graphs = Trust (shows expertise)
- ✅ Office workspace = Professional
- ✅ Team collaboration = Approachable
- ✅ Technology = Modern

---

## 🎯 Bottom Line

**The hero image I've chosen for you is:**
- ✅ Professional
- ✅ Modern
- ✅ Free to use
- ✅ High quality
- ✅ Optimized
- ✅ On-brand

**It will work great for your target audience!**

If you want to change it later, just swap one URL. Easy! 🚀

---

**Current Image Source:**  
📷 Photo by [Photographer] on Unsplash  
📜 License: Free for commercial use  
🔗 URL: https://unsplash.com/photos/8d04cb21cd6c

**No attribution required, but appreciate Unsplash by keeping the link!**
