import { useState, useEffect } from 'react';
import styled from '../../utils/styled';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import type { DefaultTheme } from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: var(--color-bg);
`;

const Header = styled.header`
  background: linear-gradient(135deg, ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary}, ${({ theme }: { theme: DefaultTheme }) => theme.colors.secondary});
  color: #fff;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderInner = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.9;
  
  a {
    color: #fff;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Button = styled.button`
  padding: 0.625rem 1.25rem;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Main = styled.main`
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const PhotoCard = styled.div`
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
    box-shadow: 0 8px 24px rgba(109, 40, 217, 0.15);
  }
`;

const PhotoPreview = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.1), rgba(14, 165, 233, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
`;

const PhotoInfo = styled.div`
  padding: 1.5rem;
`;

const PhotoTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
`;

const PhotoDescription = styled.p`
  margin: 0 0 1rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const UploadArea = styled.label`
  display: block;
  padding: 1rem;
  border: 2px dashed ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--color-bg);
  
  &:hover {
    border-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
    background: ${({ theme }: { theme: DefaultTheme }) => `${theme.colors.primary}05`};
  }
  
  input {
    display: none;
  }
`;

const CurrentFile = styled.div`
  margin-top: 0.75rem;
  padding: 0.75rem;
  background: rgba(34, 197, 94, 0.1);
  border-radius: 6px;
  font-size: 0.85rem;
  color: #22c55e;
`;

const InfoBox = styled.div`
  padding: 1.5rem;
  background: rgba(14, 165, 233, 0.05);
  border-left: 4px solid #0ea5e9;
  border-radius: 8px;
  margin-bottom: 2rem;
  
  p {
    margin: 0 0 0.5rem;
    line-height: 1.6;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Specs = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  margin-top: 0.5rem;
`;

