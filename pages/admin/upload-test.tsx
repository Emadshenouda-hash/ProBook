import React, { useState } from 'react';
import styled from '../../utils/styled';
import SEO from '../../components/SEO';

const Section = styled.section`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;

const Card = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.5rem;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  min-width: 140px;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  width: 100%;
`;

const Select = styled.select`
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 0.65rem 1rem;
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
`;

export default function UploadTestPage() {
  const [file, setFile] = useState<File | null>(null);
  const [photoType, setPhotoType] = useState('hero');
  const [token, setToken] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setUrl(null);
    if (!file) {
      setStatus('Please choose a file.');
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('photoType', photoType);

      const res = await fetch('/api/admin/upload-photo', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: formData
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || data?.error || 'Upload failed');
      }
      setStatus('✅ Uploaded successfully');
      setUrl(data.url);
    } catch (err: any) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section>
      <SEO title="Admin Upload Test" description="Simple upload form to test Firebase Storage" canonicalPath="/admin/upload-test" noindex />
      <h1 style={{ marginBottom: '1rem' }}>Admin Upload Test</h1>
      <Card>
        <form onSubmit={onSubmit}>
          <Row>
            <Label htmlFor="token">Admin Token</Label>
            <Input id="token" placeholder="Firebase ID token or session token" value={token} onChange={(e) => setToken(e.target.value)} />
          </Row>
          <Row>
            <Label htmlFor="photoType">Photo Type</Label>
            <Select id="photoType" value={photoType} onChange={(e) => setPhotoType(e.target.value)}>
              <option value="hero">hero</option>
              <option value="logo">logo</option>
              <option value="gallery">gallery</option>
            </Select>
          </Row>
          <Row>
            <Label htmlFor="file">File</Label>
            <Input id="file" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </Row>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Button type="submit" disabled={loading}>{loading ? 'Uploading…' : 'Upload'}</Button>
            {status && <span style={{ color: status.startsWith('✅') ? '#16a34a' : '#dc2626' }}>{status}</span>}
          </div>
          {url && (
            <div style={{ marginTop: '1rem' }}>
              <div>Public URL:</div>
              <a href={url} target="_blank" rel="noreferrer">{url}</a>
            </div>
          )}
        </form>
      </Card>
      <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.9rem' }}>
        Note: This page requires an admin token in the Authorization header. Paste a Firebase ID token (preferred) or your session token if using the simple admin password flow.
      </p>
    </Section>
  );
}