export default function PhotoManager() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [photos, setPhotos] = useState({
    hero: null as File | null,
    headshot: null as File | null,
    caseStudy1: null as File | null,
    caseStudy2: null as File | null
  });
  const [uploadedUrls, setUploadedUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin');
    } else {
      setAuthenticated(true);
      // Load previously uploaded URLs from localStorage
      const saved = localStorage.getItem('uploaded_photo_urls');
      if (saved) {
        try {
          setUploadedUrls(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to load saved URLs');
        }
      }
    }
  }, [router]);

  const handleFileSelect = async (key: keyof typeof photos, file: File | null) => {
    if (!file) return;
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('❌ File too large! Maximum size is 5MB.\n\nPlease compress your image at tinyjpg.com or squoosh.app');
      return;
    }
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('❌ Invalid file type! Please upload JPG, PNG, or WebP images only.');
      return;
    }
    
    setPhotos((prev) => ({ ...prev, [key]: file }));
    setUploading(key);
    
    // Upload to Firebase Storage via API
    const formData = new FormData();
    formData.append('file', file);
    formData.append('photoType', key);
    
    try {
      const res = await fetch('/api/admin/upload-photo', {
        method: 'POST',
        body: formData
      });
      
      const data = await res.json();
      
      if (data.success && data.url) {
        // Save URL locally
        const newUrls = { ...uploadedUrls, [key]: data.url };
        setUploadedUrls(newUrls);
        localStorage.setItem('uploaded_photo_urls', JSON.stringify(newUrls));
        
        alert(`✅ Photo uploaded successfully!\n\nURL: ${data.url}\n\nYour photo is now saved to Firebase Storage and will appear on your website.\n\nNote: You may need to update your code to use this URL.`);
      } else {
        alert(`❌ Upload failed: ${data.error || data.message || 'Unknown error'}\n\nThis might be because:\n1. Firebase credentials not set in environment\n2. Firebase Storage not enabled\n3. Network error\n\nCheck the browser console for details.`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert(`❌ Upload failed!\n\nError: ${error}\n\nPossible causes:\n1. Firebase not configured (add FIREBASE_SERVICE_ACCOUNT to Vercel)\n2. firebase-admin not installed (run npm install)\n3. Network issue\n\nCheck browser console for full error details.`);
    } finally {
      setUploading(null);
    }
  };

  if (!authenticated) {
    return (
      <Container>
        <div style={{ padding: '3rem', textAlign: 'center' }}>
          <p>🔄 Loading...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderInner>
          <div>
            <h1 style={{ margin: '0 0 0.25rem', fontSize: '1.5rem' }}>📸 Photo Manager</h1>
            <Breadcrumb>
              <Link href="/admin/dashboard">Dashboard</Link>
              <span>→</span>
              <span>Photo Manager</span>
            </Breadcrumb>
          </div>
          <Link href="/admin/dashboard" passHref legacyBehavior>
            <Button as="a">← Back to Dashboard</Button>
          </Link>
        </HeaderInner>
      </Header>

      <Main>
        <InfoBox>
          <p><strong>📸 Upload and manage all website photos</strong></p>
          <p>Recommended formats: JPG or WebP | Max size: 2MB | Compress images before upload for best performance</p>
        </InfoBox>

        <Grid>
          {/* Hero Image */}
          <PhotoCard>
            <PhotoPreview>
              {photos.hero ? (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image
                    src={URL.createObjectURL(photos.hero)}
                    alt="Hero preview"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ) : (
                '🖼️'
              )}
            </PhotoPreview>
            <PhotoInfo>
              <PhotoTitle>🏠 Homepage Hero Image</PhotoTitle>
              <PhotoDescription>
                Main background image on the homepage hero section. Shows modern business/office setting.
              </PhotoDescription>
              <Specs>Recommended: 2000x1200px (16:9 aspect ratio)</Specs>
              <UploadArea>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/webp,image/png"
                  onChange={(e) => handleFileSelect('hero', e.target.files?.[0] || null)}
                />
                <div style={{ padding: '0.5rem' }}>
                  📤 {photos.hero ? 'Change Image' : 'Upload Image'}
                </div>
              </UploadArea>
              {photos.hero && <CurrentFile>✓ {photos.hero.name} ({(photos.hero.size / 1024 / 1024).toFixed(2)} MB)</CurrentFile>}
            </PhotoInfo>
          </PhotoCard>

          {/* Your Headshot */}
          <PhotoCard>
            <PhotoPreview style={{ aspectRatio: '3/4' }}>
              {photos.headshot ? (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image
                    src={URL.createObjectURL(photos.headshot)}
                    alt="Headshot preview"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ) : (
                '👤'
              )}
            </PhotoPreview>
            <PhotoInfo>
              <PhotoTitle>👤 Your Professional Headshot</PhotoTitle>
              <PhotoDescription>
                Your professional photo shown on the About page. Use a high-quality business portrait.
              </PhotoDescription>
              <Specs>Recommended: 800x1066px (3:4 portrait)</Specs>
              <UploadArea>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/webp,image/png"
                  onChange={(e) => handleFileSelect('headshot', e.target.files?.[0] || null)}
                />
                <div style={{ padding: '0.5rem' }}>
                  📤 {photos.headshot ? 'Change Photo' : 'Upload Photo'}
                </div>
              </UploadArea>
              {photos.headshot && <CurrentFile>✓ {photos.headshot.name} ({(photos.headshot.size / 1024 / 1024).toFixed(2)} MB)</CurrentFile>}
            </PhotoInfo>
          </PhotoCard>

          {/* Case Study 1 */}
          <PhotoCard>
            <PhotoPreview>
              {photos.caseStudy1 ? (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image
                    src={URL.createObjectURL(photos.caseStudy1)}
                    alt="Case study preview"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ) : (
                '📊'
              )}
            </PhotoPreview>
            <PhotoInfo>
              <PhotoTitle>📊 Case Study Featured Image 1</PhotoTitle>
              <PhotoDescription>
                Featured image for case studies. Can be a chart, dashboard, or relevant business photo.
              </PhotoDescription>
              <Specs>Recommended: 1200x675px (16:9)</Specs>
              <UploadArea>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/webp,image/png"
                  onChange={(e) => handleFileSelect('caseStudy1', e.target.files?.[0] || null)}
                />
                <div style={{ padding: '0.5rem' }}>
                  📤 {photos.caseStudy1 ? 'Change Image' : 'Upload Image'}
                </div>
              </UploadArea>
              {photos.caseStudy1 && <CurrentFile>✓ {photos.caseStudy1.name}</CurrentFile>}
            </PhotoInfo>
          </PhotoCard>

          {/* Case Study 2 */}
          <PhotoCard>
            <PhotoPreview>
              {photos.caseStudy2 ? (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image
                    src={URL.createObjectURL(photos.caseStudy2)}
                    alt="Case study preview"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ) : (
                '📈'
              )}
            </PhotoPreview>
            <PhotoInfo>
              <PhotoTitle>📈 Case Study Featured Image 2</PhotoTitle>
              <PhotoDescription>
                Another case study image. Use before/after charts or client success visuals.
              </PhotoDescription>
              <Specs>Recommended: 1200x675px (16:9)</Specs>
              <UploadArea>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/webp,image/png"
                  onChange={(e) => handleFileSelect('caseStudy2', e.target.files?.[0] || null)}
                />
                <div style={{ padding: '0.5rem' }}>
                  📤 {photos.caseStudy2 ? 'Change Image' : 'Upload Image'}
                </div>
              </UploadArea>
              {photos.caseStudy2 && <CurrentFile>✓ {photos.caseStudy2.name}</CurrentFile>}
            </PhotoInfo>
          </PhotoCard>
        </Grid>

        <div style={{ 
          padding: '1.5rem', 
          background: 'rgba(109, 40, 217, 0.05)', 
          borderRadius: '12px',
          border: '1px dashed var(--color-primary)'
        }}>
          <p style={{ margin: '0 0 0.75rem', fontWeight: 600 }}>📝 Image Optimization Tips:</p>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#6b7280', lineHeight: 1.8 }}>
            <li><strong>Compress before upload:</strong> Use <a href="https://tinyjpg.com" target="_blank" rel="noopener" style={{ color: 'var(--color-primary)' }}>TinyJPG.com</a> or <a href="https://squoosh.app" target="_blank" rel="noopener" style={{ color: 'var(--color-primary)' }}>Squoosh.app</a></li>
            <li><strong>Target file size:</strong> Under 500KB for hero, under 300KB for headshot</li>
            <li><strong>Format:</strong> JPG for photos, WebP for best compression, PNG for logos with transparency</li>
            <li><strong>Resolution:</strong> 2x display resolution (retina-ready)</li>
            <li><strong>After upload:</strong> Refresh your website to see changes</li>
          </ul>
        </div>

        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--color-surface)', 
          borderRadius: '12px',
          border: '1px solid var(--color-border)',
          marginTop: '2rem'
        }}>
          <h3 style={{ margin: '0 0 1rem' }}>🚀 Coming Soon</h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#6b7280' }}>
            <li>Automatic image compression and resizing</li>
            <li>Multiple image uploads (drag & drop)</li>
            <li>Image cropping tool</li>
            <li>Gallery view of all uploaded images</li>
            <li>Integration with Vercel Blob or Supabase Storage</li>
          </ul>
        </div>
      </Main>
    </Container>
  );
}
